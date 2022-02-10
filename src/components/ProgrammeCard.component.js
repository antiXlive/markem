import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import PG from '@assets/PG9.png'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const ProgrammeCard = ({styles, index, id, programmeName, classes, click, ContextMenu, opacity, edit, deletePg }) => {


    // const handleLongPress = () => {
    //     if(ContextMenu){
    //         ContextMenu(true, index, id);
    //     }
    // };
    const handlePress = () => {
        click();
    }
    return(
        <>
        <View style={{width:WIDTH*0.9,height:HEIGHT*0.2,alignSelf:'center',marginBottom:HEIGHT*0.04,borderRadius:15,overflow:'hidden'}}>
            <TouchableNativeFeedback onPress={handlePress}>
                <View style={{backgroundColor:'#54dbd5',width:'100%', height:'100%',borderRadius:15}}>
                    <View style={{height:'100%',width:'100%',position:'absolute'}}>
                        <Image source={PG} alt="PG" style={{position:'absolute',height:'100%',width:'120%',right:'-30%',bottom:'-1%'}} resizeMode='stretch'/>
                    </View>
                    {/* <View style={{width:WIDTH*0.2,height:WIDTH*0.2,position:'absolute',borderRadius:100,backgroundColor:'#FFF',top:'-2%',left:'-9%'}}>
                        <View style={{backgroundColor:'#54dbd5', width:10,height:10, borderRadius:20, position:'absolute',right:'28%',bottom:'40%'}}></View>
                    </View> */}
                    <View style={{height:'70%',justifyContent:'flex-start',alignItems:'flex-start',paddingLeft:'6%',paddingTop:'10%'}}>
                        <Text style={{color:'#FFF',fontSize:WIDTH*0.085,fontWeight:'bold',letterSpacing:2}}>{programmeName}</Text>
                    </View>
                    <View style={{height:'25%',paddingLeft:'6%',justifyContent:'center'}}>
                        <Text style={{color:'#FFF',fontSize:WIDTH*0.035,letterSpacing:1}}><Text style={{fontWeight:'bold',fontSize:WIDTH*0.045}}>{classes?classes:0}</Text> CLASSES</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>

        </View>
        </>
    )
}

export default ProgrammeCard;