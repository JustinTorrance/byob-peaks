# Build Your Own Backend - Tallest 25 Peaks in North America
A RESTful api that contains data on the 25 tallest mountains in North America and their respective ranges.  

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
