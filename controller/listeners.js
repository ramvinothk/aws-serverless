const  AWS = require('aws-sdk');
const DynamoDB = AWS.DynamoDB
const AWS_SES = new AWS.SES({ region: "us-west-1" });
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
        let params = {
            Source: "ram16vinoth@gmail.com",
            Destination: {
                ToAddresses: ["ram13vinoth@yahoo.co.in"]
            },
            ReplyToAddresses: [],
            Message: {
                Body: {
                    Text: {
                        Charset: "UTF-8",
                        Data: `EventSource: ${record.eventSource} \n EventName: ${record.eventName} \n Data: ${recordObj}`
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: `Hello!`
                }
            }
        };
        AWS_SES.sendEmail(params).promise().then(res =>{
            console.log(res);
        }).catch(e=>{
            console.log(e);
        });
        return;
    }
}