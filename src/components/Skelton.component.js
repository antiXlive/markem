import React, { useEffect, useRef, useState } from 'react';
import{
    View,
    Animated,
    StyleSheet
} from 'react-native';

import constants from '@helpers/constants';

const HEIGHT = constants.HEIGHT;

const Skelton = (props) => {

    const AnimatedViewRef = useRef();
    // const animatedValue = useRef(new Animated.Value(0.1)).current;
    const animatedValue = useRef(new Animated.Value(3)).current;

    
    const skeltonAnimation = (value) => {
        return Animated.timing(animatedValue, {
            toValue:value,
            duration:1000,
            delay:200,
            useNativeDriver:true
        }).start(() => {
            // skeltonAnimation(value === 0.1 ? 1 : 0.1)
            skeltonAnimation(value === 3 ? 20 : 3)
        });
    }
    useEffect(() => {
        // skeltonAnimation(1);
        skeltonAnimation(20);
        animatedValue.addListener((v) => {
            let opacity = v.value;
            opacity = Math.round(opacity);
            let backgroundColor = "#000000"+opacity;
            AnimatedViewRef.current.setNativeProps({
                backgroundColor
            })
        })
        
        return () => {
            animatedValue.removeAllListeners();
        }
    });

    return(
        <Animated.View 
            ref={AnimatedViewRef}
            style={[styles.skelton, props.style]}
        >
        </Animated.View>
    )
}

const styles = new StyleSheet.create({
    skelton: {
        alignSelf:'center',
        // backgroundColor:'#00000010',
        marginBottom:HEIGHT*0.04
    }
})

export default Skelton;