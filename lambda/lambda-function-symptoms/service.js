'use strict';

const dynamo = require('./dynamodb');

// -> Sercice configuration


// -> Service functions

const find_disease_by_id = async (symptom_id, page_size = 10, offset = 1) => {
    const data = await dynamo.search_disease_by_symptom(symptom_id);
   
    const result = {
        message: "Success",
        data: [],
        count: 0
    };
    
    page_size = parseInt(page_size);
    offset = parseInt(offset);
    
    var count = 0;

    for (let i = offset - 1; i < data["Items"].length && i < offset - 1 + page_size; i++) {

        var temp = data["Items"][i]["symptoms"];

        let symptoms = temp.split(",");

        result["data"].push({
            name: data["Items"][i]["d_name"],
            symptoms: symptoms,
        });
        
        count += 1;

    };
    
    result["count"] = count;

    return result;
};

// -> Exporting service functions

module.exports = {
    diseaseById: find_disease_by_id
};


