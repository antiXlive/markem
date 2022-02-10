import React, { useState, useMemo, useRef } from 'react';
import {
    View,
    Animated,
    Alert,
    PanResponder,
    StyleSheet,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const SwipeableBar = (props) => {
    const position = useRef(new Animated.Value(0)).current;
    const [swipe, setSwipe] = useState("");

    const panResponder = useMemo(() =>
        PanResponder.create({
            onStartShouldSetPanResponder:() => true,
            onPanResponderMove:(e, gestureState) => {
                gestureState.dx < 0 ? setSwipe("left") : setSwipe("right")
                position.setValue(gestureState.dx);
            },
            onPanResponderRelease: (evt, gestureState) => {
                Animated.spring(position,{
                    toValue:0,
                    useNativeDriver:true
                }).start();
                handleSwipeAction(gestureState.dx)
            },
        }),[]
    ) 

    const handleSwipeAction = (position) => {
        if(position<0){
            if(-(WIDTH*0.25)>position){
                Alert.alert(
                    'Delete',
                    'Are you sure want to delete this item?',
                    [
                        {
                            text:'Cancel',
                            onPress:() => {},
                            style:'cancel'
                        },
                        {
                            text:'Delete',
                            onPress:() => props.delete(props.index),
                        }
                    ]
                )
            }
        }
        else{
            if(position > WIDTH*0.25){
                props.edit(props.index);
            }
        }        
    }

    return (
        <View style={[props.parentStyle]}>
            {
                swipe === "left"
                ?(
                    <View style={[styles.common, styles.delete, props.style]}>
                        <MaterialCommunityIcons name="delete-outline" color='#FFF' size={30} />
                    </View>
                )
                :(
                    <View style={[styles.common, styles.edit, props.style]}>
                        <MaterialIcons name="edit" color='#FFF' size={30} />
                    </View>
                )
            }
            <Animated.View
                {...panResponder.panHandlers}
                style={[{transform: [{translateX: position}]}]}
            >
                {props.children}
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    common:{
        position:'absolute',
        height:'100%',
        width:'90%',
        justifyContent:'center',
        paddingHorizontal:'7%',
    },
    edit: {
        borderRadius:7,
        backgroundColor:'#FACB21',
    },
    delete: {
        borderRadius:7,
        backgroundColor:'#F36262',
        alignItems:'flex-end',
        alignSelf:'flex-end'
    },

})

export default SwipeableBar;