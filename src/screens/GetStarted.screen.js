import React, {useEffect} from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    BackHandler,
} from 'react-native';
import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';
import { CustomButtonFilled } from '@components/CustomButton.component';
import GS from '@assets/GS.jpg';
// import homeAvatar from '@assets/home-avatar.png'


import constants from '@helpers/constants'
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const GetStarted = ({navigation}) => {
    // useEffect(() => {
	// 	navigation.addListener('beforeRemove', (e) => {
	// 		e.preventDefault();
	// 		BackHandler.exitApp();
	// 	})
    // },[navigation]);
    // useEffect(() => {
    //     Markem_NavBarColor.setBackgroundColor('#FFFFFF', true)
    // })

    const handleAction = (action) => {
        switch(action){
            case 'signup':
                navigation.navigate('signup')
                break;
            case 'signin':
                navigation.navigate('signin')
                break;
            case 'guest':
                navigation.navigate('guest');
                break;
            default:
                break;
        }
    }

    
    return(
        <>
        <StatusBar backgroundColor='#FFF' barStyle='dark-content'/>
        <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#FFF'}}>
            <View style={{width:'100%',height:'60%',overflow:'hidden'}}>
                <Image source={GS} resizeMode='stretch' style={{width:WIDTH*1.2,marginLeft:'-8%',height:HEIGHT*0.64}}/>
            </View>
            <View style={{width:'100%',height:'40%',paddingTop:'10%'}}>
                <CustomButtonFilled label="SIGN UP" click={() => handleAction('signup')} style={{width:WIDTH*0.7,marginBottom:HEIGHT*0.05}}/>
                <CustomButtonFilled label="SIGN IN" click={() => handleAction('signin')} style={{width:WIDTH*0.7,marginBottom:HEIGHT*0.05}}/>
                <CustomButtonFilled label="Continue as Guest" theme='light' click={() => handleAction('guest')} style={{width:WIDTH*0.7,marginBottom:HEIGHT*0.05,backgroundColor:'#F1F1F1',elevation:0}}/>
            </View>
        </View>
        </>
    )
}

export default GetStarted;