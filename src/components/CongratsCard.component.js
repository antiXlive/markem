import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import constants from '@helpers/constants';
import Congrats from '@assets/congrats.jpg';


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const CongratsCard = (props) => {
    return(
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Image source={Congrats} style={{width:WIDTH, height:HEIGHT*0.19, resizeMode:"contain"}}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={{fontSize:17, letterSpacing:2}}>Congrats</Text>
                <Text style={{fontSize:12, opacity:0.7, paddingTop:10}}>You will have access to SECRET IIITM DATABASE</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => props.click()}>
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
        height:"55%",
        alignItems:'center',
        paddingTop:25,
        overflow:'hidden',
        marginBottom:'5.1%'
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

export default CongratsCard;