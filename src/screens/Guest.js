import React, { useRef, useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	StatusBar,
	StyleSheet,
	ActivityIndicator,
	KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { signin, setUserToken, setUserType,setUserDesignation, setUserName } from '@actions/authAction.js';
import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';
import NotifierBar from '@components/NotifierBar.component';

import { CustomButtonFilled } from '@components/CustomButton.component';
import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const Guest = ({navigation}) => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [notification, setNotification] = useState(null);
    const [fullName, setFullName] = useState('');
    const [designation, setDesignation] = useState('');
	const [validation, setValidation] = useState([ {valid:null, text:null}, {valid:null, text:null} ])
	const designationRef = useRef();

	// useEffect(() => {
	// 	loading
	// 	?Markem_NavBarColor.setBackgroundColor('#D1D1D1', true)
	// 	:Markem_NavBarColor.setBackgroundColor('#FFFFFF', true)
	// });

	const verifyInputs = (field, value) => {
		let validation1 = [...validation];
		switch(field){
			case "fullName":
				setFullName(value);
				if(value.length < 3){
					validation1[0] = {valid:0, text:"Full Name can't be less than 3 characters"};
					setValidation(validation1);
				}
				else{
					validation1[0] = 1;
					setValidation(validation1);
				}
			break;
			case "designation":
				setDesignation(value);
				if(value.length < 9){
					validation1[1] = {valid:0, text:"Designation can't be less than 10 characters"};
					setValidation(validation1);
				}
				else{
					validation1[1] = 1;
					setValidation(validation1);
				}
			break;
		}
	}
	const verifyFullName = () => {
		let validation1 = [...validation];
		if(fullName.length < 3){
			validation1[0] = {valid:0, text:"Full Name is required"};
			setValidation(validation1);
		}
		else{
			validation1[0] = 1;
			setValidation(validation1);
			designationRef.current.focus();
		}
	}
	const verifyDesignation = () => {
		let validation1 = [...validation];
		if(designation.length < 9){
			validation1[1] = {valid:0, text:"Designation is required"};
			setValidation(validation1);
		}
		else{
			validation1[1] = 1;
			setValidation(validation1);
		}
	}
	const registerGuest = async() => {
		let validation1 = [...validation];
		if(validation[0] != 1 || validation[1] != 1){
			if(fullName.length === 0){
				validation1[0] = {valid:0, text:"Full Name is required"};
			}
			if(designation.length === 0){
				validation1[1] = {valid:0, text:"Designation is required"};
			}
			setValidation(validation1);
		}
		else{
			setLoading(true);
			let expiryDate = new Date(new Date().getTime() + ((30*24*60*60)*1000));
			let token = '0000_markem_guest_user_0000';
            let userData = {
				USER_TYPE:'guest',
				USER_TOKEN:token,
                USER_NAME:fullName,
				USER_DESIGNATION:designation,
				AUTH_EXPIRE:expiryDate
            }
            let appData = {
                INSTALL_DATE:new Date()
			}
            try{
                await AsyncStorage.setItem('MARKEM_USER_DATA', JSON.stringify(userData));
				// await AsyncStorage.setItem('MARKEM_APP_DATA', JSON.stringify(appData));
				dispatch(setUserToken(token));
				dispatch(signin(0));
				dispatch(setUserName(fullName));
				dispatch(setUserType('guest'));
				dispatch(setUserDesignation(designation));
            }
            catch(err){
                console.log(err);
            }
            setLoading(false);
		}
	}
	const handleAction = (action) => {
        switch(action){
            case 'signup':
                navigation.navigate('signup')
                break;
            case 'signin':
                navigation.navigate('signin')
                break;
            case 'guest':
                registerGuest();
                break;
            default:
                break;
    
        }
	}


	return (
		<>
			{
				loading
				?(
					<View style={{position: 'absolute',top: 0,bottom: 0,alignItems: 'center',justifyContent: 'center', height:HEIGHT, width:WIDTH, backgroundColor:'#00000030', zIndex:100}}>
						<ActivityIndicator size="large"  color={constants.BLUE3} style={{position:'absolute', left:0, right:0, bottom:0, top:0 }}/>  
					</View>
					
				)
				:null
			}
			{
				notification
				?(
					<NotifierBar msg1={notification.msg1} type={notification.type} endsIn={notification.endsIn}/>
				)
				:null
			}	

	        <StatusBar backgroundColor={loading?'#38BCAF':'#54dbd5'} animated={true}/>
			<View style={{height: HEIGHT,backgroundColor:'white'}}>
				<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-30}>
				<View style={styles.curvedBox}>
					<Text style={{ fontWeight: '500', color: 'white', textAlign: 'center', width: constants.WIDTH, fontSize: 20, transform: [{ rotate: '-4deg' }] }}>Guest</Text>
					<Text style={{ fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 50, bottom: 70, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Enter Your</Text>
					<Text style={{ fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 53, bottom: 35, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Details</Text>
				</View>

                <View style={{height:HEIGHT*0.4,marginTop:HEIGHT*0.03}}>
					<View style={{position:'relative'}}>
						<Text 
							style={[styles.label, validation[0].valid === 0?styles.errorLabel:null]}
						>
							Full Name
						</Text>
						<View style={[styles.textInput, validation[0].valid === 0?styles.errorInput:null,validation[0] === 1?styles.successInput:null,{flexDirection:'row'}]} >
                            <AntDesign name="user" size={18} style={{alignSelf:'center', width:'8%'}}/>
							<TextInput
								autoCorrect={false}
								style={{width:'84%'}}
								placeholder='Andrew Ng'
								onSubmitEditing={() => verifyFullName()} 
								onChangeText={(text) => verifyInputs("fullName", text)} 
							/>
						</View>
						{
							validation[0].valid === 0
							?
							(
								<Text style={{color:'red', fontSize:11, position:'absolute', right:'10%', bottom:'10%', opacity:0.7}}>{validation[0].text}</Text>
							)
							:
							null
						}
					</View>

					<View style={{position:'relative'}}>
						<Text 
							style={[styles.label, validation[1].valid === 0?styles.errorLabel:null]}
						>
							Designation
						</Text>
						<View style={[styles.textInput, validation[1].valid === 0?styles.errorInput:null,validation[1] === 1?styles.successInput:null,{flexDirection:'row'}]}>
							<MaterialCommunityIcons name="smart-card-outline" size={20} style={{alignSelf:'center', width:'10%'}}/>
							<TextInput 
								style={{width:'90%'}}
								autoCorrect={false}
								placeholder='Professor'
								ref={designationRef}
								onChangeText={(text) => verifyInputs("designation", text)} 
								onSubmitEditing={() => verifyDesignation()}
							/>
						</View>
						{
							validation[1].valid === 0
							?
							(
							    <Text style={{color:'red', fontSize:11, position:'absolute', right:'10%', bottom:'10%', opacity:0.7}}>{validation[1].text}</Text>
							)
							:
							null
						}
					</View>
                </View>
				</KeyboardAvoidingView>
				<View style={{height:HEIGHT*0.15,width:WIDTH,justifyContent:'space-between',position:'absolute',bottom:'4%'}}>
                    <View style={{height:HEIGHT*0.03,flexDirection:'row',justifyContent:'center'}}>
                        <Text style={{color:'#54dbd5',fontSize:WIDTH*0.04}} onPress={() => handleAction('signup')}>Sign Up</Text>
                        <Text style={{marginHorizontal:WIDTH*0.03,opacity:0.5}}>|</Text>
                        <Text style={{color:'#54dbd5',fontSize:WIDTH*0.04}} onPress={() => handleAction('signin')}>Sign In</Text>
                    </View>
					<CustomButtonFilled label="CONTINUE" click={() => handleAction('guest')} style={{width:WIDTH*0.7,}}/>
				</View>
			</View>
		</>

	)
}

const styles = StyleSheet.create({
	curvedBox: {
		width: WIDTH + 20,
		height: HEIGHT * 0.33,
		backgroundColor:'#54dbd5',
		paddingTop: 25,
		position: 'relative',
		right: 10,
		top: -15,
		borderBottomLeftRadius: 80,
		borderBottomRightRadius: 55,
		transform: [{ rotate: '4deg' }],
		marginBottom: HEIGHT*0.02
	},
	textInput: {
		backgroundColor: '#00000010',
		borderRadius: 10,
		width: WIDTH * 0.85,
		marginBottom: 30,
		alignSelf: 'center',
		paddingLeft: 10
	},
	textInput2: {
		height: 200
	},
	label: {
		alignSelf: 'center',
		paddingBottom: 5,
		width: WIDTH * 0.85,
		fontSize: 16,
		opacity:0.5,
		color:'black'
	},
	errorLabel: {
		// color:'#FF0000',
		// opacity:1,
	},
	errorInput: {
		borderColor:'#ff0000',
		borderBottomWidth:2
		// borderWidth:1
	},
	successInput: {
		borderColor:'#71E753',
		borderBottomWidth:2,
		// borderWidth:1
	}
});

export default Guest;