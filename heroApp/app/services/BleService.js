var service = {};

let peripherial = {};
let data = {};

service.deviceName = 'GhostBaster_V1';
service.bleService = "d973f2e0-b19e-11e2-9e96-0800200c9a66";
service.TXCharacteristic = "d973f2e1-b19e-11e2-9e96-0800200c9a66";
service.RXCharacteristic = "d973f2e2-b19e-11e2-9e96-0800200c9a66";
service.UART = "0000fee3-0000-1000-8000-00805f9b34fb";

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
service.getData= function(){
    return data;
};
service.setData = function(d){
    data=d;
};

export default service;

