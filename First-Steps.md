# Create Policy

```
curl -X PUT 'http://localhost/api/2/policies/ditto.iew:policy' -u 'ditto:ditto' -H 'Content-Type: application/json' -d @policy.json
```

# Create Thing

```
curl -X PUT 'http://localhost/api/2/things/iew.efy:sensehat' -u 'ditto:ditto' -H 'Content-Type: application/json' -d @sensehat.json
```

# Create connections

```
curl -X POST 'http://localhost/devops/piggyback/connectivity?timeout=10' -u 'devops:foobar' -H 'Content-Type: application/json' -d @connection_source.json

curl -X POST 'http://localhost/devops/piggyback/connectivity?timeout=10' -u 'devops:foobar' -H 'Content-Type: application/json' -d @connection_target.json
```

> Update mapper functions `mapToDittoProtocolMsg`, `mapFromDittoProtocolMsg`

# MQTT Publish
```
mosquitto_pub -t iew.efy:sensehat -m '{ "thingId": "iew.efy:sensehat", "temperature": 23, "humidity": 58, "pressure": 900 }' -q 1 -h localhost -p 1883
```
