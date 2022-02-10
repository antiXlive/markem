import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import { CourseBar } from '@components/CourseBar.component';
// import { CustomButtonFilled } from '@components/CustomButton.component';
import { CardIconedButton } from '@components/CardButton.component';
import { LOAD_COURSE_STUDENTS} from '@actions/markemAction';
import constants from '@helpers/constants'

import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Home1 = ({navigation, route}) => {
    const dispatch = useDispatch();


    useEffect(() => {
        Markem_NavBarColor.setBackgroundColor('#FFFFFF',true);
    },[])

    const code = route.params.headerLabel;
    const COURSE_ID = route.params.COURSE_ID;
    const PROGRAMME_ID = route.params.PROGRAMME_ID;
    const PROGRAMME_NAME = route.params.PROGRAMME_NAME;

    const handlePress = (screen) => {
        if(screen === 'class_students'){
            console.log(PROGRAMME_ID)
            console.log(COURSE_ID)
            dispatch(LOAD_COURSE_STUDENTS(PROGRAMME_ID, COURSE_ID));    
            navigation.navigate('manage_data', {screen:'course_students', params:{headerLabel:code, ID:COURSE_ID, PROGRAMME_ID:PROGRAMME_ID, PROGRAMME_NAME:PROGRAMME_NAME}})

        }
        else{
            navigation.navigate(screen, {headerLabel:code, ID:COURSE_ID, PROGRAMME_ID:PROGRAMME_ID});
        }
    }

    return(
        <>
        {/* <StatusBar backgroundColor='#FFF' barStyle='dark-content'/> */}
        <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#FFF', paddingTop:HEIGHT*0.1}}>
            <View style={{flexDirection:'row',height:'22%',justifyContent:'space-evenly', marginVertical:30}}>
                <CardIconedButton label="Take Attendance" iconParent="Ionicons" icon="newspaper-outline" screen="class_attendance" action={handlePress}/>
                <CardIconedButton label="View Students" iconParent="FontAwesome" icon="graduation-cap" screen="class_students" action={handlePress}/>
            </View>
            <View style={{paddingLeft:15}}>
                <Text style={{fontSize:22, opacity:0.8, marginBottom:15}}>Classes Taken</Text>
                <View style={{borderRadius:15, width:WIDTH*0.9, height:130, backgroundColor:'#F7FDFA', alignSelf:'center',}}>
                    <View style={{height:'80%', flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                        <View style={{borderWidth:6, elevation:2, width:WIDTH*0.20, height:WIDTH*0.20, borderRadius:200, borderColor:'#3DCCBE', alignItems:'center', justifyContent:'center'}}>
                            <Text style={{elevation:20, fontSize:25, color:'#3DCCBE', fontWeight:'700'}}>19</Text>
                        </View>
                        <View style={{borderWidth:6, elevation:2, width:WIDTH*0.20, height:WIDTH*0.20, borderRadius:200, borderColor:'#3DCCBE', alignItems:'center', justifyContent:'center'}}>
                            <Text style={{elevation:20, fontSize:25, color:'#3DCCBE', fontWeight:'700'}}>05</Text>
                        </View>
                    </View>
                    <View style={{height:'20%', flexDirection:'row'}}>
                        <View style={{width:'50%', alignItems:'center',opacity:0.7}}><Text style={{fontSize:WIDTH*0.035,}}>This Semester</Text></View>
                        <View style={{width:'50%', alignItems:'center',opacity:0.7}}><Text style={{fontSize:WIDTH*0.035,}}>This Month</Text></View>
                    </View>

                </View>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    title1: {
        fontSize: 18
    },
    title2: {
        fontSize: 15,
        opacity: 0.5
    },
    barStyle: {
        width: WIDTH * 0.8, 
        height: 60, 
        borderRadius: 6, 
        flexDirection: 'row', 
        backgroundColor: '#DAF3EF', 
        marginBottom:25, 
        elevation:5
    },
    title1: {
        fontSize: 18
    },
    title2: {
        fontSize: 15,
        opacity: 0.5
    },
})


export default Home1;