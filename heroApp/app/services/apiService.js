import {getDeviceHWData} from '../services/DataService';
import CryptoJS from "react-native-crypto-js";

const apiEndPoint = "https://hero-api.kesemsolutions.com";
const IV = "5183555c72eec9e4"; // set random initialisation vector

var currentMonth = new Date().getMonth();
var MONTH = currentMonth > 9? currentMonth.toString() :String("0"+ (currentMonth+1));
var DAY = new Date().getDate() > 9?new Date().getDate().toString():"0"+new Date().getDate();
var YEAR = new Date().getFullYear().toString();
var token = YEAR+''+MONTH+''+DAY+'-'+getDeviceHWData().hardwareId+'-heroApp?'
var currentOperatorId = "";
var currentSessionId = "";
var currentDeviceId = "";

var encryptToken = () => {
    return CryptoJS.AES.encrypt(token, IV).toString();
};

export var setOperatorId = (operatorId) => {
    currentOperatorId = operatorId;
}
export var setDeviceId = (deviceId) => {
    currentDeviceId = deviceId;
}
export var setSessionId = (sessionId) => {
    currentSessionId = sessionId;
}
export var getOperatorAPI = () => {
    return fetch(apiEndPoint+'/api/operators', {
            method: "GET",
            // body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' ,'Authorization':encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result.result;
            },
            (error) => {
                console.log(">>Eror ", error)
                return error;
            }
        )
}

export var getSessionAPI = () => {
    return fetch(apiEndPoint+'/api/sessions', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' ,'Authorization':encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result.result;
            },
            (error) => {
                console.log(">>Eror ", error)
                return error;
            }
        )
}

export var getSessionDataAPI = () => {
    return fetch(apiEndPoint+'/api/session/data', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' ,'Authorization':encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result.result;
            },
            (error) => {
                console.log(">>Eror ", error)
                return error;
            }
        )
}

export var addOperatorAPI = (data) => {
    /*
        {
        "opName": "Gil",
        "chemistryType": "Lithium",
        "company": "Kesem"
        }
    */
   console.log(">>addOperatorAPI1 ", data)
    return fetch(apiEndPoint+'/api/operators', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' ,Authorization:encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(">>addOperatorAPI ", result)
                return result;
            },
            (error) => {
                console.log(">>Eror ", error)
                return error;
            }
        )
}

export var addSessionAPI = (data) => {
    return fetch(apiEndPoint+'/api/sessions', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' ,Authorization:encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log(">>Eror ", error)
                return error;
            }
        )
}

export var updateSessionAPI = (data) => {
    return fetch(apiEndPoint+'/api/sessions', {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' ,Authorization:encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log(">>Eror ", error)
                return error;
            }
        )
}

export var addSessionDataAPI = (data) => {
    return fetch(apiEndPoint+'/api/session/data', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' ,Authorization:encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log(">>Eror ", error)
                return error;
            }
        )
}

export var addSprayerAPI = (data) => {
    return fetch(apiEndPoint+'/api/sprays', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' ,Authorization:encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log(">>Eror ", error)
                return error;
            }
        )
}