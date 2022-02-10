import React from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
} from 'react-native'

import constants from '@helpers/constants';
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const OnboardingSlider = (props) => {
    const index = props.index;
    const scrollX = props.scrollX;
    const scale = scrollX.interpolate({
        inputRange:[(index-1)*WIDTH, index*WIDTH, (index+1)*WIDTH],
        outputRange:[0,1,0],
    })
    return(
        <Animated.View style={{width:WIDTH,alignItems:'center',height:HEIGHT*0.82, transform:[{ scale }]}}>
            <View style={{width:'100%', height:'60%'}}>
                <Image style={{width:'98%', height:'90%', alignSelf:'center', resizeMode:'contain', marginTop:'2%'}} source={props.img} />
            </View>
            <View style={{width:'100%', height:'40%'}}>
                <Text style={{paddingLeft:WIDTH*0.08, fontSize:WIDTH*0.08, letterSpacing:3, fontWeight:"700",color:'white'}}>{props.text1}</Text>
                {/* <Text style={{paddingLeft:WIDTH*0.08, fontSize:WIDTH*0.06, letterSpacing:WIDTH*0.006, fontWeight:"600",color:'white', opacity:0.7, marginTop:HEIGHT*0.02}}>ATTENDANCE MANAGER</Text> */}
                <Text style={{paddingLeft:WIDTH*0.08, fontSize:WIDTH*0.045, fontWeight:"400",color:'white', opacity:0.9, marginTop:HEIGHT*0.04, width:'88%',lineHeight:25}}>
                   {props.text2}
                </Text>
            </View>
        </Animated.View>
    )
}

export default OnboardingSlider;