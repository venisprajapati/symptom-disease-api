# symptom-disease-api
An API for finding disease by its symptoms, using Aws API gateway, Lambda functions and DynamoDB.

## System diagram

![System diagram](https://github.com/venisprajapati/symptom-disease-api/blob/main/screen-shots/symptom-disease-api-system-diagram.jpg?raw=true)

Also refer to the deployed [lambda functions](https://github.com/venisprajapati/symptom-disease-api/tree/main/lambda) code.


## API Calls

- API URL = "https://(api_id).execute-{api-region}.amazonaws.com/stage/"

- API Routes - Methods:
  - /disease:
    *	GET
    - query:
        * diseaseName = string (required)
        * pageSize = int (default = 10)
        * offset = int (default = 1)
  - /symptoms:
    *	GET
    - query:
        * symptomId = string (required)
        * pageSize = int (default = 10)
        * offset = int (default = 1)

- Refer to the [disease.json](https://github.com/venisprajapati/symptom-disease-api/blob/main/responses/disease.json) and [symptoms.json](https://github.com/venisprajapati/symptom-disease-api/blob/main/responses/symptoms.json) for responses given by api calls.


## Dataset

- Data set is imported from [Kaggle Disease Symptom Prediction Dataset](https://www.kaggle.com/itachi9604/disease-symptom-description-dataset).
- After cleaning the data, I have made [disease-data.json](https://github.com/venisprajapati/symptom-disease-api/blob/main/dataset/disease-data.json) and [symptoms-data.json](https://github.com/venisprajapati/symptom-disease-api/blob/main/dataset/symptoms-data.json) and imported dataset files to DynamoDB using Admin panel (code is not shared).


## DynamoDB Schema

* Refer to the exported [database file](https://github.com/venisprajapati/symptom-disease-api/blob/main/dyanmodb/results.csv) for analyzing database.

1. Disease
    - symptom (PK)
    - symptom_number (SK)
    - symptom_name

2. Symptoms
    - disease (PK)
    - disease_id (SK)
    - disease_name
    - disease_symptoms
    - disease_symptoms_names [ 1, 2, 3, 4, 5]
    - disease_desc
    - disease_precautions [ 1, 2, 3, 4]


## Screen Shots

- Response of /disease Api call:
  ![Response /disease api](https://github.com/venisprajapati/symptom-disease-api/blob/main/screen-shots/response-diseases.png?raw=true)
- Response of /symptoms Api call:
  ![Response /symptoms api](https://github.com/venisprajapati/symptom-disease-api/blob/main/screen-shots/response-symptoms.png?raw=true)

- API Gateway Disease:
  ![API Gateway disease](https://github.com/venisprajapati/symptom-disease-api/blob/main/screen-shots/api-gateway-disease.png?raw=true)
- API Gateway Symptoms:
  ![API Gateway symptom](https://github.com/venisprajapati/symptom-disease-api/blob/main/screen-shots/api-gateway-symptoms.png?raw=true)


## References

[Kaggle Disease Symptom Prediction Dataset](https://www.kaggle.com/itachi9604/disease-symptom-description-dataset)

[AWS API Gateway](https://aws.amazon.com/api-gateway/)

[Amazon DynamoDB](https://docs.aws.amazon.com/dynamodb/index.html)

YouTube tutorials
