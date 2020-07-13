/* eslint-disable no-new */
import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import * as ecr from '@aws-cdk/aws-ecr';

export class InfraStack extends cdk.Stack {
    public constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, 'loan-calc-vpc', {maxAzs: 2});

        const cluster = new ecs.Cluster(this, 'loan-calc-cluster', {vpc});

        const repository = ecr.Repository.fromRepositoryAttributes(this, 'loan-calc', {
            repositoryName: 'loan-calc',
            repositoryArn: 'arn:aws:ecr:eu-west-1:965283624813:repository/loan-calc'
        });

        const service = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'loan-calc-fargate-service', {
            cluster,
            taskImageOptions: {
                image: ecs.ContainerImage.fromEcrRepository(repository),
                environment: {
                    PORT: '80'
                },
                logDriver: ecs.LogDriver.awsLogs({
                    streamPrefix: 'loan-calc'
                }),

            },
            cpu: 256,
            memoryLimitMiB: 512,
            publicLoadBalancer: true,
            desiredCount: 2,
            listenerPort: 80,

        });

        service.targetGroup.configureHealthCheck({
            path: '/'
        });

        new cdk.CfnOutput(this, 'Load Balancer DNS: ', {
            value: service.loadBalancer.loadBalancerDnsName
        });
    }
}
