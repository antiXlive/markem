import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native';
// import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import Hamburger from '@assets/hamburger.png'

import Home from '@screens/Home';
import ClassDetails from '@screens/ClassDetails.screen';
import Attendance from '@screens/Attendance.screen';
import AttendanceStatistics from '@screens/AttendanceStatistics.screen';
import ClassStudents from '@screens/ClassStudents.screen';

import Onboarding from '@screens/Onboarding';
import Signup from '@screens/Signup';
import SignupVerification from '@screens/SignupVerification';
import Signin from '@screens/Signin';


import constants from '@helpers/constants.js';
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none" screenOptions={{animationEnabled:false}} initialRouteName="signup">
    <AuthStack.Screen name="onboarding" component={Onboarding}/>
    <AuthStack.Screen name="signup" component={Signup} />
    <AuthStack.Screen name="signupVerification" component={SignupVerification} />
    <AuthStack.Screen name="signin" component={Signin} />
  </AuthStack.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator 
    screenOptions={({navigation}) => ({headerTransparent:true, headerTitleAlign:'center', headerTitleStyle: {fontWeight: 'bold', fontSize:WIDTH*0.06, letterSpacing:1}, ...TransitionPresets.ModalSlideFromBottomIOS,
    headerLeft:() => (
      <TouchableOpacity activeOpacity={0.5} onPress={() => alert('hey')}>
        <Image source={Hamburger} style={{width:WIDTH*0.065, height:WIDTH*0.048,marginLeft:WIDTH*0.05,}} resizeMode="stretch"/>
      </TouchableOpacity>
      )
    })} 
  >
    <HomeStack.Screen name="HOME" component={Home}/>
    <HomeStack.Screen name="class_details" component={ClassDetails} options={({route}) => ({title: route.params.headerLabel})}/>
    <HomeStack.Screen name="class_attendance" component={Attendance} options={{headerShown:false}} />
    <HomeStack.Screen name="class_students" component={ClassStudents} options={({route}) => ({title: route.params.headerLabel})}/>
  </HomeStack.Navigator>
);



export { HomeStackScreen, AuthStackScreen };

//   const StatsStackScreen = () => (
//     <StatsStack.Navigator screenOptions={{headerTransparent:true, headerTitleAlign:'center', headerTitleStyle: {fontWeight: 'bold', fontSize:WIDTH*0.06, letterSpacing:1}, ...TransitionPresets.ModalSlideFromBottomIOS}} >
//       <StatsStack.Screen name="STATS" component={Statistics} />
//       <StatsStack.Screen name="details2" component={Details} options={({route}) => ({title: route.params.headerLabel})}/>
//     </StatsStack.Navigator>
//   );
//   const ProfileStackScreen = () => (
//     <ProfileStack.Navigator screenOptions={{headerTransparent:true, headerTitleAlign:'center', headerTitleStyle: {fontWeight: 'bold', fontSize:WIDTH*0.06, letterSpacing:1},...TransitionPresets.ModalSlideFromBottomIOS}} >
//       <ProfileStack.Screen name="PROFILE" component={Profile} />
//       <ProfileStack.Screen name="details3" component={Details} options={({route}) => ({title: route.params.headerLabel})}/>
//     </ProfileStack.Navigator>
//   );