
var token = "";
export var getToken=()=>{
    return token;
}

export var setToken=(tokenData)=>{
    return token = tokenData;
}

var connectionStatus = false;
export var getStatus = ()=>{
    return connectionStatus;
}

export var setStatus=(status)=>{
    return connectionStatus = status;
}