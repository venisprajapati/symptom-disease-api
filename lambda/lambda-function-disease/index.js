'use strict';

// Main file:

const services = require('./service');


// -> Export event handler

exports.handler = async function (event) {
    // console.log('Request event: ', event);

    let diseaseName = event.queryStringParameters.diseaseName;
    let pageSize = event.queryStringParameters.pageSize;
    let offset = event.queryStringParameters.offset;
    let response;
    
    switch (true) {
        case event.httpMethod === 'GET' && diseaseName === null && diseaseName === '':
            response = await buildResponse(200, 'Disease name is missing.');
            break;
        case event.httpMethod === 'GET' && diseaseName != null && diseaseName != '':
            const result = await services.diseaseByName(diseaseName, pageSize, offset);
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