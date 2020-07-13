import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'loan-calc-vpc', {maxAzs: 1});

    // todo: for now expose services directly but eventually the traffic should be going through a load balancer instead
    const serviceSecurityGroup = new ec2.SecurityGroup(this, 'loan-calc-service-security-group', {
      vpc,
      allowAllOutbound: true,
      description: "Allow HTTP/HTTPS access to fargate tasks."
    });

    serviceSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));
    serviceSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));

    const cluster = new ecs.Cluster(this, 'loan-calc-cluster', {vpc});

    const taskDefinition = new ecs.FargateTaskDefinition(
        this,
        "loan-calc-service-task-definition",
        {
          family: 'loan-calc-service-task-definition'
        }
    );

    const container = taskDefinition.addContainer(
        "service",
        {
          image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample")
        }
    );

    container.addPortMappings({containerPort: 80});

    const service = new ecs.FargateService(
        this,
        "loan-calc-fargate-service",
        {
          cluster,
          taskDefinition,
          assignPublicIp: true,
          securityGroups: [serviceSecurityGroup]
        }
    );
  }
}
