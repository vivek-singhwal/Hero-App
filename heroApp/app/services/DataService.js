
var token = "";
export var getToken=()=>{
    return token;
}

export var setToken=(tokenData)=>{
    return token = tokenData;
}

var connectionStatus = false;
var readingStatus = false;
var operatorData = {};
var deviceData = {};
export let DeviceHWData = {hardwareId:0,sdName:'',serverId:null};
export var getDeviceHWData = ()=>{
    return DeviceHWData;
}

export var setDeviceHWData=(data)=>{
    return DeviceHWData = data;
}

export var sessionList =[{location:'abc',comment:'',serverId:'0',startTime:Date.now(),endTime:Date.now(),ozSparayed:12.1,sessionData :{}},{location:'abc',comment:'',serverId:'0',startTime:Date.now(),endTime:Date.now(),ozSparayed:11.1,sessionData :{}}];

export var currentSessionData = {};
export var sessionDataList = [];

export var setCurrentSessionData=(data)=>{
    return currentSessionData = data;
}

export var setSessionDataList=(data)=>{
    return sessionDataList = data;
}

export var getDeviceData = ()=>{
    return deviceData;
}

export var setDeviceData=(data)=>{
    return deviceData = data;
}



export var getConnectionStatus = ()=>{
    return connectionStatus;
}

export var setConnectionStatus=(status)=>{
    return connectionStatus = status;
}

export var getOperatorData = ()=>{
    return operatorData;
}

export var setOperatorData = (operator)=>{
    return operatorData = operator;
}

export var getReadingStatus = ()=>{
    return readingStatus;
}

export var setReadingStatus=(status)=>{
    return readingStatus = status;
}