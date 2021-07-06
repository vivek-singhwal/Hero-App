import React,{useEffect,useState} from 'react';
import {getImagesAPISync,getOperatorAPISync,initDB,updateServerId,getSprayerAPISync,getSessionAPISync,getSessionDataAPISync, getSessionByIdSync, updateServerForSessionDataId, updateSessionsImage} from '../services/DBService';
import {addOperatorAPI, addSprayerAPI,addSessionAPI, updateSessionAPI,addSessionDataAPI,checkConnection, uploadImage} from '../services/apiService';
import {setOperatorData,setDeviceHWData,getLocalSessionId,getOperatorData, getDeviceHWData,predefinedSessionData} from '../services/DataService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateSession} from '../services/DataSyncService';

export default OfflineSync = () =>{
    var checkOperatorSync = ()=>{
        getOperatorAPISync().then((opResult)=>{
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
                    })
                }
            })
        }
        
    }
    var syncSprayer = (result)=>{
        var totalResult = result.length;
        if(totalResult){
            addSprayerAPI(result[totalResult-1]).then((resResult)=>{
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

    var checkSprayerSync=()=>{
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
    
    var uploadImagesToS3 = async()=>{
     const keys = await AsyncStorage.getAllKeys();
     const result = await AsyncStorage.multiGet(keys);
     if(result.length > 0){
        uploadS3Images(result[result.length-1]); 
     }
   }
   
   let uploadS3Images = (imageList)=>{
       if(imageList && imageList.length == 2){
           let key = imageList[0];
           let value = JSON.parse(imageList[1]);
           if(value.length == 0){
              AsyncStorage.removeItem(key);
               return;
           }
           uploadImage(value).then((resp)=>{
            if(resp.status){
             // update imagelist in localDB.  
             let updateImageSessions ={
                 id:key,
                 imageUrl: JSON.stringify(resp.image),
                 isSync:0
             } 
             updateSessionsImage(updateImageSessions).then(()=>{
                AsyncStorage.removeItem(key);
             })
          }
        })
       }
    
  }
    useEffect(()=>{
        initDB('operators').then((res)=>{ });
        initDB('sprayers').then((res)=>{});
        initDB('sessions').then((res)=>{});
        initDB('sessionData').then((res)=>{});
         var interval = setInterval(()=> {
                checkConnection().then((resConnection)=>{
                    if(resConnection){
                        updateSession();
                        updateSessionData();
                        checkOperatorSync();
                        checkSprayerSync();
                        uploadImagesToS3();
                    }
                })
        },15000)
        initDB('sessions').then((res)=>{
            //db init
        });
    var updateSessionData = () =>{
        getSessionDataAPISync().then((respSessionData)=>{
                if(respSessionData && respSessionData.length){
                    for(let i=0;i<respSessionData.length;i++){
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
   
      return ()=>{
            clearInterval(interval);
        }
    },[]);
    return(<></>);
}