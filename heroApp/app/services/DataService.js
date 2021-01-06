
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
export let DeviceHWData = {id:0,name:''};
export var getDeviceHWData = ()=>{
    return DeviceHWData;
}

export var setDeviceHWData=(data)=>{
    return DeviceHWData = data;
}

export var sessionList =[{sessionName:'abc',startTime:new Date(),elapseTime:new Date(),ozSparayed:12.1},{sessionName:'xyz',startTime:new Date(),elapseTime:new Date(),ozSparayed:11.1}];

export var sessionData = {};
export var sessionDataList = [];

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