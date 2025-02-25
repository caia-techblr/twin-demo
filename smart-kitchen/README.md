## Preparation : Create Things
* Create the policy
```
curl -X PUT 'http://localhost/api/2/policies/ditto.iew:policy' -u 'ditto:ditto' -H 'Content-Type: application/json' -d @policy.json
```
* Create the thing
```
curl -X PUT 'http://localhost/api/2/things/iew.efy:smartkitchen' -u 'ditto:ditto' -H 'Content-Type: application/json' -d @kitchen.json
```
* Create incoming, outgoing connections
```
curl -X POST 'http://localhost:8080/devops/piggyback/connectivity?timeout=10' -u 'devops:foobar' -H 'intent-Type: application/json' -d @connection-kitchen-in.json 

```
```
curl -X POST 'http://localhost:8080/devops/piggyback/connectivity?timeout=10' -u 'devops:foobar' -H 'intent-Type: application/json' -d @connection-kitchen-out.json 
```
* Update mapper functions

## Demo1 : MQTT Publish & HTTP GET
* Publish using MQTT
```
mosquitto_pub -t iew.efy/smartkitchen -m '{ "thingId": "iew.efy:smartkitchen", "refrigerator": { "status" : "on", "temperature": 10, "defrost": 3 }, "room" : { "temperature":23, "light":"on" } }' -q 1 -h localhost -p 1883
```
* Check status using HTTP GET
```
curl -X 'GET'   'http://localhost:8080/api/2/things/iew.efy:smartkitchen' -H 'accept:application/json'   -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```
```
curl -X 'GET'   'http://localhost:8080/api/2/things/iew.efy:smartkitchen/features/refrigerator' -H 'accept:application/json'   -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```
```
curl -X 'GET'   'http://localhost:8080/api/2/things/iew.efy:smartkitchen/features/refrigerator/properties/defrost' -H 'accept:application/json'   -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' | python3 -m json.tool
```
```
curl -N --http2 -H "Accept:text/event-stream" 'http://localhost:8080/api/2/things/iew.efy:smartkitchen/features/refrigerator' -u 'ditto:ditto' # -H 'accept:application/json'
```
## Demo2 : HTTP PUT + MQTT Notifications
```
curl -X 'PUT' \
  'http://localhost:8080/api/2/things/iew.efy:smartkitchen/features/refrigerator' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' \
  -H 'Content-Type: application/json' \
  -d '{ "properties": { "status" : "off", "temperature": 8, "defrost" : 5 } }'
```
```
curl -X 'PUT' \
  'http://localhost:8080/api/2/things/iew.efy:smartkitchen/features' \
  -H 'accept: application/json' \
  -H 'Authorization: Basic ZGl0dG86ZGl0dG8=' \
  -H 'Content-Type: application/json' \
  -d '{ 
    "refrigerator": { "properties": { "status" : "off", "temperature": 8, "defrost" : 5 } },
    "oven" : { "properties" : { "temperature" : 72, "status":"on"},
    "room" : { "properties" : { "temperature" : 28, "light":"on"} }
  }'

```
```
mosquitto_sub -t iew.efy.notifications/#

```
## Demo3 : Inbox, Outbox commands
```
curl -N --http2 -H "Accept:text/event-stream" http://localhost:8080/api/2/things/iew.efy:smartkitchen/inbox/messages -u 'ditto:ditto'
```
```
curl -X POST   --url http://localhost:8080/api/2/things/iew.efy:smartkitchen/inbox/messages/oven?timeout=0   -H 'content-type: text/plain'   -H 'Authorization: Basic ZGl0dG86ZGl0dG8='   -d 'Stop the timer'
```
