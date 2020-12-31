
var token = "";
export var getToken=()=>{
    return token;
}

export var setToken=(tokenData)=>{
    return token = tokenData;
}

var connectionStatus = false;
var readingStatus = false;
export var getConnectionStatus = ()=>{
    return connectionStatus;
}

export var setConnectionStatus=(status)=>{
    return connectionStatus = status;
}

export var getReadingStatus = ()=>{
    return readingStatus;
}

export var setReadingStatus=(status)=>{
    return readingStatus = status;
}