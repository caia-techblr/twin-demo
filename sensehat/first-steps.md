
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
mosquitto_pub -t iew.efy:sensehat -m '{ "temperature": 23, "humidity": 58, "pressure": 900, "thingId": "iew.efy:sensehat" }' -q 1 -h localhost -p 1883
```

### mapToDittoProtocolMsg
```
function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    // Get sent data
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    // Parse received data
    const jsonData = JSON.parse(jsonString);
    // Get thing's namespace and ID
    const thingId = jsonData.thingId.split(':');
    // Prepare features to be set
    const value = {
       temperature: { 
            properties: { 
                value: jsonData.environment.temperature 
            } 
        },
        humidity: { 
            properties: { 
                value: jsonData.environment.humidity
            } 
        }, 
		pressure: { 
            properties: { 
                value: jsonData.environment.pressure
            } 
        }
    };
    // Return Ditto Protocol message
	return Ditto.buildDittoProtocolMsg(
        thingId[0], // your namespace
        thingId[1],
        'things', // we deal with a thing
        'twin', // we want to update the twin
        'commands', // create a command to update the twin
        'modify', // modify the twin
        '/features', // modify all features at once
        headers,
        value
    );
}
```

### mapFromDittoProtocolMsg
```
function mapFromDittoProtocolMsg(namespace, id, group, channel, criterion, action, path, dittoHeaders, value, status, extra) {
    // Create text data
    let textPayload = '{"temperature": ' + value.temperature.properties.value + ', "humidity": ' + value.humidity.properties.value + ', "pressure": ' + value.pressure.properties.value + ', "thingId": "' + namespace + ':' + id + '"}';
    // In this case we data only in text format
    let bytePayload = null;
    // Set message content type
    let contentType = 'text/plain; charset=UTF-8';

    // Return mapped message
    return  Ditto.buildExternalMsg(
        dittoHeaders,
        textPayload,
        bytePayload,
        contentType
    );
}
```
