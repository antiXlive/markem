import React, {useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';



import constants from '@helpers/constants'
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const ManageDataSelector = ({navigation}) => {

    useEffect(() => {
        Markem_NavBarColor.setBackgroundColor('#FFFFFF',true)
    },[])

    const handlePress = (label) => {
        navigation.navigate('programmes',{headerLabel:'PROGRAMMES', data:label})
    }

    return(
        <>
        {/* <StatusBar backgroundColor='#FFF' barStyle='dark-content'/> */}
        <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#000',justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity onPress={() => handlePress('students')} activeOpacity={1} style={{borderBottomLeftRadius:18,borderBottomRightRadius:18,width:'100%',height:'49.5%',backgroundColor:'#FFF',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:'200',color:'#000',fontSize:WIDTH*0.09,letterSpacing:1}}>Manage Students</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('courses')} activeOpacity={1} style={{borderTopLeftRadius:18,borderTopRightRadius:18,width:'100%',height:'49.5%',backgroundColor:'#FFF',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:'200',color:'#000',fontSize:WIDTH*0.09,letterSpacing:1}}>Manage Classes</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}
export default ManageDataSelector;