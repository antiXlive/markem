import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import constants from '@helpers/constants.js';


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const DefaultStatus = () => {
    return(
        <View style={[styles.ringOuter,styles.defaultOuter]}>
            <View style={[styles.ringInner,styles.defaultInner]}></View>
        </View>
    )
}
const PresentStatus = () => {
    return(
        <View style={[styles.ringOuter,styles.presentOuter]}>
            <View style={[styles.ringInner,styles.presentInner]}></View>
        </View>
    )
}
const AbsentStatus = () => {
    return(
        <View style={[styles.ringOuter,styles.absentOuter]}>
            <View style={[styles.ringInner,styles.absentInner]}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    ringOuter: {
        width:WIDTH*0.11,
        height:WIDTH*0.11,
        borderWidth:6,
        zIndex:100,
        borderColor:'#100C1F',
        position:'absolute',
        borderRadius:100,
        right:-10, top:-3,
        justifyContent:'center',
    },
    ringInner: {
        width:'70%',
        height:'70%',
        borderRadius:100,
        alignSelf:'center',
        borderWidth:8,
    },
    defaultOuter: {
        backgroundColor:'#ECECEC'
    },
    defaultInner: {
        backgroundColor:'#FFF',
        borderColor:'#F2F2F2'
    },
    presentOuter: {
        backgroundColor:'#B8E0AA'
    },
    presentInner: {
        backgroundColor:'#65D53D',
        borderColor:'#91DA78'
    },
    absentOuter: {
        backgroundColor:'#A33033'
    },
    absentInner: {
        backgroundColor:'#FF0000',
        borderColor:'#900E0E'
    },
})

export {DefaultStatus, PresentStatus, AbsentStatus};