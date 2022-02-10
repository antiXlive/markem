import React, { version } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import constants from '@helpers/constants';
import Verified from '@assets/verified.png'


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const VerifiedCard = (props) => {
    return(
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Image source={Verified} style={{width:WIDTH*0.43, height:HEIGHT*0.22}}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={{fontSize:20, letterSpacing:3}}>VERIFIED</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => (props.click())}>
                <Text style={{fontSize:20, color:'white', letterSpacing:3, fontWeight:"bold"}}>CONTINUE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width:WIDTH*0.8,
        height:HEIGHT*0.4,
        backgroundColor:'white',
        borderRadius:25
    },
    iconContainer:{
        height:"60%",
        alignItems:'center',
        paddingTop:10
    },
    textContainer:{
        height:'23%',
        alignItems:'center'
    },
    button:{
        width:'100%',
        height:'17%',
        backgroundColor:'#3DCCBE',
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default VerifiedCard;