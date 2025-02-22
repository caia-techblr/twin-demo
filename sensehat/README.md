* Ref:- https://github.com/eclipse-ditto/ditto-examples/tree/master/mqtt-quick-introduction
### Create Policy

```
curl -X PUT 'http://localhost/api/2/policies/ditto.iew:policy' -u 'ditto:ditto' -H 'Content-Type: application/json' -d @policy.json
```

### Create Thing

```
curl -X PUT 'http://localhost/api/2/things/iew.efy:sensehat' -u 'ditto:ditto' -H 'Content-Type: application/json' -d @sensehat.json
```

### Create connections

```
curl -X POST 'http://localhost/devops/piggyback/connectivity?timeout=10' -u 'devops:foobar' -H 'Content-Type: application/json' -d @connection_source.json

curl -X POST 'http://localhost/devops/piggyback/connectivity?timeout=10' -u 'devops:foobar' -H 'Content-Type: application/json' -d @connection_target.json
```

> Update mapper functions `mapToDittoProtocolMsg`, `mapFromDittoProtocolMsg`

### MQTT Publish
```
mosquitto_pub -t iew.efy:sensehat -m '{ "temperature": 23, "humidity": 58, "pressure": 900, "thingId": "iew.efy:sensehat" }' -q 1 -h localhost -p 1883
```
## Reference code & steps
* [mapToDittoProtocolMsg function code](mapToDittoProtocolMsg.js)
* [mapFromDittoProtocolMsg](mapFromDittoProtocolMsg.js)
* [Updating data on Thing : REST APIs](REST-APIs-PUT-Data.md)
* [Retrieving data from Thing : REST APIs](REST-APIs-GET-Data.md)

## TODO / Further Work
* Exploring Live, Twin channels
* Extract data from Thing periodically (MQTT Subscribe/HTTP SSE Events/Web Socket Stream)
* Extract historical data 
* Data Visualization (Node-RED/ThingsBoard)
* [Messages](https://eclipse.dev/ditto/basic-messages.html)


