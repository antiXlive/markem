import React, { useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    Animated
} from 'react-native';


import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const AnimatedBar = ({length, height, strokeWidth, fs, color1, color2, percentage}) => {

    const AnimatedBarRef = useRef();
    const AnimatedInputRef = useRef();
    const animatedValue = useRef(new Animated.Value(0)).current;


    const animation = (value) => {
        return Animated.timing(animatedValue, {
            toValue:value,
            duration:500,
            // delay:1000,
            useNativeDriver:false
        }).start();
        // }).start(() => {
        //          animation(value === 0 ? percentage : 0)
        //      });
    }
    useEffect(() => {
        animation(percentage);
        animatedValue.addListener((v) => {
            let width = WIDTH*((v.value/100)*length*0.7);
            AnimatedBarRef.current.setNativeProps({
                width:width
            })
            AnimatedInputRef.current.setNativeProps({
                text:`${Math.round(v.value)}%`,
            })
        })
        return () => {
            animatedValue.removeAllListeners();
        }
    })
    return(
        <View style={{width:(WIDTH*length),height:height,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{borderRadius:20,width:(WIDTH*(length*0.7)),height:3,backgroundColor:color1}}>
                <Animated.View ref={AnimatedBarRef} style={{borderRadius:20,width:0,height:'100%',backgroundColor:color2,position:'absolute'}}></Animated.View>
            </View>
            <View style={{width:(WIDTH*(length*0.3)),alignItems:'center',justifyContent:'center'}}>
                <TextInput 
                    ref={AnimatedInputRef} 
                    editable={false} 
                    defaultValue={0+'%'}
                    style={{fontSize:fs,color:color2}}
                >
                </TextInput>
            </View>
        </View>
    )
}

export default AnimatedBar;