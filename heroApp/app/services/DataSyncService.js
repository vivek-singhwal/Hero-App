import {uploadImageArray} from './apiService';
import {getOperatorData,getDeviceHWData} from '../services/DataService';
import {getImagesAPISync,getSessionAPISync,updateServerId, getSessionByIdSync} from './DBService';
import {addSessionAPI, updateSessionAPI,addSessionDataAPI,checkConnection, uploadImage} from '../services/apiService';
//https://scout-bucket-images.s3.us-west-2.amazonaws.com/images
export var checkAndSyncDbImages = async ()=>{
    var sessions = await getImagesAPISync();
    //console.log( "vivek unsync sessions 01:",sessions);
    sessions.map((session)=>{
        let sessionId = session.id;
        var locationImages = JSON.parse(session.locationImages);
        uploadImageArray(locationImages,sessionId);
    })
}
export var updateSession = () =>{
     getSessionAPISync().then((respSession)=>{
            if(respSession && respSession.length){
                var currentSessionData ={};
                for(let i=0;i<respSession.length;i++){
                    if(respSession[i].sessionData !=undefined && respSession[i].sessionData != null){
                        currentSessionData = JSON.parse(respSession[i]['sessionData']);
                      }
                    var sessionsObjAPI = {
                        "startTime": respSession[i].startTime.toString(),
                        // "endTime":"1609248424619",
                        "appVersion": respSession[i].appVersion,
                        // "sessionLocation": "location1",
                        operatorId: respSession[i].operatorId == null ? getOperatorData().serverId:respSession[i].operatorId,
                        sprayerId: respSession[i].sprayerId == null ? getDeviceHWData().serverId:respSession[i].sprayerId,
                        chemistryType: respSession[i].chemistryType,
                        HWVersion: currentSessionData.getHWVersion,
                        firmware:currentSessionData.getFirmware,
                        serial: currentSessionData.getSerial,
                        model: currentSessionData.getModel,
                        unitName:currentSessionData.getUnitName,
                        isRinse:respSession[i].isRinse,
                        isFinished:respSession[i].isFinished,
                        // "sessionComment": "first comment"
                    }
                    sessionsObjAPI.sessionLocation = respSession[i].sessionLocation;
                    sessionsObjAPI.locationImages = respSession[i].locationImages;
                    sessionsObjAPI.endTime = respSession[i].endTime;
                    sessionsObjAPI.sessionComment = respSession[i].sessionComment;
                    // respSession = [{"appVersion": 1.1, "chemistryType": "NaDCC", "endTime": null, "id": 1, "isFinished": 1, "isRinse": 0, "isSync": 0, "operatorId": "abc04f5c-1b1f-4214-87f7-a899ef368693", "ozSparayed": 1.0821778829895163, "serverId": null, "sessionComment": null, "sessionData": null, "sessionLocation": null, "sprayerId": "41226a0b-5fcf-4eac-9867-49535a809810", "startTime": 1611306974085}];
                   
                    if(respSession[i].serverId){
                        sessionsObjAPI.id = respSession[i].serverId;
                        updateSessionAPI(sessionsObjAPI).then((respData)=>{
                        // console.log(">>updateSessionAPI ",respData)
                        if(respData.success){
                            updateServerId('sessions',respData.result.id,respSession[i].id).then((resUpdate)=>{
                                console.log("success session.");
                            })   
                           }
                       }) 
                    }else{
                        addSessionAPI(sessionsObjAPI).then((respData)=>{
                              if(respData.success){
                               updateServerId('sessions',respData.result.id,respSession[i].id).then((resUpdate)=>{
                                   console.log("success session.");
                               })   
                              }
                       }) 
                    }
               }
            }
        })
}