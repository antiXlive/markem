import React, { useEffect } from 'react';
import {
    View,
    StatusBar,
    StyleSheet
} from 'react-native';

import { Markem_FullScreen, Markem_NavBarColor } from '@helpers/Markem_NativeModules';


// import logo from '../../assets/iiitm-logo.png';



const Splash = () => {
    // useEffect(() => {
    //     Markem_NavBarColor.setBackgroundColor('#3DCCBE',false)
    // })
    return(
        <>
        <StatusBar backgroundColor="#3DCCBE" barStyle="light-content"/>
        <View style={{backgroundColor:'#3DCCBE',flex:1}}>

        </View>
        </>
    )
}

export default Splash;