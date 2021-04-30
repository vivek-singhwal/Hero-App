import React,{useEffect,useState} from 'react';
import { View, StatusBar, NativeModules, NativeEventEmitter ,SafeAreaView,StyleSheet, Alert, TouchableHighlight,Modal, Image} from 'react-native';
import { Text,Button ,ProgressBar} from 'react-native-paper';
import Material from 'react-native-vector-icons/MaterialIcons';
import Onboarding from 'react-native-onboarding-swiper';
import Swiper from 'react-native-swiper'

export default LearnHow = ({modalVisible,setModalVisible}) =>{
  // let indxScroll = 0; 
    const [counter,setCounter] = useState(1);
    const [progressValue,setProgressValue] = useState(0);
    const [ indxScroll,setIndexScroll ] = useState(0);
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
         <View 
         style={{
             alignSelf:"center",
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(100,100,100, 0.5)',
            padding: 50,
            paddingTop: 150,
            paddingBottom: 150,
      }}>
    {/* <Onboarding
       
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../asset/learn-more-device1.png')} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../asset/learn-more-device1.png')} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      /> */}
      <Swiper 
      showsPagination={false}
      showsButtons={true}
      loop={false}
      onIndexChanged={(index)=>{
        // console.log(">>indx "+index);
        setIndexScroll(index)
      }}
      
      buttonWrapperStyle={{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top:"30%", left: 0,  paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between',}}
      prevButton={<Button
        // style={{width:"60%"}}
        color={'#012554'}
        // contentStyle={{flexDirection:"row-reverse"}}
        icon={()=><Material 
                    // style={{backgroundColor:"pink"}}
                size={25}
                    color={'#fff'}
                    name="keyboard-arrow-left"/>} 
        mode="contained"
        
    //     onPress={() => {
    //         setCounter(preCount=>preCount+1)
    //     if(counter == 3){
    //         setModalVisible(false);
    //         setCounter(1);
    //     }
    //  }}
  >
 {'Back'} 
</Button>}
      nextButton={
indxScroll == 2 ? <Button
        style={{alignSelf:"flex-end"}}
       color={'#012554'}
       contentStyle={{flexDirection:"row-reverse"}}
       icon={()=><Material 
                   // style={{backgroundColor:"pink"}}
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
                   // style={{backgroundColor:"pink"}}
                   size={25}
                   color={'#fff'}
                   name="keyboard-arrow-right"/>} 
       mode="contained"
    //    onPress={() => {
    //    if(indxScroll == 2){
    //        setModalVisible(false);
    //        setCounter(1);
    //    }
    // }}
 >
{ 'Next' } 
</Button> } 
      // renderPagination={(index, total, context)=><View style={{alignSelf:"center",flexDirection:"row",backgroundColor:"#fff"}}> 
      // </View>}
      >
        <View style={{backgroundColor:"#fff",height:"85%",justifyContent:"center",paddingBottom:25}}>
          <Text style={styles.text}>{'First, make sure your sprayer \n battery is charged and\n inserted correctly into the \n battery housing.'}</Text>
          <Image style={{height:300,borderColor:"gray",borderWidth:0.7,alignSelf:"center"}} source={require('../asset/learn-more-device1.png')} />
        </View>
        <View style={{backgroundColor:"#fff",height:"85%",justifyContent:"center",paddingBottom:25}}>
          <Text style={styles.text}> {'Next, make sure your sprayer\n is powered ON, Wait 5 seconds\n for your sprayer to enter\n paring mode.'}</Text>
          <Image style={{height:300,borderColor:"gray",borderWidth:0.7,alignSelf:"center"}} source={require('../asset/learn-more-device2.png')} />
        </View>
        <View style={{backgroundColor:"#fff",height:"85%",justifyContent:"center",paddingBottom:25}}>
          <Text style={styles.text}>{"Finally, turn your mobile device's bluetooth ON\n "} {'Return to the Scout ES mobile \n app and select the sprayer\n you want to connect with.'}</Text>
          <Image style={{height:230,width:"80%",borderColor:"gray",borderWidth:0.7,alignSelf:"center"}} source={require('../asset/bleStatus.png')} />
        </View>
      </Swiper>
      </View>
      </Modal>
      )
    return(
        <>
        
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}>
   <View
   onStartShouldSetResponderCapture={(event)=>{console.log("Event"+event);return true;}}
      onResponderMove={(event)=>{
        console.log(">Count "+counter,event.nativeEvent.locationX);
        if(event.nativeEvent.locationX > 150 && event.nativeEvent.locationX < 200){
            setCounter(preCount=>preCount+1);
            return true;
        }
        if(event.nativeEvent.locationX > 15  && event.nativeEvent.locationX  < 149){
        setCounter(preCount=>preCount-1);
        return true
        }
        console.log(">>Event ",event.nativeEvent.locationX)
        // console.log(">>Event ",event.nativeEvent.locationY)
      }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(100,100,100, 0.5)',
        padding: 40,
      }}>
  <ProgressBar progress={(counter * 33.3)/100} color={'#012554'} style={{height:10,top:10,width:"87%",alignSelf:"center"}}/>
  <View style={[styles.modalView,{ justifyContent:"space-around",flexDirection:"column"}]}>
        <View style={{marginBottom:15}}>
        <Text style={[styles.modalText]}>
        {counter == 1 && 'First, make sure your sprayer \n battery is charged and\n inserted correctly into the \n battery housing.'}
        {counter == 2 && 'Next, make sure your sprayer\n is powered ON, Wait 5 seconds\n for your sprayer to enter\n paring mode.'}
        {counter == 3 && "Finally, turn your mobile device's bluetooth ON\n "}
        </Text>
        {counter == 3 && <Text style={[styles.modalText]}>
            {'Return to the Scout ES mobile \n app and select the sprayer\n you want to connect with.'}
            </Text>}
         {/* <Text style={[styles.modalText]}> */}
             {/* {counter == 2 && 'cachement area, over a \n bucket,drain or sink.'} */}
             {/* {counter == 3 && "Rinse' will initiate the pump \n to run for 30 seconds."} */}
        {/* </Text> */}
        </View>
       
        {counter == 1 && <Image style={{height:300,borderColor:"gray",borderWidth:0.7,}} source={require('../asset/learn-more-device1.png')} />}
        {counter == 2 && <Image style={{height:300,borderColor:"gray",borderWidth:0.7,}} source={require('../asset/learn-more-device2.png')} />}
        {counter == 3 && <Image style={{height:230,width:"80%",borderColor:"gray",borderWidth:0.7,}} source={require('../asset/bleStatus.png')} />}

    <View style={{flexDirection:"row",width:"100%",paddingBottom:15,justifyContent:"space-around",marginTop:20}}>
     {counter == 1 && <View style={{justifyContent:"center",width:"30%"}}/>}
       

        {counter > 1  && 
        <Button
            style={{justifyContent:"center",width:"40%"}}
            color={'#012554'}
            //  contentStyle={{flexDirection:"row-reverse"}}
            icon={()=><Material 
                        // style={{backgroundColor:"pink"}}
                    size={25}
                        color={'#012554'}
                        name="keyboard-arrow-left"/>} 
            mode="outlined"
            
            onPress={() =>{
                setCounter(preCount=>preCount-1)
             }
              }>
            Back
        </Button>}  
        <Button
        style={{justifyContent:"center",width:"40%"}}
        color={'#012554'}
         contentStyle={{flexDirection:"row-reverse"}}
         icon={()=><Material 
                    // style={{backgroundColor:"pink"}}
                   size={25}
                    color={'#fff'}
                    name="keyboard-arrow-right"/>} 
        mode="contained"
        
        onPress={() => {
            setCounter(preCount=>preCount+1)
          if(counter == 3){
            setModalVisible(false);
            setCounter(1);
          }
          }}>
         {counter < 3 ?'Next':'Done'} 
        </Button>
      </View>
     
    </View>
    </View>
  </Modal>
  </>)
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      
    },
    modalView: {
      margin: 20,
      backgroundColor:"black",
     
      backgroundColor: "white",
      borderRadius: 4,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 4,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
    //   marginTop: 20,
    //   paddingBottom:5,
    lineHeight: 25,
      textAlign: "center"
    },
    wrapper: {
        // width:200,
        // height:500
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        // color: '#fff',
        fontSize: 20,
        textAlign:"center"
        // fontWeight: 'bold'
    }
  });