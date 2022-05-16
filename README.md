# aws-serverless
This service demonstrates how to setup RESTful API with Cognito, API Gateway allowing you to do some DynamoDB operations along with SQS,SES and S3 events. DynamoDB is used to store the data. This is just an example and of course you could use any data storage.

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The output should be similar to:
```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Installing dependencies for custom CloudFormation resources...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service serverless-poc.zip file to S3 (12.24 MB)...
Serverless: Uploading custom CloudFormation resources...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
........................................................................
Serverless: Stack update finished...
Service Information
service: serverless-poc
stage: dev
region: us-west-1
stack: serverless-poc-dev
resources: 70
api keys:
  None
endpoints:
  POST - https://v945awl0c2.execute-api.us-west-1.amazonaws.com/dev/user/login
  POST - https://v945awl0c2.execute-api.us-west-1.amazonaws.com/dev/user/signup
  POST - https://v945awl0c2.execute-api.us-west-1.amazonaws.com/dev/user/private
  POST - https://v945awl0c2.execute-api.us-west-1.amazonaws.com/dev/controller
  GET - https://v945awl0c2.execute-api.us-west-1.amazonaws.com/dev/controller
  GET - https://v945awl0c2.execute-api.us-west-1.amazonaws.com/dev/controller/{id}
  PUT - https://v945awl0c2.execute-api.us-west-1.amazonaws.com/dev/controller/{id}
  DELETE - https://v945awl0c2.execute-api.us-west-1.amazonaws.com/dev/controller/{id}
functions:
  loginUser: serverless-poc-dev-loginUser
  signupUser: serverless-poc-dev-signupUser
  authapi: serverless-poc-dev-authapi
  create: serverless-poc-dev-create
  list: serverless-poc-dev-list
  get: serverless-poc-dev-get
  update: serverless-poc-dev-update
  delete: serverless-poc-dev-delete
  eventNotification: serverless-poc-dev-eventNotification
layers:
  None
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.

```

## Remove
To remove the complete stack simply run

```bash
serverless remove
```
