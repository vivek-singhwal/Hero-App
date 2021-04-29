import React,{ useEffect, useState } from 'react';
import { View , StyleSheet, Text, TouchableOpacity, TextInput as Input,ScrollView, Image,FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchCamera } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

export default SubSession =()=>{
    var inputBox;
    const [textFocused,setTextFocused] = useState(false);
    const [imageList, setImageList] = useState([]);
    var getIndexVal=(index)=>{
      // console.log(">Index",index);
      if(imageList.length == 3 || imageList.length == 6 || imageList.length == 9){
        return imageList.length - 3 == index
      }else{
        return imageList.length - 1 == index
      } 
    }
    var emptyList = ()=>{
      return(
       <TouchableOpacity onPress={()=>{
        addImages()
        }} style={{borderColor:'#012554',borderWidth:1,width:95,height:90,justifyContent:"center"}}>
                <MaterialIcons name="add" color={'#012554'} size={35} style={{alignSelf:"center"}}/>
              </TouchableOpacity>
      )
    }
    var addImages = () =>{
      let options = {
        
        storageOptions: {
          skipBackup: true,
          path: 'images'
        },
      };
     
      // return
      launchCamera(options, (response) => {
        console.log('Response = ', response);
        // setIsClickable(false);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          // console.log(">Resp",JSON.stringify(response));
          ImageResizer.createResizedImage(response.uri, 1000, 1000, 'JPEG', 50)
          .then(respImg => {
            console.log(">response compressed  img ",respImg);
              let tempList = [...imageList];
              tempList.push(respImg)
              setImageList(tempList);
            /*
            {"height": 1000, "name": "7a98c4e2-4373-4a14-b72b-bfe022f570df.JPEG", "path": "/data/user/0/com.heroapp/cache/7a98c4e2-4373-4a14-b72b-bfe022f570df.JPEG", "size": 18451, "uri": "file:///data/user/0/com.heroapp/cache/7a98c4e2-4373-4a14-b72b-bfe022f570df.JPEG", "width": 750}
            */
            // response.uri is the URI of the new image that can now be displayed, uploaded...
            // response.path is the path of the new image
            // response.name is the name of the new image with the extension
            // response.size is the size of the new image
          })
          .catch(err => {
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
          });
          
        }
      });
      // let tempList = [...imageList];
      // tempList.push(imageList.length)
      // setImageList(tempList);
    }
    return <>
    <View style={{padding:25}}>
       <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:5}}>Location*</Text>
       <Input
                        // onFocus={()=> setTextFocused(true)}
                        // onBlur={()=> setTextFocused(false)}
                        placeholder={'Where did you spray?'}
                        style={{padding:10,marginTop:5,fontSize:16,borderWidth:1,paddingRight:10,borderColor:'#012554',borderRadius:4}}
                        // defaultValue={locationText}
                        // onChangeText={text => setLocationText(text)}
                        // ref = {(input) => this.input = input}
                    />
              <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:16,marginTop:10}}>Comments</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={()=>inputBox.focus()}>
              <View style={{borderColor:textFocused?'#012554':'gray',borderWidth:1.8,height:130,borderRadius:5}}>
                    <Input
                        onFocus={()=> setTextFocused(true)}
                        onBlur={()=> setTextFocused(false)}
                        placeholder={'Notes?'}
                        style={{padding:10,marginTop:5,fontSize:16}}
                        multiline={true}
                        // defaultValue={commentText}
                        // onChangeText={text => setCommentText(text)}
                        ref = {(input) => inputBox = input}
                    />
              </View>
            </TouchableOpacity>
            <Text style={{fontSize:17,color:"#4A4A4A",paddingBottom:10,paddingTop:15}}>Photos</Text>
            <View style={{borderColor:textFocused?'#012554':'gray',borderWidth:1.8,height:450,borderRadius:5,padding:10,paddingStart:15}}>
            <FlatList
            scrollEnabled={false}
            numColumns={3}
            data={imageList}
             ListEmptyComponent={emptyList}
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={{justifyContent: 'flex-start'}}
            renderItem={({item,index})=>
                <View key={index} style={{ margin:7,flexDirection: imageList.length == 3 || imageList.length == 6 || imageList.length == 9?'column':'row' }}>
                  <View>
                    <Entypo color={'gray'} 
                    onPress={()=>{
                        let tempList = [...imageList];
                        tempList.splice(index,1);
                        setImageList(tempList);
                        // console.log(">Hello",imageList);
                      }} 
                      name="circle-with-cross" 
                      size={25} 
                      style={{position:"absolute",top:-8, right:-8 ,alignSelf:"flex-end",zIndex:1,backgroundColor:"#fff",borderRadius:15}}/>
                    <Image style={{width:95,height:90,borderColor:'#012554',borderWidth:1}} source={{uri:item.uri}}/>
                    
                  </View>
                  { imageList.length < 12 && getIndexVal(index) && <TouchableOpacity onPress={()=>{
                    addImages()
                    
                  }} style={(imageList.length == 3 || imageList.length == 6 || imageList.length == 9)?{marginTop:15,borderColor:'#012554',borderWidth:1,width:95,height:90,justifyContent:"center"}:{marginLeft:15,borderColor:'#012554',borderWidth:1,width:95,height:90,justifyContent:"center"}}>
                      <MaterialIcons name="add" color={'#012554'} size={35} style={{alignSelf:"center"}}/>
                    </TouchableOpacity>}
                </View>
           }
         />
              
            </View>
    </View>
    </>
}