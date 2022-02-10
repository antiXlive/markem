import React, { useRef, useEffect } from 'react';
import {
    Text,
    Animated,
    StyleSheet
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;

const NotifierBar = ({msg1, type, endsIn, msg2}) => {
    const bottom = useRef(new Animated.Value(-50)).current;
    const upAnimation = () => {
        return Animated.spring(bottom, {
            toValue:7,
            duration:500,
            useNativeDriver:false
        }).start();
    }
    const downAnimation = () => {
        return Animated.spring(bottom, {
            toValue:-50,
            duration:500,
            useNativeDriver:false
        }).start();
    }
    useEffect(() => {
        upAnimation();
        setTimeout(() => {
            downAnimation();
        },parseInt(endsIn));
    },[])

    const bgColor = type === 'error' ? '#F24636' : type === 'success' ? '#53AF50' : '#2196F3'; 

    return(
        <Animated.View 
            style={ [ styles.notifierBar, { backgroundColor:bgColor, bottom:bottom } ] }
        >
			<MaterialIcons name="error-outline" color="white" size={25} style={{width:'12%' }}/>
		    <Text style={{color:'white',fontSize:WIDTH*0.043}}>{msg1}</Text>
		    <Text style={{color:'white',fontSize:WIDTH*0.045}}>{msg2}</Text>
        </Animated.View>
    )
}

const styles = new StyleSheet.create({
    notifierBar: {
        width:WIDTH*0.8,
        alignSelf:'center',
        height:50,
        borderRadius:5,
        alignItems:'center',
        flexDirection:'row',
        position:'absolute',
        bottom:'1%',
        zIndex:1000,
        paddingLeft:10
    }
})

export default NotifierBar;