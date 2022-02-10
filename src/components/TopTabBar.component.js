import React, { useState, useMemo, useRef } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    StyleSheet,
    PanResponder
} from 'react-native';

import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const TopTabBar = ({tabs, click, top}) => {


    const [x, setX] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const translateActive = useRef(new Animated.Value(0)).current;

    const panResponder = useMemo(() => 
        PanResponder.create({
            onStartShouldSetPanResponder:() => true,
            onPanResponderMove:(e, gestureState) => {
            },
            onPanResponderRelease:(e, gestureState) => {
                if(gestureState.dx > 0){
                    if(activeTab != 0){
                        handleSlide(activeTab-1);
                    }
                }
                else if(gestureState.dx < 0){
                    if(activeTab != (tabs.length - 1)){
                        handleSlide(activeTab+1);
                    }
                }
            }
        }),[activeTab]
    )


    const handleSlide = (tab) => {
        let move = 0;
        if(tab === 0){
            setActiveTab(0);
            click(0);
            move = 0;
        }
        else if(tab == 1){
            setActiveTab(1);
            click(1);
            move = x;
        }
        else if(tab == 2){
            setActiveTab(2);
            click(2);
            move = x*2;
        }
        Animated.spring(translateActive, {
            toValue: move,
            duration: 500,
            useNativeDriver:false
        }).start();
    }


    return(
        <>
            <Animated.View {...panResponder.panHandlers} style={{zIndex:0,borderWidth:1,borderColor:'#fff',position:'absolute',width:WIDTH,height:HEIGHT*0.73,top:top}}></Animated.View>
            <View style={{width:WIDTH*0.9,height:HEIGHT*0.06,alignSelf:'center', backgroundColor:'transparent'}}>
                <View style={{height:'90%',flexDirection:'row'}}>
                    {
                        tabs.map((tabName, index) => (
                                <TouchableOpacity
                                    key={tabName}
                                    style={[styles.tab, {width:WIDTH*0.9/tabs.length}]}
                                    onPress={() => handleSlide(index)}
                                    onLayout={(e) => index === 0?setX(e.nativeEvent.layout.width):null}
                                >
                                    <Text 
                                        style={{color:activeTab === index?'#3DCCBE':'#000',fontSize:WIDTH*0.04,opacity:activeTab === index?1:0.6}}
                                    >
                                        {tabName}
                                    </Text>
                                </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={{borderRadius:100,width:WIDTH*0.9,alignSelf:'center',height:'7%',backgroundColor:'#00000010'}}>
                    <Animated.View style={{borderRadius:100,width:(WIDTH*0.9)/tabs.length,height:'100%',backgroundColor:'#3DCCBE', transform:[{translateX:translateActive}]}}>
                    </Animated.View>
                </View>
            </View>
        </>
    )
}
const DarkTopTabBar = ({tabs, click}) => {


    const [x, setX] = useState(0);
    const [activeTab, setActiveTab] = useState(1);
    const translateActive = useRef(new Animated.Value(WIDTH*0.51)).current;

    const panResponder = useMemo(() => 
        PanResponder.create({
            onStartShouldSetPanResponder:() => true,
            onPanResponderMove:(e, gestureState) => {
            },
            onPanResponderRelease:(e, gestureState) => {
                if(gestureState.dx > 0){
                    if(activeTab != 0){
                        handleSlide(activeTab-1);
                    }
                }
                else if(gestureState.dx < 0){
                    if(activeTab != (tabs.length - 1)){
                        handleSlide(activeTab+1);
                    }
                }
            }
        }),[activeTab]
    )


    const handleSlide = (tab) => {
        let move = 0;
        if(tab === 0){
            setActiveTab(0);
            click(0);
            move = 0;
        }
        else if(tab == 1){
            setActiveTab(1);
            click(1);
            move = x;
        }
        Animated.spring(translateActive, {
            toValue: move,
            duration: 300,
            useNativeDriver:false
        }).start();
    }


    return(
        <>
            <Animated.View {...panResponder.panHandlers} style={{zIndex:2,position:'absolute',borderWidth:0.1,width:WIDTH,height:HEIGHT*0.18,top:'25%'}}></Animated.View>
            <View style={{width:WIDTH,height:HEIGHT*0.05,alignSelf:'center', backgroundColor:'transparent'}}>
                <View style={{height:'90%',flexDirection:'row',width:'100%'}}>
                    {
                        tabs.map((tabName, index) => (
                                <TouchableOpacity
                                    key={tabName}
                                    style={[styles.tab, {width:WIDTH*0.5}]}
                                    onPress={() => handleSlide(index)}
                                    onLayout={(e) => index === 0?setX(e.nativeEvent.layout.width):null}
                                >
                                    <Text 
                                        style={{color:activeTab === index?'#3DCCBE':'#FFF',fontSize:WIDTH*0.04,opacity:activeTab === index?1:0.8}}
                                    >
                                        {tabName}
                                    </Text>
                                </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={{borderRadius:100,width:WIDTH,alignSelf:'center',height:'5%',backgroundColor:'#00000010'}}>
                    <Animated.View style={{borderRadius:100,width:WIDTH*0.5,height:'100%', transform:[{translateX:translateActive}]}}>
                        <View style={{borderWidth:1,borderColor:'#3DCCBE',width:'70%',alignSelf:'center'}}></View>
                    </Animated.View>
                </View>
            </View>
        </>
    )
}
const styles = new StyleSheet.create({
    tab: {
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
    },
})
export  { TopTabBar, DarkTopTabBar};