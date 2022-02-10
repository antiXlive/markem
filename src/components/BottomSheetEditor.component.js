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
import { CustomButtonFilled} from '@components/CustomButton.component';


import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const BottomSheetEditor = (props) => {

    const [bottom,setBottom] = useState(0);

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
        setBottom(HEIGHT*0.26);
    }
    function _keyboardDidHide () {
        setBottom(0);
    }
    return(
        <>
        <StatusBar backgroundColor="#AAA" barStyle='dark-content' />
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <View style={{height:HEIGHT,backgroundColor:'#00000055'}}>
                <TouchableOpacity activeOpacity={0.9} style={{height:'60%'}} onPress={props.closeModal}></TouchableOpacity>
                <View style={{height:props.label==="Edit Student" || props.label==="Edit Course"?'60%':props.label==="Register Student"?'45%':'51%',position:'absolute',bottom:bottom,width:WIDTH,backgroundColor:'#FFF',borderTopLeftRadius:25,borderTopRightRadius:25,paddingTop:'4%'}}>
                    <View style={{height:props.label==="Edit Student" || props.label==="Edit Course"?'12%':'15%',flexDirection:'row',alignItems:'center',paddingHorizontal:'10%'}}>
                        <Text style={{width:'90%',fontSize:WIDTH*0.055,opacity:0.7}}>{props.label}</Text>
                        <MaterialCommunityIcons name="close" size={28} color="#000000" onPress={props.closeModal}/>
                    </View>
                    <View style={{height:props.label==="Edit Student" || props.label==="Edit Course"?'68%':'60%',alignItems:'center',justifyContent:'space-evenly',paddingTop:'5%'}}>
                        {props.children}
                    </View>
                    <View style={{height:'20%',justifyContent:'center'}}>
                        {
                            props.showButton
                            ?props.showButton === 'show'
                            ?<CustomButtonFilled label="SAVE" click={props.handleSave}/>
                            :null
                            :<CustomButtonFilled label="SAVE" click={props.handleSave}/>
                        }
                    </View>
                </View>
            </View>
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

export default BottomSheetEditor;