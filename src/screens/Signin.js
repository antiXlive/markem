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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useSelector, useDispatch } from 'react-redux';
import { signin, setUserToken, setUserType, setUserName,setUserEmail } from '@actions/authAction.js';
import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';
import NotifierBar from '@components/NotifierBar.component';

import { CustomButtonFilled } from '@components/CustomButton.component';
import constants from '@helpers/constants.js';
import { NetworkUtils } from '@helpers/functions.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const Signin = ({navigation}) => {
	const passwordRef = useRef();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	// const [response, setResponse] = useState({status:0, msg:""});
	// const [error, setError] = useState({status:0, msg:""});
	const [notification, setNotification] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [eye, setEye] = useState(true);
	const [validation, setValidation] = useState([ {valid:null, text:null}, {valid:null, text:null} ])

	// useEffect(() => {
	// 	loading
	// 	?Markem_NavBarColor.setBackgroundColor('#D1D1D1', true)
	// 	:Markem_NavBarColor.setBackgroundColor('#FFFFFF', true)
	// });

	const verifyInputs = (field, value) => {
		let validation1 = [...validation];
		switch(field){
			case "email":
				setEmail(value);
				const normalEmailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(normalEmailValidator.test(String(value).toLowerCase())){
					validation1[0] = 1;
					setValidation(validation1);
				}
				else{
					validation1[0] = {valid:0, text:"Not a valid Email"};
					setValidation(validation1);
				}
			break;
			case "password":
				setPassword(value);
				if(value.length<5){
					validation1[1] = {valid:0, text:"Password can't be less than 5 characters"};
					setValidation(validation1);
				}
				else{
					validation1[1] = 1;
					setValidation(validation1);
				}
			break;
		}
	}
	const verifyEmail = () => {
		let validation1 = [...validation];
		if(email.length === 0){
			validation1[0] = {valid:0, text:"Email Address is required"};
			setValidation(validation1);
		}
		else if(validation[0] === 1){
			passwordRef.current.focus()
		}
	}
	const saveUserToken = async(userName,userEmail,userType,token,expiryDate) => {
		let userData = {
			USER_TYPE: userType,
			USER_TOKEN:token,
			USER_NAME:userName,
			USER_EMAIL:userEmail,
			// userDesignation:designation,
			AUTH_EXPIRE: expiryDate
		}
		try{
			await AsyncStorage.setItem('MARKEM_USER_DATA', JSON.stringify(userData));
		}
		catch(err){
			console.log(err);
		}
		// getUserToken();
	}
	// const getUserToken = async() => {
	// 	try{
	// 		const userToken = await AsyncStorage.getItem("MARKEM_USER_DATA")
	// 		console.log("TOKEN ",userToken);
	// 	}
	// 	catch(err){
	// 		console.log(err);
	// 	}
	// }
	const verifyPassword = () => {
		let validation1 = [...validation];
		if(password.length < 5){
			validation1[1] = {valid:0, text:"Password can't be less than 5 characters"};
			setValidation(validation1);
		}
		else{
			validation1[1] = 1;
			setValidation(validation1);
		}
	}
	
	const handleLogin = async() => {
		const status =  await NetworkUtils.isNetworkAvailable();
		let validation1 = [...validation];
		if(validation[0] != 1 || validation[1] != 1){
			if(email.length === 0){
				validation1[0] = {valid:0, text:"Email Address is required"};
			}
			if(password.length === 0){
				validation1[1] = {valid:0, text:"Password is required"};
			}
			setValidation(validation1);
		}
		else{
			setLoading(true);
			if(status){
				axios.get("http://192.168.43.96:3000/ping",)
				.then((res) => {
					const data = {
						"email":email,
						"password":password
					}
					axios.post("http://192.168.43.96:3000/auth/signin", data, {
						headers:{
							'api_key':"hkjhalf-afkjahjf_ndkjah6579ad"
						},
					})
					.then((res) => {
						let expiryDate = new Date(new Date().getTime() + ((res.data.expiresIn)*1000));
						let user = res.data;
						saveUserToken(user.userName,user.userEmail,user.userType,user.token, expiryDate);
						dispatch(setUserToken(user.token));
						dispatch(setUserName(user.userName));
						dispatch(setUserEmail(user.userEmail));
						dispatch(setUserType(user.userType));
						dispatch(signin(0));
					})
					.catch((err) => {
						console.log(err.response.data);
						setNotification({
							msg1:err.response.data.error,
							type:"error",
							endsIn:3000
						})
						setTimeout(() => {
							setNotification(null);
						}, 3500)
					})
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					setNotification({
						msg1:"Server Unreachable",
						type:"error",
						endsIn:3000
					})
					setTimeout(() => {
						setNotification(null);
					}, 3500)
				})
			}
			else{
				setLoading(false);
				setNotification({
					msg1:"No Internet Connection",
					type:"error",
					endsIn:3000
				})
				setTimeout(() => {
					setNotification(null);
				}, 3500)
			}
		}
	}
	const resetHandler = () => {
		console.log('reset...........');
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
			<View style={{height:HEIGHT*0.99,backgroundColor:'white'}}>
				<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-55}>
				<View style={styles.curvedBox}>
					<Text style={{ fontWeight: '500', color: 'white', textAlign: 'center', width: constants.WIDTH, fontSize: 20, transform: [{ rotate: '-4deg' }] }}>Sign In</Text>
					<Text style={{ fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 50, bottom: 70, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Welcome</Text>
					<Text style={{ fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 53, bottom: 35, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Back</Text>
				</View>

                <View style={{height:HEIGHT*0.45,marginTop:HEIGHT*0.03}}>
					<View style={{position:'relative'}}>
						<Text 
							style={[styles.label, validation[0].valid === 0?styles.errorLabel:null]}
						>
							Email Addresss
						</Text>
						<View style={[styles.textInput, validation[0].valid === 0?styles.errorInput:null,validation[0] === 1?styles.successInput:null,{flexDirection:'row'}]} >
							<MaterialCommunityIcons name="email-outline" size={20} style={{alignSelf:'center', width:'8%'}}/>
							<TextInput
								autoCorrect={false}
								style={{width:'84%'}}
								// keyboardType="email-address" 
								placeholder='andrew@ng.com'
								placeholderTextColor='#00000040'
								onSubmitEditing={() => verifyEmail()} 
								onChangeText={(text) => verifyInputs("email", text)} 
							/>
							{/* {
									validation[0] === 1
									?
									(
										<MaterialCommunityIcons name="checkbox-marked-circle-outline" size={18} style={{color:'#53AF50',width:'8%', alignSelf:'center'}}/>
									)
									:
									null
								} */}
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
							Password
						</Text>
						<View style={[styles.textInput, validation[1].valid === 0?styles.errorInput:null,validation[1] === 1?styles.successInput:null,{flexDirection:'row'}]}>
							<Octicons name="lock" size={18} style={{alignSelf:'center', width:'8%'}}/>
							<TextInput 
								style={{width:'82%'}}
								secureTextEntry={eye}
								autoCorrect={false}
								placeholder='******'
								placeholderTextColor='#00000040'
								ref={passwordRef}
								onChangeText={(text) => verifyInputs("password", text)} 
								onSubmitEditing={() => verifyPassword()}
							/>
							<TouchableOpacity style={{alignSelf:'center',height:HEIGHT*0.07,width:WIDTH*0.08,justifyContent:'center'}} onPress={() => setEye(!eye)}>
								<MaterialCommunityIcons name={eye?"eye-outline":"eye-off-outline"} size={20} style={{color:'#000'}}/>
							</TouchableOpacity>
							{/* {
									validation[1] === 1
									?
									(
										<MaterialCommunityIcons name="checkbox-marked-circle-outline" size={18} style={{color:'#53AF50',width:'8%', alignSelf:'center'}}/>

									)
									:
									null
								} */}
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
					<Text style={{color:'#FF0000',letterSpacing:0.5,width: WIDTH * 0.82,alignSelf:'center',marginTop:'-3%'}} onPress={resetHandler}>Forgot Password ?</Text>
                </View>
				</KeyboardAvoidingView>
				<View style={{height:HEIGHT*0.15,position:'absolute',width:WIDTH,bottom:'4%',justifyContent:'space-between'}}>
					<Text style={{alignSelf:'center',textAlign:'center',fontSize:15}}>No Account Yet?  <Text style={{ color: constants.BLUE2 }} onPress={() => {navigation.navigate('signup')}}>Sign Up</Text></Text>
					<CustomButtonFilled label="SIGN IN" click={handleLogin} style={{width:WIDTH*0.7}}/>
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

export default Signin;