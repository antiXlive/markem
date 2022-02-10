import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ContextMenu from '@components/ContextMenu.component';




import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const BatchCard = ({ ID, index, styles, click, ContextMenu, programmeName, classes, departments, students, startYear, passoutYear, opacity }) => {


    const handlePress = () => {
        // if(contextMenu){
        //     handleContextMenu(false);
        // }
        // else{
            click();
        // }
    };


    const handleLongPress = () => {
        ContextMenu(true, ID, index);
    };

    return(
        <>
        <TouchableOpacity
            activeOpacity={0.5}
            style={[{width:WIDTH*0.85,height:HEIGHT*0.13,alignSelf:'center',backgroundColor:'#54dbd5',elevation:6,borderRadius:10,flexDirection:'row'},styles]}
            onPress={handlePress}
            onLongPress={handleLongPress}
        >

            <View style={{width:'60%',overflow:'hidden'}}>
                <View 
                    style={{width:WIDTH*0.4,height:WIDTH*0.3,position:'absolute',top:'-35%',left:'-22%',transform:[{rotate:'-40deg'}],borderRadius:1000,backgroundColor:'#00000005',}}
                >
                </View>
                <View style={{height:'30%',flexDirection:'row',paddingLeft:'5%',alignItems:'center',paddingTop:'5%'}}>
                    {/* <Text style={{fontSize:WIDTH*0.042,fontWeight:'bold',letterSpacing:1,paddingRight:'15%',color:'#FFF'}}>1st</Text> */}
                    <Text style={{fontSize:WIDTH*0.04,fontWeight:'600',letterSpacing:1,color:'#FFF',transform:[{rotate:'-30deg'},{translateX:-8}]}}>{programmeName}</Text>
                </View>
                <View style={{height:'65%',flexDirection:'row',paddingLeft:'5%',alignItems:'center',paddingRight:'8%'}}>
                    {/* <FontAwesome5 name="graduation-cap" size={17} color="#FFF"/> */}
                    <Text style={{fontSize:WIDTH*0.06,fontWeight:'bold',paddingLeft:'18%',color:'#FFF'}}>{startYear} - {passoutYear}</Text>
                </View>                
            </View>
            <View style={{width:'40%',justifyContent:'space-evenly',paddingLeft:'4%'}}>
                <Text style={{fontSize:WIDTH*0.031,letterSpacing:1,color:'#FFF'}}><Text style={{fontSize:WIDTH*0.038,fontWeight:'bold'}}>{departments}</Text> DEPARTMENTS</Text>
                <Text style={{fontSize:WIDTH*0.031,letterSpacing:1,color:'#FFF'}}><Text style={{fontSize:WIDTH*0.038,fontWeight:'bold'}}>{classes}</Text> CLASSES</Text>
                <Text style={{fontSize:WIDTH*0.031,letterSpacing:1,color:'#FFF'}}><Text style={{fontSize:WIDTH*0.038,fontWeight:'bold'}}>{students}</Text> STUDENTS</Text>
            </View>
        </TouchableOpacity>        
        </>
    )
}

export default BatchCard;