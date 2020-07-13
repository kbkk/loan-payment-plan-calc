### Install & Test
```shell script
$ npm install
$ npm run test
```

### Build Docker image
```shell script
$ docker build .
```

### Manual deploy
Deploy is performed through CloudFormation (AWS CDK)

#### Setup:
Set the environment variables first:
```shell script
$ export AWS_DEFAULT_REGION="eu-west-1"
$ export AWS_SECRET_ACCESS_KEY="secretkey"
$ export AWS_ACCESS_KEY_ID="accesskey"
```
And create an ECR repository called "loan-calc".

#### Deploy:

Build and tag the image:
```shell script
$ BASE_URL="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com"
$ aws ecr get-login-password | docker login --username AWS --password-stdin "$BASE_URL"
$ docker build -t "$BASE_URL"/loan-calc:latest .
$ docker push "$BASE_URL"/loan-calc:latest
```

Update infrastructure:
```shell script
$ cd infra
$ npm install
$ npm run build
$ npm run cdk deploy
```
