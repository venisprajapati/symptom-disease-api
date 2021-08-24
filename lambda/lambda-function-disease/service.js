const dynamo = require('./dynamodb');

const find_disease_by_name = async (symptom_id, page_size = 10, offset = 1) => {
    const data = await dynamo.search_disease_by_name(symptom_id);
   
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
        var temp2 = data["Items"][i]["precautions"];

        let symptoms = temp.split(",");
        let precautions = temp2.split(",");

        result["data"].push({
            name: data["Items"][i]["d_name"],
            symptoms: symptoms,
            description: data["Items"][i]["description"],
            precautions: precautions
        });
        
        count += 1;

    };

    result["count"] = count;

    return result;
};

module.exports = {
    diseaseByName: find_disease_by_name
};
