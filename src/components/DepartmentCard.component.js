import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const DepartmentCard = ({styles, ID, index, departmentName, classes, click, ContextMenu }) => {


    const handlePress = () => {
        click();
    };
    const handleLongPress = () => {
        ContextMenu(true, ID, index);
    };

    return(
        <View style={[{width:WIDTH*0.5,alignItems:'center',height:HEIGHT*0.27,marginBottom:HEIGHT*0.1},styles]}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={{width:WIDTH*0.38,height:HEIGHT*0.26,backgroundColor:'#54dbd5',elevation:6,borderRadius:8,marginBottom:HEIGHT*0.1,overflow:'hidden'}}
                onPress={handlePress}
                onLongPress = {handleLongPress}
            >
            <View style={{height:'15%',flexDirection:"row",justifyContent:'space-between',paddingHorizontal:'5%',paddingTop:'10%',paddingLeft:'10%'}}>
                <View 
                    style={{width:WIDTH*0.2,height:WIDTH*0.22,position:'absolute',borderRadius:1000,backgroundColor:'#00000007',top:'-45%',left:'-19%',transform:[{rotate:'45deg'}]}}
                >
                </View>
                {/* <FontAwesome5 name="graduation-cap" size={17} color="#FFF"/> */}
            </View>
            <View style={{height:'40%',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:WIDTH*0.07,fontWeight:'bold',letterSpacing:3,color:'#fff'}}>{departmentName}</Text>
            </View>
            <View style={{height:'40%',justifyContent:'space-evenly',paddingLeft:'8%'}}>
                <Text style={{fontSize:WIDTH*0.031,letterSpacing:1,color:'#fff'}}><Text style={{fontWeight:'bold'}}>{classes}</Text> CLASSES</Text>
                <Text style={{fontSize:WIDTH*0.031,letterSpacing:1,color:'#fff'}}><Text style={{fontWeight:'bold'}}>{classes}</Text> STUDENTS</Text>
                <Text style={{fontSize:WIDTH*0.031,letterSpacing:1,fontWeight:'bold',color:'#fff'}}>2018-2022</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default DepartmentCard;