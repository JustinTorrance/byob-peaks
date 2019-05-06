# Build Your Own Backend - Tallest 25 Peaks in North America
A RESTful api that contains data on the 25 tallest mountains in North America and their respective ranges.  

Live site: ranges-mountains.herokuapp.com

Original project: http://frontend.turing.io/projects/build-your-own-backend.html

## Endpoints  

**Get all ranges:** `GET /api/v1/ranges`
 - Response status: 200
 - Response example:
 
 ```
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
 
 
 **Get range by ID:** `GET /api/v1/ranges/:id`
 - Response status: 200
 - Response example:
 
 ```
    {
        "id": 34,
        "name": "Sawatch Range",
        "tallest_peaks": "1",
        "created_at": "2019-05-03T14:31:43.165Z",
        "updated_at": "2019-05-03T14:31:43.165Z"
    }
 ```  
 
 
**Get all mountains of a specific range:** `GET /api/v1/ranges/:id/mountains`
 - Response status: 200
 - Response example:
 
 ```
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
 
 
 **Get mountain by ID:** `GET /api/v1/mountains/:id`
 - Response status: 200
 - Response example:
 
 ```
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
 
