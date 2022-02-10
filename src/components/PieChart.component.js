import React, { useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    Animated
} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PieChart = ({radius, strokeWidth, fs, color1, color2, percentage}) => {

    const AnimatedCircleRef = useRef();
    const AnimatedInputRef = useRef();
    const animatedValue = useRef(new Animated.Value(0)).current;

    const animation = (value) => {
        return Animated.timing(animatedValue, {
            toValue:value,
            duration:1000,
            // delay:500,
            useNativeDriver:true
        }).start();
        // }).start(() => {
        //     animation(value === 0 ? percentage : 0)
        // });
    }
    useEffect(() => {
        animation(percentage);
        animatedValue.addListener((v) => {
            const mp = (100 * v.value) / 100;
            const strokeDashoffset = ((2* Math.PI * radius) - ((2* Math.PI * radius) * mp) / 100)
            AnimatedCircleRef.current.setNativeProps({
                strokeDashoffset
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
        <View style={{width:radius*2.3, alignItems:'center', justifyContent:'center'}}>
            <Svg width={radius*2} height={radius*2} viewBox={`0 0 ${(radius + strokeWidth )*2} ${(radius + strokeWidth )*2}`}>
            <G rotation='-90' origin={`${(radius + strokeWidth)}, ${(radius + strokeWidth)}`}>
                <Circle 
                    cx='50%'
                    cy='50%'
                    stroke={color1}
                    strokeWidth={strokeWidth}
                    r={radius}
                    strokeOpacity={0.5}
                />
                 <AnimatedCircle
                    ref={AnimatedCircleRef}
                    cx='50%'
                    cy='50%'
                    stroke={color2}
                    strokeWidth={strokeWidth}
                    r={radius}
                    strokeDasharray={2* Math.PI * radius}
                    strokeDashoffset={(2* Math.PI * radius*0.7)}
                    strokeLinecap="round"
                />            
            </G>
            </Svg>
            <TextInput 
                ref={AnimatedInputRef} 
                editable={false} 
                defaultValue='0%' 
                style={{position:'absolute',fontSize:fs,color:color2, fontWeight:'bold'}}
            >
            </TextInput>
        </View>
    )
}

export default PieChart;