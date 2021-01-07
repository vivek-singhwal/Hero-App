import {getDeviceHWData} from '../services/DataService';
import CryptoJS from "react-native-crypto-js";

const API_URL = "https://hero-api.kesemsolutions.com";
const IV = "5183555c72eec9e4"; // set random initialisation vector

var currentMonth = new Date().getMonth();
var MONTH = currentMonth > 9? currentMonth.toString() :String("0"+ (currentMonth+1));
var DAY = new Date().getDate() > 9?new Date().getDate().toString():"0"+new Date().getDate();
var YEAR = new Date().getFullYear().toString();
var token = YEAR+''+MONTH+''+DAY+'-'+getDeviceHWData().hardwareId+'-heroApp?'


var encryptToken = () => {
    return CryptoJS.AES.encrypt(token, IV).toString();
};

export var getOperatorAPI = () => {
    return fetch(API_URL+'/api/operators', {
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

export var addOperatorAPI = (data) => {
    console.log(">Data ",data);
    return fetch(API_URL+'/api/operators', {
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
    console.log(">addSprayerAPI ",data);
    return fetch(API_URL+'/api/sprays', {
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