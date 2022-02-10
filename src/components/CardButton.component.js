import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native'

import constants from '@helpers/constants.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const CardIconedButton = (props) => {
    return (
        <View style={{width:WIDTH*0.34, height:WIDTH*0.36, borderRadius:8,overflow:'hidden',elevation:8}}>
        <TouchableNativeFeedback 
            style={{width:WIDTH*0.34, height:WIDTH*0.36, borderRadius:8}}
            onPress={() => props.action(props.screen)}
        >
            <View style={{width:WIDTH*0.34, height:WIDTH*0.36, borderRadius:8, backgroundColor:'#FFF', elevation:10, alignItems:'center', justifyContent:'space-evenly', paddingVertical:15,borderWidth:0.5,borderColor:'#54dbd5'}}>
                {props.iconParent == "Ionicons"?(<Ionicons name={props.icon} size={23}/>):(<FontAwesome name={props.icon} size={23}/>)}
                <Text style={{}}>{props.label}</Text>
            </View>
        </TouchableNativeFeedback>
        </View>
    )
}
const CardButton = (props) => {
    return (
        <View style={{width:WIDTH*0.35, height:WIDTH*0.32, borderRadius:8,overflow:'hidden'}}>
        <TouchableNativeFeedback 
            style={{width:WIDTH*0.35, height:WIDTH*0.32, borderRadius:8}}
            onPress={() => props.action(props.entry)}
        >
            <View style={{width:WIDTH*0.35, height:WIDTH*0.32, borderRadius:8, backgroundColor:'#54dbd5', elevation:7, alignItems:'center', justifyContent:'center', paddingVertical:15}}>
                <Text style={{fontSize:WIDTH*0.05,color:'#FFF'}}>{props.label}</Text>
            </View>
        </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
   
})

export { CardIconedButton, CardButton };