import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import constants from '@helpers/constants'
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Entry = ({navigation}) => {
    const handlePress = (label) => {
        navigation.navigate(label,{headerLabel:'REPORTS'});
    }

    return(
        <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#000',justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity onPress={() => handlePress('attendance_sheet')} activeOpacity={1} style={{borderBottomLeftRadius:18,borderBottomRightRadius:18,width:'100%',height:'49.5%',backgroundColor:'#FFF',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:'200',color:'#000',fontSize:WIDTH*0.09,letterSpacing:1}}>Attendance Sheet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('reports')} activeOpacity={1} style={{borderTopLeftRadius:18,borderTopRightRadius:18,width:'100%',height:'49.5%',backgroundColor:'#FFF',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:'200',color:'#000',fontSize:WIDTH*0.09,letterSpacing:1}}>Students Report</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Entry;