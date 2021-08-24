'use strict';

// Main file:

const services = require('./service');


// -> Export event handler

exports.handler = async function (event) {
    // console.log('Request event: ', event);

    let symptomId = event.queryStringParameters.symptomId;
    let pageSize = event.queryStringParameters.pageSize;
    let offset = event.queryStringParameters.offset;
    let response;
    
    switch (true) {
        case event.httpMethod === 'GET' && symptomId === null && symptomId === '':
            response = await buildResponse(200, 'Symptom id missing.');
            break;
        case event.httpMethod === 'GET' && symptomId != null && symptomId != '':
            const result = await services.diseaseById(symptomId, pageSize, offset);
            response = await buildResponse(200, result);
            break;
        default:
            response = buildResponse(404, '404 Not Found');
    }
    return response;
};

// -> Build response body and status code.

const buildResponse = function (statusCode, body) {
	return {
		statusCode: statusCode,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	};
};