import {getDeviceHWData} from '../services/DataService';


const ENC_KEY = "bf3c199c2470cb5551207b1e0917c17b"; // set random encryption key
const IV = "5183555c72eec9e4"; // set random initialisation vector
var currentMonth = new Date().getMonth();
var MONTH = currentMonth > 9? currentMonth.toString() :String("0"+ (currentMonth+1));
var DAY = new Date().getDate() > 9?new Date().getDate().toString():"0"+new Date().getDate();
var YEAR = new Date().getFullYear().toString();
console.log(">>year ",MONTH,YEAR,DAY)

var token = YEAR+''+MONTH+''+DAY+'-'+getDeviceHWData().id+'-heroApp?'

var encryptToken = (val) => {
    console.log(">>token ",token)
    const buffer = new ArrayBuffer(token.length);
    const message = new Uint8Array(buffer);
    // const message = new Uint8Array(token);
    // const messageArrayBuffer = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(
    //     message
    // );
    //  RNSimpleCrypto.AES.encrypt(messageArrayBuffer,ENC_KEY, IV).then((resp)=>{
    //     console.log(">>encrypted ",res)
    // });
    // let encrypted = cipher.update(val, 'utf8', 'base64');
    // encrypted += cipher.final('base64');
    // console.log(">> encrypted ",messageArrayBuffer,message)
    return "cipher";
};

export var getOperator = () => {
    return fetch('https://hero-api.kesemsolutions.com/api/operators/92ed4a04-0205-4832-b052-ffd8c47ec232', {
            method: "GET",
            // body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' ,'Authorization':encryptToken(token)},
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