'use strict';

// -> Aws Configuration

const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-1" });

const table_name = "olive-symptoms-remedy-app";
const dynamodb = new AWS.DynamoDB.DocumentClient();


// -> Query dynamodb

// -> Find disease by symptom

const search_disease_by_symptom = async (symptom) => {
    
    const pk = "DIS";
    const symptom_id = symptom;
    
    var params = {
        TableName: table_name,
        KeyConditionExpression: "#PK = :PK",
        ExpressionAttributeNames: {
            "#PK": "PK",
            "#symptom": "symptom_id"
        },
        ExpressionAttributeValues: {
            ":PK": `${pk}`,
            ":symptom": `${symptom_id}`
        },
        FilterExpression: "contains (#symptom, :symptom)",
        ProjectionExpression: "d_name, symptoms",
    };

    try {
        const data = await dynamodb.query(params).promise();
        return data;
    } catch (err) {
        console.log("Failure", err.message);
    }
    
};


// -> Exporting database functions

module.exports = {
    search_disease_by_symptom: search_disease_by_symptom
};
