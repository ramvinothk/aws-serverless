'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (!data || !data?.text) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      body: 'Text not found',
    });
    return;
  }

  const params = {
    TableName: process.env.dynamodb_table,
    Item: {
      id: uuid.v1(),
      text: data.text,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
