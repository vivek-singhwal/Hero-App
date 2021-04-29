import React,{ useEffect, useState } from 'react';
import { View , StyleSheet, Text, TouchableOpacity, TextInput as Input,ScrollView, Image,FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export default SubSession =()=>{
    var inputBox;
    const [textFocused,setTextFocused] = useState(false);
    const [imageList, setImageList] = useState(Array.from(Array(12).keys()));
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
       <TouchableOpacity style={{borderColor:'#012554',borderWidth:1,width:95,height:90,justifyContent:"center"}}>
                <MaterialIcons name="add" color={'#012554'} size={35} style={{alignSelf:"center"}}/>
              </TouchableOpacity>
      )
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
                      style={{position:"absolute",top:-8, right:-8,alignSelf:"flex-end",zIndex:1,backgroundColor:"#fff"}}/>
                    <Image style={{width:95,height:90,borderColor:'#012554',borderWidth:1}} source={{uri:"https://scout-bucket-images.s3-us-west-2.amazonaws.com/images/icon-small.png"}}/>
                    
                  </View>
                  { imageList.length < 12 && getIndexVal(index) && <TouchableOpacity style={(imageList.length == 3 || imageList.length == 6 || imageList.length == 9)?{marginTop:15,borderColor:'#012554',borderWidth:1,width:95,height:90,justifyContent:"center"}:{marginLeft:15,borderColor:'#012554',borderWidth:1,width:95,height:90,justifyContent:"center"}}>
                      <MaterialIcons name="add" color={'#012554'} size={35} style={{alignSelf:"center"}}/>
                    </TouchableOpacity>}
                </View>
           }
         />
              
            </View>
    </View>
    </>
}