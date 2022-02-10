import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    Keyboard,
    Animated,
    StatusBar,
    TouchableOpacity,
    Modal,
    StyleSheet
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomButtonFilled, CustomButtonOutlined } from '@components/CustomButton.component';
import { CardButton } from '@components/CardButton.component';


import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const BottomSheetForm = (props) => {

    const [bottom,setBottom] = useState(0);
    const [entry, setEntry] = useState(null);
    // const AnimatedViewRef = useRef();
    // const animatedValue = useRef(new Animated.Value(0)).current;

    let keyboardDidShowListener = null;
    let keyboardDidHideListener = null;


    useEffect(() => {
        keyboardDidShowListener =  Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        keyboardDidHideListener =  Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    })
    function _keyboardDidShow () {
        if(props.label==='New Batch'){
            setBottom(HEIGHT*0.18);
        }
        else{
            setBottom(HEIGHT*0.22);
        }
    }
    function _keyboardDidHide () {
        setBottom(0);
    }
    const handleEntry = (entry) => {
        setEntry(entry);
        // props.setEntry(entry);
    }
    return(
        <>
        <StatusBar backgroundColor={entry=='bulk'?'#54dbd5':"#AAA"} barStyle={entry=='bulk'?'light-content':'dark-content'}/>
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            {
                entry === 'bulk'
                ?(
                    <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#54dbd5',alignItems:'center',paddingTop:HEIGHT*0.06,paddingHorizontal:'5%'}}>
                        <Text style={{fontSize:WIDTH*0.065, color:'#FFFFFF',opacity:0.9,textAlign:'center',lineHeight:HEIGHT*0.065,marginBottom:HEIGHT*0.08}}>MAKE SURE YOUR EXCEL FILE CONTAIN ONLY THESE COLUMNS</Text>
                        <Image source={props.image} style={{width:WIDTH*0.8, height:WIDTH*0.6,marginBottom:HEIGHT*0.03}} resizeMode="stretch"/>
                        <Text style={{width:WIDTH*0.6,fontSize:WIDTH*0.04, color:'#FFFFFF',opacity:0.9,textAlign:'center',letterSpacing:4,lineHeight:HEIGHT*0.04,marginBottom:HEIGHT*0.1}}>STUDENT BULK ENTRY CSE B.TECH 2018-2022</Text>
                        <View style={{width:WIDTH,height:'15%',position:'absolute',bottom:0}}>
                            <CustomButtonOutlined label="OKAY" click={props.handleContinue}/>
                        </View>
                    </View>
                )
                :(
                    <View style={{height:HEIGHT,backgroundColor:'#00000055'}}>
                        <TouchableOpacity activeOpacity={0.9} style={{height:'60%'}} onPress={props.closeModal}></TouchableOpacity>
                        <View style={{height:entry?props.label==="New Student" || props.label==="New Class" || props.label==='New Course'?'60%':'51%':'45%',position:'absolute',bottom:bottom,width:WIDTH,backgroundColor:'#FFF',borderTopLeftRadius:25,borderTopRightRadius:25,paddingTop:'4%'}}>
                            <View style={{height:entry?'12%':'18%',flexDirection:'row',alignItems:'center',paddingHorizontal:'10%'}}>
                                <Text style={{width:'90%',fontSize:WIDTH*0.055,opacity:0.7}}>{props.label}</Text>
                                <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal}/>
                            </View>
                            <View style={{height:'65%',alignItems:'center',justifyContent:'space-evenly',paddingTop:'5%'}}>
                            {
                                entry
                                ?(
                                    props.children
                                )
                                :(
                                    <View style={{height:'86%',flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'center',paddingHorizontal:'7%',paddingTop:'2%'}}>
                                        <CardButton label="Single Entry" entry="single" action={handleEntry}/>
                                        <CardButton label="Bulk Entry" entry="bulk" action={handleEntry}/>
                                    </View>
                                )
                            }
                            </View>
                            {
                                entry
                                ?(
                                    <View style={{height:'20%',position:'absolute',bottom:'8%',width:WIDTH,justifyContent:'center'}}>
                                        <CustomButtonFilled label="SAVE" click={props.handleSave}/>
                                    </View>
                                )
                                :null
                            }
                        </View>
                    </View>
                )
            }
        </Modal>
        </>
    )
}

const styles = new StyleSheet.create({
    modal:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height:HEIGHT,
        width:WIDTH,
        backgroundColor:'#00000050',
        zIndex:100
    }
})

export default BottomSheetForm;