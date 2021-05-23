import {getDeviceHWData} from '../services/DataService';
import CryptoJS from "react-native-crypto-js";
import {apiEndPoint,IV} from './constants';

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

export var checkConnection = () => {
    return fetch(apiEndPoint+'/api/tests', {
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
                console.log(">>Error checkConnection ", error)
                return error;
            }
        )
}

export var uploadImage = (images) => {
    /*
        {
        fieldname: 'demo_image',
        originalname: 'spray-icon_low.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: './public/images',
        filename: '2398782347.png',
        path: 'public/images/2398782347.png',
        size: 8548
        }
    */
        const data = new FormData();

        // data.append("demo_image", { uri: image.uri, name: image.name, type: 'image/jpeg' });
        for (const file of images) {
            // data.append('files[]', file, file.name);
            data.append("demo_image", { uri: file.uri, name: file.name, type: 'image/jpeg' });
          }
    // console.log(">Form data ",data,image)
    return fetch(apiEndPoint+'/api/sessions/upload-image?90', {
            body: data,
            method: "POST",
            headers: {'Accept': 'application/json','Content-Type': 'multipart/form-data','Authorization':encryptToken()},
         })
        .then(res =>  res.json())
        .then(
            (result) => {
                // console.log("result ",result)
                return result;
            },
            (error) => {
                console.log(">>Error checkConnection ", error)
                return error;
            }
        )
}

export var getOperatorAPI = () => {
    return fetch(apiEndPoint+'/api/operators', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' ,'Authorization':encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result.result;
            },
            (error) => {
                console.log(">>Error getOperatorAPI ", error)
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
                console.log(">>Error getSessionAPI", error)
                return error;
            }
        )
    }

export var deleteSessionAPI = (sessionId) => {
    //delete esample
    ///api/sessions/8e761d2a-03e1-4daa-9c30-9090764be701
    return fetch(apiEndPoint+'/api/sessions/'+sessionId, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' ,'Authorization':encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                console.log(">>Error deleteSessionAPI", error)
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
                console.log(">>Error getSessionDataAPI", error)
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
//    console.log(">>addOperatorAPI1 ", data)
    return fetch(apiEndPoint+'/api/operators', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' ,Authorization:encryptToken()},
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(">>addOperatorAPI ", result)
                return result.result;
            },
            (error) => {
                console.log(">>Eror addOperatorAPI", error)
                return error;
            }
        )
}

export var addSessionAPI = (data) => {
     /*
       {
            "appVersion": "1.0.1",
            "chemistryType": "NaDCC",
            "operatorId": "82b269e6-1e87-478a-8cbb-e6ea894ceda8",
            "sprayerId": "3208a1f0-5257-4d4d-8869-0853a8707197",
            "startTime": "1610451005260"
        }
    */
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
                console.log(">>Eror addSessionAPI", error)
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
                console.log(">>Eror updateSessionAPI", error)
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
                // console.log(">>result ", result)
                return result;
            },
            (error) => {
                console.log(">>Eror addSessionDataAPI", error)
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
                console.log(">>Eror addSprayerAPI", error)
                return error;
            }
        )
}