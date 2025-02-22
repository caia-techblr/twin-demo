```
curl -X 'GET'   'http://localhost:8080/api/2/things/iew.efy:sensehat' -H 'accept:application/json'   -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```
```
curl -X 'GET'   'http://localhost:8080/api/2/things/iew.efy:sensehat/attributes' -H 'accept:application/json'   -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```
```
curl -X 'GET' \
  'http://localhost:8080/api/2/things/iew.efy%3Asensehat/features' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```
```
curl -X 'GET' \
  'http://localhost:8080/api/2/things/iew.efy%3Asensehat/features/temperature' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```
```    
curl -X 'GET' \
  'http://localhost:8080/api/2/things/iew.efy%3Asensehat/features/temperature/properties' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```
```  
curl -X 'GET'   'http://localhost:8080/api/2/things/iew.efy:sensehat/definition' -H 'accept:application/json'   -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```
```
curl -X 'GET'   'http://localhost:8080/api/2/things/iew.efy:sensehat/policyId' -H 'accept:application/json'   -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```

> Use `-u 'ditto:ditto'` in place of `-H 'Authorization: Basic ZGl0dG86ZGl0dG8='` for authentication or replace `ZGl0dG86ZGl0dG8` by suitable string  
