import React,{useEffect,useState} from 'react';
import { View, StyleSheet, Alert ,Modal, Image, TouchableOpacity} from 'react-native';
import { Text,Button ,ProgressBar} from 'react-native-paper';
import Material from 'react-native-vector-icons/MaterialIcons';

import Swiper from './react-native-swiper';

export default LearnHow = ({modalVisible,setModalVisible}) =>{
    const [indxScroll,setIndexScroll ] = useState(0);
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        }}>
         <View 
         style={{
            alignSelf:"center",
            position: 'absolute',
            width: '110%',
            height: '90%',
            justifyContent: 'center',
            backgroundColor: 'rgba(100,100,100, 0.5)',
            padding: 50,
            paddingTop:0,
            paddingBottom:0,
            top:"4%",
            bottom:"4%",
      }}>
        <TouchableOpacity style={{ top:50,bottom:0}}>
          <Material name="close" size={35} style={{alignSelf: "flex-end", color:"#fff" }}/>
        </TouchableOpacity>
         <TouchableOpacity style={{height:'8%'}}
        onPressOut={()=>{
          setModalVisible(false);
          setIndexScroll(0);
        }}
        >
        </TouchableOpacity>
      <Swiper 
      showsPagination={false}
      showsButtons={true}
      loop={true}
      onIndexChanged={(index)=>{
        // console.log(">>indx "+index);
        setIndexScroll(index)
      }}
      
      buttonWrapperStyle={{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top:"40%", left: 0,  paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between',}}
      prevButton={indxScroll == 0 ?<></> : <Button
              color={'#012554'}
              icon={()=><Material 
                        size={25}
                        color={'#fff'}
                        name="keyboard-arrow-left"/>} 
                        mode="contained"
                 >
                {'Back'} 
              </Button>}
      nextButton={
          indxScroll == 2 ? <Button
                  style={{alignSelf:"flex-end"}}
                color={'#012554'}
                contentStyle={{flexDirection:"row-reverse"}}
                icon={()=><Material 
                            size={25}
                            color={'#fff'}
                            name="keyboard-arrow-right"/>} 
                mode="contained"
                onPress={() => {
                    setModalVisible(false);
                    setIndexScroll(0)
              }}
          >
          { 'Done' } 
          </Button> : <Button
                  style={{alignSelf:"flex-end"}}
                color={'#012554'}
                contentStyle={{flexDirection:"row-reverse"}}
                icon={()=><Material 
                            size={25}
                            color={'#fff'}
                            name="keyboard-arrow-right"/>} 
                mode="contained">
          { 'Next' } 
        </Button> }>
       <View style={{backgroundColor:"#fff",height:"100%", paddingTop:15,paddingBottom:25}}>
          <View style={{flexDirection:"row",justifyContent:"space-around",paddingBottom:10}}>
        <View style={{backgroundColor:"#012554",width:30,height:5,alignSelf:"center",}}/>
        <View style={{backgroundColor:indxScroll == 1?"#012554":"gray",width:30,height:5,alignSelf:"center"}}/>
        <View style={{backgroundColor:indxScroll == 2?"#012554":"gray",width:30,height:5,alignSelf:"center"}}/>
        </View>
          <Text style={styles.text}>{'First make sure your sprayer battery is sufficiently charged before beginning a spray session.'}</Text>
          <Image style={{height:"60%", width:"80%",borderColor:"gray",borderWidth:0.7,alignSelf:"center",marginTop:10}} source={require('../asset/learn-more-device1.png')} />
        </View>
        <View style={{backgroundColor:"#fff",height:"100%",paddingTop:15,paddingBottom:25}}>
        <View style={{flexDirection:"row",justifyContent:"space-around",paddingBottom:10}}>
        <View style={{backgroundColor:"gray",width:30,height:5,alignSelf:"center",}}/>
        <View style={{backgroundColor:"#012554",width:30,height:5,alignSelf:"center"}}/>
        <View style={{backgroundColor:"gray",width:30,height:5,alignSelf:"center"}}/>
        </View>
          <Text style={styles.text}> {'Next, insert the charged battery into the battery housing located on the side of your sprayer.'}</Text>
          <Image style={{height:"60%",width:"80%",borderColor:"gray",borderWidth:0.7,alignSelf:"center"}} source={require('../asset/learn-more-device2.png')} />
        </View>
        <View style={{backgroundColor:"#fff",height:"100%",paddingTop:15,paddingBottom:25}}>
        <View style={{flexDirection:"row",justifyContent:"space-around",paddingBottom:10}}>
        <View style={{backgroundColor:"gray",width:30,height:5,alignSelf:"center",}}/>
        <View style={{backgroundColor:"gray",width:30,height:5,alignSelf:"center"}}/>
        <View style={{backgroundColor:"#012554",width:30,height:5,alignSelf:"center"}}/>
        </View>
          <Text style={[styles.text]}>{'Finally, make sure your sprayer is powered ON. Wait 5 seconds for your sprayer to enter pairing mode.'}</Text>
          <Image style={{height:"60%",width:"80%",borderColor:"gray",borderWidth:0.7,alignSelf:"center"}} source={require('../asset/learn-more-device3.png')} />
        </View>
      </Swiper>
      <TouchableOpacity style={{height:'8%'}}
        onPressOut={()=>{
          setModalVisible(false);
          setIndexScroll(0);
        }}
        ></TouchableOpacity>
      </View>
      </Modal>
      )
}
const styles = StyleSheet.create({
    text: {
        paddingLeft:5,
        paddingRight:5,
        paddingTop:6,
        fontSize: 17,
        textAlign:"center",
        paddingBottom:10
    }
  });