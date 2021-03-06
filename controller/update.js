'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  // validation
  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the item.',
    });
    return;
  }

  const params = {
    TableName: process.env.dynamodb_table,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#input_text': 'text',
    },
    ExpressionAttributeValues: {
      ':text': data.text,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #input_text = :text, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
