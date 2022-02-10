import React, { useEffect, useState } from 'react';
import {
    View,Text,Image,StyleSheet
} from 'react-native';

import homeAvatar from '@assets/home-avatar.png'

import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const GreetCard = ({userName}) => {

    useEffect(() => {
        let secTimer = setInterval( () => {
            setTime(new Date().toLocaleString())
        },1000)

        return () => clearInterval(secTimer);
    },[]);

    const [time, setTime] = useState();


    const time1 = new Date().toLocaleString();
    const splittedDate = time1.split(" ");
    const tabs = ['B.Tech', 'M.Tech', 'PHD'];
    const showTime = () => {
        if(time){
            let z = new Date(time);
            let hours = z.getHours();
            let minutes = z.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            let strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
       
    }

    return(
        <View style={styles.card}>
            <View style={{width:'65%'}}>
                <View style={{height:'75%'}}>
                    <Text style={styles.greetBox_Text1}>Hi</Text>
                    <Text style={styles.greetBox_Text2}>{userName}</Text>
                </View>
                <View style={{height:'25%',flexDirection:'row',alignItems:'center',paddingLeft:'5%', paddingBottom:'5%'}}>
                    <View style={{width:6,height:6,backgroundColor:'#3DCCBE',borderRadius:20, marginRight:WIDTH*0.02}}></View>
                    <Text style={{fontSize:12, fontWeight:'700',opacity:0.5}}>{splittedDate[0].toUpperCase()}, {splittedDate[3]} {splittedDate[1].toUpperCase()}  {showTime()}</Text>
                </View>
            </View>
            <View style={{width:'35%'}}>
                <Image style={styles.greetBox_Image} resizeMode="stretch" source={homeAvatar}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width:WIDTH*0.9,
        height:HEIGHT*0.12,
        alignSelf:"center",
        borderRadius:8,
        backgroundColor:'#E3E1E150',
        marginTop:HEIGHT*0.1,
        marginBottom:HEIGHT*0.02,
        flexDirection:'row',
    },
    greetBox_Text1: {
        fontWeight:'500',
        position:'absolute',
        bottom:15, 
        left:12,
        fontSize:WIDTH*0.07,
        opacity:0.5
    },
    greetBox_Image: {
        width:90,
        height:120,
        borderWidth:3,
        position:'absolute',
        bottom:0,
        right:1
    },
    greetBox_Text2: {
        fontWeight:'600',
        position:'absolute',
        bottom:12,
        left:35,
        fontSize:WIDTH*0.11,
        color:'#3DCCBE',
        paddingLeft:10
    },
});

export default GreetCard;