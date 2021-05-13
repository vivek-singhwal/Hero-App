import React,{useEffect,useState} from 'react';
import { Text, View, TouchableOpacity ,Image,TextInput, FlatList, ScrollView} from 'react-native';
import { getSessionByIdSync } from '../services/DBService';
import {getOperatorData,getDeviceData,getDeviceHWData, setDeviceHWData, currentSessionData} from '../services/DataService';

export default EditScreen = ({route, navigation}) =>{
    const { id } = route.params;
    const [ session, setSession] = useState({id:"0",locationImages:["https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg","https://scout-bucket-images.s3.us-west-2.amazonaws.com/images/E88AD04F-08D3-43CF-BCDB-749EAA130D1B.jpg"], sessionLocation: 'Helo',sessionComment:'fsdfkshdkfad', startTime:  Date.now(), endTime:  Date.now(), ozSparayed: parseInt(25)/29.57 })
    
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            getSessionByIdSync(id).then((resSession)=>{
                if(resSession && resSession.length){
                    if(resSession[0].locationImages){
                        resSession[0].locationImages = JSON.parse(resSession[0].locationImages);
                    }
                }
                setSession(resSession[0]);
            });
          });
        return ()=>{
            unsubscribe;
        }  
    })

    function formatAMPM(date) {
        var hours = new Date(date).getHours();
        var minutes = new Date(date).getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }
      var emptyList = ()=>{
        return(
         <Text style={{fontSize:18}}>No images found.</Text>
        )
      }
    return(<>
    <ScrollView>
    <View style={{flexDirection:"column",padding:15}}>
        {/* <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{fontSize:18,fontWeight:"bold"}}>{session.sessionLocation}</Text>
            <Text>{id}</Text>
        </View> */}
         <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={{fontSize:22,fontWeight:"bold"}}>{session.sessionLocation}</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('EditSession',{id:session.id,images: session.locationImages, comment: session.sessionComment, location:session.sessionLocation})} style={{fontSize:18}}> 
                      <Text style={{fontSize:18,textDecorationLine:"underline"}}>Edit</Text>
                    </TouchableOpacity>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                    <Text style={{fontSize:18}}>Operator:</Text>
                    <Text style={{fontSize:16,}}>{getOperatorData().opName}</Text>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                    <Text style={{fontSize:18}}>Sprayer:</Text>
                    <Text style={{fontSize:16,}}>{getDeviceHWData().sprayerName}</Text>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                    <Text style={{fontSize:18}}>Oz Sprayed:</Text>
                    <Text style={{fontSize:16,}}>{parseFloat(session.ozSparayed).toPrecision(2)} Oz</Text>
                   </View>
                   <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                    <Text style={{fontSize:18}}>Session Time:</Text>
                    <Text style={{fontSize:16,}}>{formatAMPM(session.startTime)} - {formatAMPM(session.endTime)}</Text>
                   </View>
                 <Text style={{paddingTop:15,fontSize:18,paddingBottom:7}}>
                     Comments
                 </Text>
                
                <View style={{borderColor:'#012554',borderWidth:1,height:130,borderRadius:5}}>
                    <TextInput
                        editable={false}
                        style={{padding:10,marginTop:5,fontSize:16}}
                        multiline={true}
                        defaultValue={session.sessionComment}
                        // onChangeText={text => setCommentText(text)}
                        // ref = {(input) => inputBox = input}
                    />
              </View>
              <View style={{ borderColor:'#012554', borderWidth:1, height:450, borderRadius:5, padding:10 ,marginTop:15}}>
            <FlatList
            scrollEnabled={false}
            numColumns={3}
            data={session.locationImages}
            // data={Array.from(Array(12).keys())}
             ListEmptyComponent={emptyList}
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={{ justifyContent: 'flex-start',width:"90%",}}
            renderItem={({item,index})=>
                <View key={index} style={{width:"32%", margin:7,flexDirection: session.locationImages.length == 3 || session.locationImages.length == 6 || session.locationImages.length == 9?'column':'row' }}>
                    <Image style={{width:85,height:90,borderColor:'#012554',borderWidth:1}} source={{uri:item}}/>
                </View>
           }
         />
              
            </View>
            <TouchableOpacity style={{ borderColor:"red",borderWidth:1, padding:10,marginBottom:10, marginTop:10}}>
                    <Text style={{ alignSelf:"center", color:"red", fontSize:18}}>Delete Session</Text>
            </TouchableOpacity>
    </View>
    </ScrollView>
    </>)
}