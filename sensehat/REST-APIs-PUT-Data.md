```
curl -X 'PUT' \
  'http://localhost:8080/api/2/things/iew.efy:sensehat/features' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' \
  -H 'Content-Type: application/json' \
  -d '{
  "temperature": {
    "properties": {
      "value": 28
    }
  },
  "humidity": {
    "properties": {
      "value": 30
    }
  },
  "pressure": {
    "properties": {
      "value":40
    }
  }
}'
```
```
curl -X 'PUT' \
  'http://localhost:8080/api/2/things/iew.efy:sensehat/features/temperature' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' \
  -H 'Content-Type: application/json' \
  -d '{ "properties": { "value": 29 } }'
```
```
curl -X 'PUT' \
  'http://localhost:8080/api/2/things/iew.efy:sensehat/features/temperature/properties/value' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' \
  -H 'Content-Type: application/json' \
  -d '49'
```
