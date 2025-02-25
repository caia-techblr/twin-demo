function mapFromDittoProtocolMsg(namespace, id, group, channel, criterion, action, path, dittoHeaders, value, status, extra) {
    // Create text data
    let payload = { 
        refrigerator : { 
            status : value.refrigerator.properties.status,
            temperature : value.refrigerator.properties.temperature, 
            defrost : value.refrigerator.properties.defrost 
        },
        room : {
            temperature : value.refrigerator.properties.temperature,
            light :  value.refrigerator.properties.light
        }
    };  
    let jsonPayload = JSON.stringify(payload);      
    
    // In this case we data only in text format
    let bytePayload = null;
    // Set message content type
    let contentType = 'text/plain; charset=UTF-8';

    // Return mapped message
    return  Ditto.buildExternalMsg(
        dittoHeaders,
        jsonPayload,
        bytePayload,
        contentType
    );
}
