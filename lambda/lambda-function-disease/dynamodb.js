'use strict';

// -> Aws Configuration

const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-1" });

const table_name = "olive-symptoms-remedy-app";
const dynamodb = new AWS.DynamoDB.DocumentClient();


// -> Query dynamodb


// -> Find disease by name

const search_disease_by_name = async (disease) => {
    
    const pk = "DIS";
    const dis = disease;
    
    var params = {
        TableName: table_name,
        KeyConditionExpression: "#PK = :PK",
        ExpressionAttributeNames: {
            "#PK": "PK",
            "#dis": "d_name"
        },
        ExpressionAttributeValues: {
            ":PK": `${pk}`,
            ":dis": `${dis}`
        },
        FilterExpression: "contains (#dis, :dis)",
        ProjectionExpression: "d_name, description, symptoms, precautions",
        // Limit: 10,
        // LastEvaluatedKey: { PK: 'XXX', SK: '#xx-xx' }
    };

    try {
        const data = await dynamodb.query(params).promise();
        return data;
    } catch (err) {
        console.log("Failure", err.message);
    }
    
};


// -> Exporting functions

module.exports = {
    search_disease_by_name: search_disease_by_name
};
