import React, { useRef, useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StatusBar,
	ActivityIndicator,
	StyleSheet,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Keyboard,
	BackHandler,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import NotifierBar from '@components/NotifierBar.component';

import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';
import Modal from '@components/Modal.component';
import CongratsCard from '@components/CongratsCard.component';
import {CustomButtonFilled} from '@components/CustomButton.component';
import constants from '@helpers/constants.js';
import { NetworkUtils } from '@helpers/functions.js';
import { setAuthEmail } from '@actions/authAction';


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;
const HEIGHTP = constants.HEIGHTP;


const Signup = ({navigation}) => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const dispatch = useDispatch();


	// const prevGetStateForAction = Navigation.router.getStateForAction;
	// Navigation.router.getStateForAction = (action, state) => {
	// 	// Do not allow to go back from Home
	// 	if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'signup') {
	// 	  return null;
	// 	}
	// };

	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState({status:0, msg:""});
	const [error, setError] = useState({status:0, msg:""});
	const [notification, setNotification] = useState(null);
	const [congrats, setCongrats] = useState(0);
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [eye, setEye] = useState(true);
	const [validation, setValidation] = useState([ {valid:null, text:null}, {valid:null, text:null}, {valid:null, text:null} ]);

	// useEffect(() => {
	// 	navigation.addListener('beforeRemove', (e) => {
	// 		e.preventDefault();
	// 		BackHandler.exitApp();
	// 	})
	// },[navigation]);
	// useEffect(() => {
	// 	loading
	// 	?Markem_NavBarColor.setBackgroundColor('#D1D1D1', true)
	// 	:Markem_NavBarColor.setBackgroundColor('#FFFFFF', true)
	// });


	const verifyInputs = (field, value) => {
		let validation1 = [...validation];
		switch(field) {
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

			case "email":
				setEmail(value);
				const normalEmailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(normalEmailValidator.test(String(value).toLowerCase())){
					validation1[1] = 1;
					setValidation(validation1);
					const iiitmEmailValidator = /@iiitmanipur.ac.in\s*$/
					if(iiitmEmailValidator.test(String(value).toLowerCase())){
						setCongrats(1);
						Keyboard.dismiss();
						setTimeout(() => {setCongrats(0)}, 6000);
					}
				}
				else{
					validation1[1] = {valid:0, text:"Not a valid Email"};
					setValidation(validation1);
				}
			break;

			case "password":
				setPassword(value);
				if(value.length<5){
					validation1[2] = {valid:0, text:"Password can't be less than 5 characters"};
					setValidation(validation1);
				}
				else{
					validation1[2] = 1;
					setValidation(validation1);
				}
			break;

			default:
				return;
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
			emailRef.current.focus();
		}
	}
	const verifyEmail = () => {
		let validation1 = [...validation];
		if(email.length === 0){
			validation1[1] = {valid:0, text:"Email Address is required"};
			setValidation(validation1);
		}
		else if(validation[1] === 1){
			passwordRef.current.focus();
		}
	}
	const verifyPassword = () => {
		let validation1 = [...validation];
		if(password.length < 5){
			validation1[2] = {valid:0, text:"Password can't be less than 5 characters"};
			setValidation(validation1);
		}
		else{
			validation1[2] = 1;
			setValidation(validation1);
		}
	}
	const handleSignup = async () => {
		const status =  await NetworkUtils.isNetworkAvailable();
		let validation1 = [...validation];
		if(validation[0] != 1 || validation[1] != 1 || validation[2] != 1){
			if(fullName.length < 3){
				validation1[0] = {valid:0, text:"Full Name is required"};
			}
			if(email.length === 0){
				validation1[1] = {valid:0, text:"Email is required"};
			}
			if(password.length < 5){
				validation1[2] = {valid:0, text:"Password is required"};
			}
			setValidation(validation1);
		}
		else{
			setLoading(true)
			if(status){
				axios.get("http://192.168.43.96:3000/ping",)
				.then((res) => {
					const data = {
						fullName:fullName,
						email:email,
						password:password,
					}
					axios.post("http://192.168.43.96:3000/auth/signup",data,{
						headers:{
							'api_key':"hkjhalf-afkjahjf_ndkjah6579ad"
						},
					})
					.then((res) => {
						dispatch(setAuthEmail(email))
						setNotification({
							msg1:res.data.msg,
							type:"success",
							endsIn:3000
						})
						setTimeout(() => {
							setNotification(null);
							setLoading(false);
							navigation.push('signupVerification');
						}, 3500)
					})
					.catch((err) => {
						setLoading(false);
						setNotification({
							msg1:err.response.data.error,
							type:"error",
							endsIn:3000
						})
						setTimeout(() => {
							setNotification(null);
						}, 3500)
					})
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

	const closeCongrats = () => {
		setCongrats(0);
	}

	return (
		<>
			{
				congrats === 1
				?(
					<Modal><CongratsCard click={closeCongrats}/></Modal>
				)
				:null
			}
			{
				loading
				?(
					<View style={{position: 'absolute',top: 0,bottom: 0,alignItems: 'center',justifyContent: 'center', height:HEIGHT, width:WIDTH, backgroundColor:'#00000030', zIndex:100}}>
						<ActivityIndicator size="large"  color={constants.BLUE3} style={{position:'absolute', left:0, right:0, bottom:0, top:0}}/>  
					</View>
				)
				:null
			}
			{
				notification
				?(
					<NotifierBar msg1={notification.msg} type={notification.type}/>
				)
				:null
			}
			<StatusBar backgroundColor={loading?'#38BCAF':'#54dbd5'} animated={true}/>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={{height:HEIGHT*0.99, backgroundColor:'white', position:'relative'}}>
				<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-HEIGHT*0.03}>
					<View style={styles.curvedBox}>
						<Text style={{ fontWeight: '500', color: 'white', textAlign: 'center', width: WIDTH, fontSize: 20, transform: [{ rotate: '-4deg' }] }}>Sign Up</Text>
						<Text style={{ fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 50, bottom: 70, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Create New</Text>
						<Text style={{ fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 54, bottom: 35, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Account</Text>
					</View>

					<View style={{height:HEIGHT*0.45,marginTop:HEIGHT*0.03}}>
						<View style={{position:'relative'}}>
							<Text 
								style={[styles.label, validation[0].valid === 0?styles.errorLabel:null]}
							>
								Full Name
							</Text>
							<View style={[styles.textInput, validation[0].valid === 0?styles.errorInput:null,validation[0] === 1?styles.successInput:null, {flexDirection:"row"}]}>
								<AntDesign name="user" size={18} style={{alignSelf:'center', width:'8%'}}/>
								<TextInput 
									style={{width:'84%'}}
									onSubmitEditing={() => verifyFullName()} 
									onChangeText={(text) => verifyInputs("fullName", text)} 
									placeholder='Andrew Ng'
									placeholderTextColor='#00000040'
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
								Email Address
							</Text>
							<View style={[styles.textInput, validation[1].valid === 0?styles.errorInput:null,validation[1] === 1?styles.successInput:null, {flexDirection:"row"}]}>
								<MaterialCommunityIcons name="email-outline" size={20} style={{alignSelf:'center', width:'8%'}}/>
								<TextInput
									style={{width:'84%'}}
									ref={emailRef}
									placeholder='andrew@ng.com'
									placeholderTextColor='#00000040'
									onSubmitEditing={() => verifyEmail()} 
									onChangeText={(text) => verifyInputs("email", text)}
								/>
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
						<View style={{position:'relative'}}>
							<Text 
								style={[styles.label, validation[2].valid === 0?styles.errorLabel:null]}
							>
								Password
							</Text>
							<View style={[styles.textInput, validation[2].valid === 0?styles.errorInput:null,validation[2] === 1?styles.successInput:null, {flexDirection:"row"}]}>
								<Octicons name="lock" size={18} style={{alignSelf:'center', width:'8%'}}/>
								<TextInput
									style={{width:'82%'}}
									secureTextEntry={eye}
									autoCorrect={false}
									placeholder='******'
									placeholderTextColor='#00000040'
									ref={passwordRef} 
									onSubmitEditing={() => verifyPassword()} 
									onChangeText={(text) => verifyInputs("password", text)} 
								/>
								<TouchableOpacity style={{alignSelf:'center',height:HEIGHT*0.07,width:WIDTH*0.08,justifyContent:'center'}} onPress={() => setEye(!eye)}>
									<MaterialCommunityIcons name={eye?"eye-outline":"eye-off-outline"} size={20} style={{color:'#000'}}/>
								</TouchableOpacity>
								{/* {
									validation[2] === 1
									?
									(
										<MaterialCommunityIcons name="checkbox-marked-circle-outline" size={18} style={{color:'#53AF50',width:'8%', alignSelf:'center'}}/>
									)
									:
									null
								} */}

							</View>
							
							{
								validation[2].valid === 0
								?
								(
								<Text style={{color:'red', fontSize:11, position:'absolute', right:'10%', bottom:'10%', opacity:0.7}}>{validation[2].text}</Text>
								)
								:
								null
							}

						</View>
					</View>
				</KeyboardAvoidingView> 
				<View style={{height:HEIGHT*0.15,position:'absolute',bottom:'4%',width:WIDTH,justifyContent:'space-between'}}>
					<Text style={{alignSelf:'center', textAlign: 'center', fontSize: 15}}>Already a Memeber?  <Text style={{ color: '#54dbd5'}} onPress={() => navigation.navigate('signin')}>Sign In</Text></Text>
					<CustomButtonFilled label="SIGN UP" click={handleSignup} style={{width:WIDTH*0.7}}/>
				</View>
			</View>
			</TouchableWithoutFeedback>
			

		</>

	)
}

const styles = StyleSheet.create({
	curvedBox: {
		width: WIDTH + 20,
		height: HEIGHT * 0.33,
		// backgroundColor:constants.BLUE1,
		backgroundColor:'#54dbd5',
		paddingTop: 25,
		position: 'relative',
		right: 10,
		top: -15,
		borderBottomLeftRadius: 80,
		borderBottomRightRadius: 55,
		transform: [{ rotate: '4deg' }],
		marginBottom: HEIGHT*0.015
	},
	textInput: {
		backgroundColor: '#00000010',
		borderRadius: 10,
		width: WIDTH * 0.85,
		marginBottom: 25,
		alignSelf: 'center',
		paddingLeft: 10,
	},
	label: {
		color:'black',
		alignSelf: 'center',
		paddingBottom: 5,
		width: WIDTH * 0.85,
		fontSize: 16,
		opacity:0.5,
	},
	errorLabel: {
		// color:'#FF0000',
		// opacity:0.9,
	},
	errorInput: {
		borderColor:'#ff0000',
		// borderWidth:1
		borderBottomWidth:2
	},
	successInput: {
		borderColor:'#71E753',
		borderBottomWidth:2,
		// borderWidth:1
	}
});

export default Signup;