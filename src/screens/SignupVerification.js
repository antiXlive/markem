import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StatusBar,
    StyleSheet,
	Keyboard,
} from 'react-native'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VerifiedCard from '@components/VerifiedCard.component';
import Modal from '@components/Modal.component';
import { CustomButtonFilled } from '@components/CustomButton.component';
import constants from '@helpers/constants';
import { NetworkUtils } from '@helpers/functions.js';



const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const SignupVerification = ({navigation}) => {
	const email = useSelector((state) => state.auth.email);

	const [error, setError] = useState({status:0, msg:""});
	const [response, setResponse] = useState({status:0, msg:""});
	const [verified, setVerified] = useState(0);
	const [pin1, setPin1] = useState({pin:"", error:false})
	const [pin2, setPin2] = useState({pin:"", error:false})
	const [pin3, setPin3] = useState({pin:"", error:false})
	const [pin4, setPin4] = useState({pin:"", error:false})
	const [pin5, setPin5] = useState({pin:"", error:false})
	const [pin6, setPin6] = useState({pin:"", error:false})

	const pin1Ref = useRef();
	const pin2Ref = useRef();
	const pin3Ref = useRef();
	const pin4Ref = useRef();
	const pin5Ref = useRef();
	const pin6Ref = useRef();

	const handleChange = (value, pin) => {
		const numberValidator = /^\d+$/;
		const otpValidator = /^[0-9]+$|^$/;
		if (otpValidator.test(value)){
			switch(pin){
				case 1:
					setPin1({pin:value, error:false});
					if(numberValidator.test(value))
					pin2Ref.current.focus();
					break;
				case 2:VerifiedCard
					setPin2({pin:value, error:false});
					if(numberValidator.test(value))
					pin3Ref.current.focus();
					break;
				case 3:
					setPin3({pin:value, error:false});
					if(numberValidator.test(value))
					pin4Ref.current.focus();
					break;
				case 4:
					setPin4({pin:value, error:false});
					if(numberValidator.test(value))
					pin5Ref.current.focus();
					break;
				case 5:
					setPin5({pin:value, error:false});
					if(numberValidator.test(value))
					pin6Ref.current.focus();
					break;
				case 6:
					setPin6({pin:value, error:false});
					if(numberValidator.test(value))
					Keyboard.dismiss()
					break;
			}
		}
	}
	const verifyInputs = () => {
		let status = true;
		if(pin1.pin.length<1){
			setPin1({...pin1, error:true});
			status = false;
		}
		if(pin2.pin.length<1){
			setPin2({...pin2, error:true});
			status = false;
		}
		if(pin3.pin.length<1){
			setPin3({...pin3, error:true});
			status = false;
		}
		if(pin4.pin.length<1){
			setPin4({...pin4, error:true});
			status = false;
		}
		if(pin5.pin.length<1){
			setPin5({...pin5, error:true});
			status = false;
		}
		if(pin6.pin.length<1){
			setPin6({...pin6, error:true});
			status = false;
		}
		return status;
	}
	const resetPins = () => {
		setPin1({pin:"", error:false});
		setPin2({pin:"", error:false});
		setPin3({pin:"", error:false});
		setPin4({pin:"", error:false});
		setPin5({pin:"", error:false});
		setPin6({pin:"", error:false});
	}

    const handleVerification = async() => {
		let status = verifyInputs();
		const networkStatus =  await NetworkUtils.isNetworkAvailable();
		if(status){
			if(networkStatus){
				axios.get("http://192.168.43.96:3000/ping",)
				.then((res) => {
					let otp = pin1.pin+pin2.pin+pin3.pin+pin4.pin+pin5.pin+pin6.pin;
					resetPins();
					const data = {
						"email":email,
						"otp": otp
					}
					axios.post("http://192.168.43.96:3000/auth/signup/verify",data,{
						headers:{
							'api_key':"hkjhalf-afkjahjf_ndkjah6579ad"
						},
					})
					.then((res) => {
						setVerified(1);
						setTimeout(() => setVerified(0), 3000);
					})
					.catch((err) => {
						console.log(err);
						setError({
							status:1,
							msg:err.response.data.error
						})
						setTimeout(() => {
							setError(
								{status:0, msg:""}
							)
						}, 3000)
					})
				})
				.catch((err) => {
					console.log(err);
					setError({
						status:1,
						msg:"Server Unreachable"
					})
					setTimeout(() => {
						setError(
							{status:0, msg:""}
						)
					}, 3000)
				})
				
			}
			
		}
	}
	const resendOTP = () => {
		axios.get("http://192.168.43.96:3000/ping",)
		.then((res) => {
			const data = {
				fullName:"null",
				email:email,
				password:"null",
			}
			console.log(data);
			axios.post("http://192.168.43.96:3000/auth/signup",data,{
				headers:{
					'api_key':"hkjhalf-afkjahjf_ndkjah6579ad"
				},
			})
			.then((res) => {
				// setLoading(false);
				// dispatch(setAuthEmail(email))
				setResponse({
					status:1,
					msg:res.data.msg
				})
				setTimeout(() => {
					setResponse(
						{status:0, msg:""}
					)
				}, 3000)
			})
			.catch((err) => {
				// setLoading(false);
				setError({
					status:1,
					msg:err.response.data.error
				})
				setTimeout(() => {
					setError(
						{status:0, msg:""}
					)
				}, 3000)
			})
		})
		.catch((err) => {
			// setLoading(false);
			setError({
				status:1,
				msg:"Server Unreachable"
			})
			setTimeout(() => {
				setError(
					{status:0, msg:""}
				)
			}, 3000)
		})
	}
	const closeVerified = () => {
		setVerified(0);
	}

    return(
        <>
        <StatusBar backgroundColor={constants.BLUE1} animated={true}/>
		{
			verified === 1
			?
			(
				<Modal>
					<VerifiedCard click={closeVerified}/>
				</Modal>
			)
			:
			null
		}
		{
			response.status === 1
			?
			(
				<View style={{width:WIDTH*0.8, alignSelf:'center', height:50, borderRadius:5, backgroundColor:'#53AF50', alignItems:'center', flexDirection:'row', position:'absolute', bottom:'5%', zIndex:2, paddingLeft:10}}>
					<MaterialCommunityIcons name="checkbox-marked-circle-outline" color="white" size={25} style={{width:'12%' }}/>
					<Text style={{color:'white', width:'70%',fontSize:15}}>{response.msg}</Text>
				</View>
			)
			:
			null
		}
		{
			error.status === 1
			?
			(
				<View style={{width:WIDTH*0.8, alignSelf:'center', height:50, borderRadius:5, backgroundColor:'#F24636', alignItems:'center', flexDirection:'row', position:'absolute', bottom:'5%', zIndex:2, paddingLeft:10}}>
					<MaterialIcons name="error-outline" color="white" size={25} style={{width:'12%' }}/>
					<Text style={{color:'white', width:'70%',fontSize:15}}>{error.msg}</Text>
				</View>
			)
			:
			null
		}
        <View style={{ flexGrow: 1, height: '100%', backgroundColor:'white' }}>
			<View style={styles.curvedBox}>
				<Text style={{ fontWeight: '500', color: 'white', textAlign: 'center', width: constants.WIDTH, fontSize: 20, transform: [{ rotate: '-4deg' }] }}>Verification</Text>
				<Text style={{ fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 50, bottom: 70, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Verify Your</Text>
				<Text style={{ fontFamily: 'roboto', fontWeight: '600', color: 'white', position: 'absolute', left: 53, bottom: 35, fontSize: 26, transform: [{ rotate: '-4deg' }] }}>Email</Text>
			</View>

            <View style={{height:HEIGHT*0.45}}>
					<View style={{position:'relative',paddingHorizontal:WIDTH*0.05}}>
						<Text 
							style={[styles.label]}
						>
							Verification Code
						</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <TextInput value={pin1.pin} ref={pin1Ref} onChangeText={(value) => {handleChange(value, 1)}} keyboardType="number-pad" maxLength={1} style={[styles.textInput, pin1.error?styles.error:""]}/>
                                <TextInput value={pin2.pin} ref={pin2Ref} onChangeText={(value) => {handleChange(value, 2)}} keyboardType="number-pad" maxLength={1} style={[styles.textInput, pin2.error?styles.error:""]}/>
                                <TextInput value={pin3.pin} ref={pin3Ref} onChangeText={(value) => {handleChange(value, 3)}} keyboardType="number-pad" maxLength={1} style={[styles.textInput, pin3.error?styles.error:""]}/>
                                <TextInput value={pin4.pin} ref={pin4Ref} onChangeText={(value) => {handleChange(value, 4)}} keyboardType="number-pad" maxLength={1} style={[styles.textInput, pin4.error?styles.error:""]}/>
                                <TextInput value={pin5.pin} ref={pin5Ref} onChangeText={(value) => {handleChange(value, 5)}} keyboardType="number-pad" maxLength={1} style={[styles.textInput, pin5.error?styles.error:""]}/>
                                <TextInput value={pin6.pin} ref={pin6Ref} onChangeText={(value) => {handleChange(value, 6)}} keyboardType="number-pad" maxLength={1} style={[styles.textInput, pin6.error?styles.error:""]}/>
                        </View>
					</View>
            </View>
			<View style={{height:HEIGHT*0.15}}>
				<Text style={{alignSelf:'center', textAlign: 'center', fontSize: 15, }}>Didn’t received the code?  <Text style={{ color: constants.BLUE2 }} onPress={() => {resendOTP()}}>Resend</Text></Text>
				<CustomButtonFilled label="VERIFY" click={handleVerification}/>
			</View>
		</View>
        </>
    )
}

const styles = StyleSheet.create({
	curvedBox: {
		width: WIDTH + 20,
		height: HEIGHT * 0.33,
		backgroundColor:constants.BLUE1,
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
		borderRadius:5,
		width:WIDTH*0.12,
		height:60,
		backgroundColor:'white',
		textAlign:'center',
		fontSize:25,
		elevation:8,
	},
	error:{
		borderColor:'red',
		borderWidth:1
	},
	label: {
		paddingBottom: 35,
		width: WIDTH * 0.85,
		fontSize: 18,
		opacity:0.5,
		color:'black'
	},
});

export default SignupVerification;