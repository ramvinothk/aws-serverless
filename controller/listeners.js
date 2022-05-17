const  AWS = require('aws-sdk');
const DynamoDB = AWS.DynamoDB
const AWS_SNS = new AWS.SNS({ region: "us-west-1" });
module.exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    for (const record of event.Records) {

        let recordObj;
        if(record.eventSource==='aws:dynamodb'){
            recordObj= JSON.stringify(DynamoDB.Converter.unmarshall(record.dynamodb.NewImage))
        }
        if(record.eventSource === 'aws:s3'){
            recordObj= JSON.stringify(record.s3.object)
        }
        if(record.eventSource === 'aws:sqs'){
            recordObj= record.body
        }
        const params = {
            Subject: record.eventSource,
            Message: `EventName: ${record.eventName}`,
            TopicArn: process.env.sns
        };
        AWS_SNS.publish(params).promise().then(res =>{
            console.log(res);
        }).catch(e=>{
            console.log(e);
        });
        return;
    }
}