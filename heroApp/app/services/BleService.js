var service = {};

let peripherial = {};
let currentCommand = "";

//service.deviceName = 'GhostBaster_V1';
service.bleService = "d973f2e0-b19e-11e2-9e96-0800200c9a66";
service.TXCharacteristic = "d973f2e1-b19e-11e2-9e96-0800200c9a66";
service.RXCharacteristic = "d973f2e2-b19e-11e2-9e96-0800200c9a66";
service.UART = "0000fee3-0000-1000-8000-00805f9b34fb";

let defaultBleResults = {
    'getSerial' : "",
    'getModel': "",
    'getTotalTime' : "",
    'getTotalVolume' : "",
    'getFirmware' : "",
    'updateFirmware' : "",
    'sprayDisable':"",
    'sprayEnable':"",
    'getPumpState':"",
    'getHVState':"",
    'getError':"",
    'getFlow':"",
    'getESV':"",
    'getBatteryLevel':""
    //bleResults
}

export var bleCommands = [
    'getSerial',
    'getModel',
    'getTotalTime',
    'getTotalVolume',
    'getFirmware',
    'updateFirmware',
    'sprayDisable',
    'sprayEnable',
    'getPumpState',
    'getHVState',
    'getError',
    'getFlow',
    'getESV',
    'getBatteryLevel'
];

export var bleResults = {
    'getSerial' : "",
    'getModel': "",
    'getTotalTime' : "",
    'getTotalVolume' : "",
    'getFirmware' : "",
    'updateFirmware' : "",
    'sprayDisable':"",
    'sprayEnable':"",
    'getPumpState':"",
    'getHVState':"",
    'getError':"",
    'getFlow':"",
    'getESV':"",
    'getBatteryLevel':""
    //bleResults
}

export var setDefaultValue = ()=>{
    bleResults = defaultBleResults;
    isReadOk = false;
}


export var getCurrentCmd = ()=>{
    return currentCommand;
}

export var setCurrentCmd = (cmd)=>{
    currentCommand = cmd;
}
export var initCmdSeq = [
    'getSerial', //this must be first
    'getModel',
    'getTotalTime',
    'getTotalVolume',
    'getFirmware',
    //'updateFirmware',
    //'sprayDisable',
    //'sprayEnable',
    'getHVState',
    'getError',
    'getFlow',
    //'getBatteryLevel',
    'getESV',
    'getPumpState',
    'done'
];

var isReadOk = false;
export var getReadOk = () => {
    return isReadOk;
}
export var setReadOk = (val) => {
    isReadOk = val;
}

service.getPeripherial= function(){
    return peripherial;
};
service.setPeripherial = function(p){
    peripherial=p;
};

service.diconnectDevice = function(){
    if(peripherial.id != undefined){
        BleManager.disconnect(peripherial.id);
    }
};

export default service;

