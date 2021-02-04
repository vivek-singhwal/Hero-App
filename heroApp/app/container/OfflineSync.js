import React,{useEffect,useState} from 'react';
import {getOperatorAPISync,initDB,updateServerId,getSprayerAPISync,getSessionAPISync,getSessionDataAPISync, getSessionByIdSync, updateServerForSessionDataId} from '../services/DBService';
import {addOperatorAPI, addSprayerAPI,addSessionAPI, updateSessionAPI,addSessionDataAPI,checkConnection} from '../services/apiService';
import {setOperatorData,setDeviceHWData,getLocalSessionId,getOperatorData, getDeviceHWData,predefinedSessionData} from '../services/DataService';
// import {BluetoothStatus} from 'react-native-bluetooth-status';
import {getInterval} from '../services/BleService';

export default OfflineSync = () =>{

   const [count,setCount]=useState(false);
    var checkOperatorSync = ()=>{
        getOperatorAPISync().then((opResult)=>{
            // console.log(">>opResult",opResult);
            if(opResult && opResult.length){
                if(opResult[0].serverId && !opResult[0].isSync){
                    updateServerId('operators',opResult[0].serverId,opResult[0].id).then((resUpdate)=>{
                        // syncOperator(totalResult-1);
                    })
                }
                syncOperator(opResult)
            }
        })
    } 
    var syncOperator=(result)=>{
        var totalResult = result.length;
        if(totalResult){
            addOperatorAPI(result[totalResult-1]).then((resResult)=>{
                if(result && result.length){
                    updateServerId('operators',resResult.id,result[0].id).then((resUpdate)=>{
                        // syncOperator(totalResult-1);
                        var opObj = getOperatorData();
                        opObj.serverId = resResult.id;
                        setOperatorData(opObj);
                        // var opObj = {"chemistryType": resResult.chemistryType, "company": resResult.company, "opName": resResult.opName, "serverId": resResult.serverId}
                        //  setOperatorData(opObj);
                    })
                }
            })
        }
        
    }
    var syncSprayer = (result)=>{
        var totalResult = result.length;
        if(totalResult){
            addSprayerAPI(result[totalResult-1]).then((resResult)=>{
                // console.log(">>Sperayer sync",resResult)
                if(result && result.length){
                    updateServerId('sprayers',resResult.result.id,result[0].id).then((resUpdate)=>{
                        // syncOperator(totalResult-1);
                        var spObj = getDeviceHWData();
                        spObj.serverId = resResult.result.id;
                        setDeviceHWData(spObj);
                        // var opObj = {"chemistryType": result.chemistryType, "company": result.company, "opName": result.opName, "serverId": resResult.serverId}
                        // setDeviceHWData(opObj);
                    })
                }
            })
        }
        
    }

    checkSprayerSync=()=>{
        // console.log(">>sprayer sync");
        getSprayerAPISync().then((opResult)=>{
            // console.log(">>checkSprayerSync ",opResult);
            if(opResult && opResult.length){
                if(opResult[0].serverId || !opResult[0].isSync){
                    updateServerId('sprayers',opResult[0].serverId,opResult[0].id).then((resUpdate)=>{
                        // syncOperator(totalResult-1);
                    })
                }
                syncSprayer(opResult)
            }
        })
    }
    useEffect(()=>{
        if(count){
            initDB('operators').then((res)=>{ });
            initDB('sprayers').then((res)=>{});
            initDB('sessions').then((res)=>{});
            initDB('sessionData').then((res)=>{});
            setCount(false);
        }
        
         var interval = setInterval(()=> {
            // clearInterval(interval);
             if(!count){
                checkConnection().then((resConnection)=>{
                    // console.log(">>checkConnection ",resConnection)
                    if(resConnection){
                        updateSession();
                        updateSessionData();
                        checkOperatorSync();
                        checkSprayerSync();
                    }
                })
             }
        },8000)
        initDB('sessions').then((res)=>{
        
        });
    var updateSessionData = () =>{
        getSessionDataAPISync().then((respSessionData)=>{
            // console.log(">>getSessionDataAPISync ",respSessionData)
                if(respSessionData && respSessionData.length){
                    for(let i=0;i<respSessionData.length;i++){
                        // if(respSessionData[i].serverSessionId && respSessionData[i].serverId == null){
                        //     // if server session id and sessiondata server id not exist
                        //     // add session data with server session id.
                            
                        //     // JSON.parse(listSession[i]['sessionData']);
                            

                        // }
                        // else if(respSessionData[i].serverSessionId == null && respSessionData[i].serverId){
                        //       // if server session id not and sessiondata server id exist
                        // }
                        //  if(respSessionData[i].serverSessionId == null && respSessionData[i].serverId == null){
                            // if server session id not and sessiondata server id exist
                            // if both not exist.
                            // check and update 
                              getSessionByIdSync(respSessionData[i].sessionId).then((respSession)=>{
                                // console.log(">getSessionByIdSync ",respSession);
                                if(respSession && respSession.length){
                                    if(respSession[0].serverId){
                                        var sessionObjApi=  JSON.parse(respSessionData[i]['sessionData']);
                                        // sessionObjApi.timeStamp = Date.now();
                                        sessionObjApi.sessionId = respSession[0].serverId;
                                        addSessionDataAPI(sessionObjApi).then((respData)=>{
                                             if(respData.success){
                                                updateServerForSessionDataId(respSessionData[i].id,respData.result.id,respSession[0].serverId).then(()=>{
                                                    console.log("Success sessionData");
                                                })
                                             }
                                        //   console.log("Request call ::"+JSON.stringify(respData),new Date(Date.now()));
                                        }) 
                                    }
                                }
                            })
                        // }
                    }
            }
        })   
    }
    var updateSession = () =>{
        // update session as per session start
        // Add and get session 
        // if(getLocalSessionId() && getLocalSessionId() != ""){
            getSessionAPISync().then((respSession)=>{
                // console.log(">>getSessionAPISync ",respSession)
                if(respSession && respSession.length){
                    // update session list into API
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
                            isRinse:respSession[i].isRinse
                            // "sessionComment": "first comment"
                        }
                        
                        sessionsObjAPI.sessionLocation = respSession[i].sessionLocation;
                        sessionsObjAPI.endTime = respSession[i].endTime;
                        sessionsObjAPI.sessionComment = respSession[i].sessionComment;
                        // respSession = [{"appVersion": 1.1, "chemistryType": "NaDCC", "endTime": null, "id": 1, "isFinished": 1, "isRinse": 0, "isSync": 0, "operatorId": "abc04f5c-1b1f-4214-87f7-a899ef368693", "ozSparayed": 1.0821778829895163, "serverId": null, "sessionComment": null, "sessionData": null, "sessionLocation": null, "sprayerId": "41226a0b-5fcf-4eac-9867-49535a809810", "startTime": 1611306974085}];
                        // console.log(">>sessionApiObj ",JSON.stringify(respSession));
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
                                // console.log(">>addSessionAPI ",respData)
                                  if(respData.success){
                                   updateServerId('sessions',respData.result.id,respSession[i].id).then((resUpdate)=>{
                                       console.log("success session.");
                                   })   
                                  }
                                 console.log("Request call ::"+JSON.stringify(respData));
                           }) 
                        }
                         
                    
                   }
                }
            })



            // addSessionAPI(sessionApiObj).then((respData)=>{
            //        console.log(">>respData ",JSON.stringify(respData));
            //        if(respData.success){
            //         setSessionId(respData.result.id);
            //         enableInterval();
            //         // EventRegister.emit('StartInterval')
            //        }else{
            //          Alert.alert('HeroApp','Server Error.')
            //          setReadStatus(false);
            //        }
            //       console.log("Request call ::"+JSON.stringify(respData),new Date(Date.now()));
            //     }) 
        // }
        // after session add, add session data.
        // console.log(">>Here ");
    }
       
    //    let btListner = BluetoothStatus.addListener(({ eventType, status }) => {
    //        console.log(">>status ",status,eventType)
        
    // })
        return ()=>{
            clearInterval(interval);
        }   
        // return ()=>{
        //     BluetoothStatus.removeListener(btListner)
        // }
    })
    return(<>
    </>)


}