
var token = "";
export var getToken=()=>{
    return token;
}

export var setToken=(tokenData)=>{
    return token = tokenData;
}

var connectionStatus = false;
export var readingStatus = false;
var operatorData = {opName:'',chemistryType:'',serverId:null,company:''};
var deviceData = {};

var sessionId = "";
export var getSessionId = ()=>{
    return sessionId;
}

export var setSessionId=(data)=>{
    return sessionId = data;
}

var localSessionId = "";
export var getLocalSessionId = ()=>{
    return localSessionId;
}

export var setLocalSessionId=(data)=>{
    return localSessionId = data;
}

var sessionsObjAPI = {
    "startTime": '',
    "endTime":'',
     "appVersion": "1.0.1",
    "sessionLocation": '',
    operatorId: '',
    sprayerId: '',
    chemistryType: '',
}
export var getSessionObjApiData = ()=>{
    return sessionsObjAPI;
}

export var setSessionObjApiData=(data)=>{
    return sessionsObjAPI = data;
}

export let DeviceHWData = {hardwareId:0,sdName:'',serverId:null,sprayerName:''};
export var getDeviceHWData = ()=>{
    return DeviceHWData;
}

export var setDeviceHWData=(data)=>{
    return DeviceHWData = data;
}

export var sessionList =[{location:'abc',comment:'',serverId:'0',startTime:Date.now(),endTime:Date.now(),ozSparayed:12.1,sessionData :{}},{location:'abc',comment:'',serverId:'0',startTime:Date.now(),endTime:Date.now(),ozSparayed:11.1,sessionData :{}}];
export var predefinedSessionData = {};
export var setPredefinedessionData=(data)=>{
    return predefinedSessionData = data;
}

export var currentSessionData = {};
export var sessionDataList = [/*
    {id:"0",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 },
    {id:"1",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 },
    {id:"2",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 },
    {id:"3",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 },
    {id:"4",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 },
    {id:"5",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 },
    {id:"6",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 },
    {id:"7",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 },
    {id:"8",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 },
    {id:"9",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 }
*/
];
export var currentReadData = [];

export var setCurrentReadData=(data)=>{
    return currentReadData = data;
}

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

export var secondRead = false;

export var getSecondRead=()=>{
    return secondRead;
}
export var setSecondRead=(data)=>{
    return secondRead = data;
}

export var internetConnection = false;

export var setInternetConnection=(data)=>{
    return internetConnection = data;
}

export var btStatus = false;

export var setBtStatus=(status)=>{
    return btStatus = status;
}