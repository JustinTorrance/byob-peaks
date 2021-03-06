# Build Your Own Backend - Tallest 25 Peaks in North America
A RESTful api that contains data on the 25 tallest mountains in North America and their respective ranges.  

Deployed to Heroku: http://ranges-mountains.herokuapp.com

Original project: http://frontend.turing.io/projects/build-your-own-backend.html

# Endpoints:  

## Get all ranges 
`GET /api/v1/ranges`

Response:
 
 ```
Status: 200 OK
 
 [
    {
        "id": 32,
        "name": "St Elias Mountains",
        "tallest_peaks": "14",
        "created_at": "2019-05-03T14:31:43.157Z",
        "updated_at": "2019-05-03T14:31:43.157Z"
    },
    {
        "id": 33,
        "name": "Sierra Nevada",
        "tallest_peaks": "1",
        "created_at": "2019-05-03T14:31:43.164Z",
        "updated_at": "2019-05-03T14:31:43.164Z"
    },
    {
        "id": 34,
        "name": "Sawatch Range",
        "tallest_peaks": "1",
        "created_at": "2019-05-03T14:31:43.165Z",
        "updated_at": "2019-05-03T14:31:43.165Z"
    }
]
 ```  
 
 
 ## Get range by ID 
 `GET /api/v1/ranges/:id`  
 
 Response:

 ```
 Status: 200 OK
 
    {
        "id": 34,
        "name": "Sawatch Range",
        "tallest_peaks": "1",
        "created_at": "2019-05-03T14:31:43.165Z",
        "updated_at": "2019-05-03T14:31:43.165Z"
    }
 ```  
 
 
## Get all mountains of a specific range
`GET /api/v1/ranges/:id/mountains`

Response:
 
 ```
 Status: 200 OK
 
[
  {
    "id": 1,
    "name": "Mt Logan",
    "elevation": 17215,
    "range_id": 1,
    "created_at": "2019-05-03T16:12:40.334Z",
    "updated_at": "2019-05-03T16:12:40.334Z",
    "rank": 2
  },
  {
    "id": 2,
    "name": "Mt St Elias",
    "elevation": 18008,
    "range_id": 1,
    "created_at": "2019-05-03T16:12:40.338Z",
    "updated_at": "2019-05-03T16:12:40.338Z",
    "rank": 4
  },
  {
    "id": 3,
    "name": "Mt Lucania",
    "elevation": 17192,
    "range_id": 1,
    "created_at": "2019-05-03T16:12:40.338Z",
    "updated_at": "2019-05-03T16:12:40.338Z",
    "rank": 7
  }
]
 ``` 
 
 
 ## Get mountain by ID
 `GET /api/v1/mountains/:id`   
 
Response:
 
 ```
 Status: 200 OK
 
    {
    "id": 3,
    "name": "Mt Lucania",
    "elevation": 17192,
    "range_id": 1,
    "created_at": "2019-05-03T16:12:40.338Z",
    "updated_at": "2019-05-03T16:12:40.338Z",
    "rank": 7
  }
 ```  
   
  ## Add new range
  `POST /api/v1/ranges`
  
  **Parameters:**
  
| Name                 | Type          |
| -------------        |:-------------:|
| `name`               | `string`      |
| `tallest_peaks`      | `number`      |
  
Response:
 
 ```
 Status: 201 Created
 
{
    "id": 39,
    "message": "Success! The range has been added."
}
 ```
 
 ## Add new mountain 
 `POST /api/v1/ranges/:id/mountains`
  
  **Parameters:**
  
| Name                 | Type          |
| -------------        |:-------------:|
| `name`               | `string`      |
| `elevation`          | `number`      |
| `rank`               | `number`      |

  
Response:
 ```
 Status: 201 Created
 
 "message": "Success! The mountain has been added."
 ```
 
## Delete a range 
`DELETE /api/v1/ranges/:id`
  
 Response:
 
 ```
 Status: 204 No Content
 
 "message": "Range was successfully deleted."
 ```

## Author:
Justin Torrance

## Tech Stack:
 - knex
 - Express
 - PostgreSQL
 
