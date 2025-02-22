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
