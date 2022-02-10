import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TabBarIOS,
    ActivityIndicator
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PieChart from '@components/PieChart.component';
import { GET_STUDENT_COURSES, GET_STUDENT_ATTENDANCE_PERCENT } from '@helpers/DataFunctions.js';

import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Student = ({route}) => {
    const Tab = createMaterialTopTabNavigator();
    const STUDENT = route.params.student;
    const COURSE = route.params.course;

    const [studentCourses, setStudentCourses] = useState();
    const [attendanceStats, setAttendanceStats] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        INITIALIZE_DATA();
        setTimeout(() => setLoading(false), 500);
    },[]);




    const INITIALIZE_DATA = async() => {
        let courses = await GET_STUDENT_COURSES(STUDENT);
        setStudentCourses(courses);

        let attendance = await GET_STUDENT_ATTENDANCE_PERCENT(courses[0], STUDENT.roll);
        setAttendanceStats(attendance);
    }
    const nameLogo = (name) => {
        let nameArray = name.split(' ');
        let nameLogo = nameArray[0].charAt(0) + nameArray[1].charAt(0)
        return nameLogo;
    }

    const Student = (props) => {
        return(
            <View key={props.id} style={{width:WIDTH,height:'100%',backgroundColor:'#FFF'}}>
                <View style={{width:'100%',height:'33%',alignItems:'flex-start',paddingTop:'5%',flexDirection:'row',justifyContent:'space-evenly'}}>
                    <View style={{width:'40%',alignItems:'center',justifyContent:'center'}}>
                        <PieChart radius={WIDTH*0.13} strokeWidth={5} fs={WIDTH*0.06} color1='#F63F2240' color2='#F63F22' percentage={attendanceStats?attendanceStats.absentPercent:0}/>
                        <View style={{width:'50%',flexDirection:'row',alignItems:'center',paddingTop:'2%'}}>
                            <View style={{width:WIDTH*0.02,height:WIDTH*0.02,borderRadius:2,backgroundColor:'#F63F22'}}></View>
                            <Text style={{fontSize:WIDTH*0.025,opacity:0.8,marginLeft:'5%'}}>Absent</Text>
                        </View>
                    </View>
                    <View style={{width:'40%',alignItems:'center',justifyContent:'center'}}>
                        <PieChart radius={WIDTH*0.13} strokeWidth={5} fs={WIDTH*0.06} color1='#62D43C50' color2='#62D43C' percentage={attendanceStats?attendanceStats.presentPercent:0}/>
                        <View style={{width:'50%',flexDirection:'row',alignItems:'center',paddingTop:'2%'}}>
                            <View style={{width:WIDTH*0.02,height:WIDTH*0.02,borderRadius:2,backgroundColor:'#65D53D'}}></View>
                            <Text style={{fontSize:WIDTH*0.025,opacity:0.8,marginLeft:'5%'}}>Present</Text>
                        </View>
                    </View>
                </View>
                <View style={{width:'100%',height:'16%',alignItems:'center'}}>
                    <View style={{width:'90%',backgroundColor:'#64D6CB',height:'100%',borderRadius:10,flexDirection:'row',alignItems:'center'}}>
                        <View style={{height:'75%',width:'32%',justifyContent:'space-evenly'}}>
                            <Text style={{fontSize:WIDTH*0.085,color:'#FFF',textAlign:'center'}}>12</Text>
                            <Text style={{fontSize:WIDTH*0.027,letterSpacing:1,color:'#FFF',textAlign:'center'}}>Thumbs up</Text>
                        </View>
                        <View style={{borderLeftWidth:1,borderRightWidth:1,borderColor:'#FFF',height:'75%',width:'36%',justifyContent:'space-evenly'}}>
                            <Text style={{fontSize:WIDTH*0.095,color:'#FFF',textAlign:'center'}}>{attendanceStats?attendanceStats.presentPercent:0}<Text style={{fontSize:WIDTH*0.05}}>%</Text></Text>
                            <Text style={{fontSize:WIDTH*0.027,letterSpacing:1,color:'#FFF',textAlign:'center'}}>Attendance</Text>
                        </View>
                        <View style={{height:'75%',width:'32%',justifyContent:'space-evenly'}}>
                            <Text style={{fontSize:WIDTH*0.085,color:'#FFF',textAlign:'center'}}>01</Text>
                            <Text style={{fontSize:WIDTH*0.027,letterSpacing:1,color:'#FFF',textAlign:'center'}}>Thumbs down</Text>
                        </View>
                    </View>
                </View>
                <View style={{width:'100%',height:'50%'}}></View>
            </View>
        )
    }

    return(
        <>
        {
            loading?(
                <View style={{alignItems:'center',justifyContent:'center',width:WIDTH,height:HEIGHT}}>
                    <ActivityIndicator size='large' color='#3DCBBE'/>
                </View>
            ):(
                <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#FFF',paddingTop:'15%'}}>
                <View style={{width:'100%',height:'22%',flexDirection:'row'}}>
                    <View style={{width:'32%',alignItems:'flex-end',justifyContent:'center'}}>
                        <View style={{alignItems:'center',justifyContent:'center',width:WIDTH*0.23,height:WIDTH*0.23,borderWidth:1.6,borderColor:'#03B898',borderRadius:100,elevation:10,backgroundColor:'#FFF'}}>
                            <Text style={{fontSize:WIDTH*0.08,letterSpacing:5,color:'#03B898',fontWeight:'bold'}}>{nameLogo(STUDENT.full_name)}</Text>
                        </View>
                    </View>
                    <View style={{width:'68%',justifyContent:'space-evenly',paddingVertical:'5%',paddingLeft:'5%',paddingRight:'3%'}}>
                        <Text style={{fontSize:WIDTH*0.04,fontWeight:'700',letterSpacing:STUDENT.full_name.length>18?0.5:1}}>{STUDENT.full_name}</Text>
                        <Text style={{fontSize:WIDTH*0.034,letterSpacing:1}}>CSE - {STUDENT.roll}</Text>
                        <Text style={{fontSize:WIDTH*0.034,letterSpacing:1}}>B.Tech : 2018-2022</Text>
                        <Text style={{fontSize:WIDTH*0.03,letterSpacing:0.7}}>{STUDENT.email}</Text>
                    </View>
                </View>
                <View style={{width:'100%',height:'78%'}}>
                    {
                        studentCourses
                        ?(
                            <Tab.Navigator initialRouteName={COURSE} tabBarOptions={{
                                activeTintColor: '#03B898',
                                inactiveTintColor: '#00000080',
                                labelStyle: { fontSize: WIDTH*0.04 },
                                style: { backgroundColor: '#FFF' },
                                indicatorStyle:{backgroundColor:'#03B898'}
                            }}>
                                {
                                    studentCourses.map((course,index) => (
                                        <>
                                            <Tab.Screen key={index.toString()} name={course}>
                                                {() => <Student key={index.toString()} id={index}/>}
                                            </Tab.Screen>
                                        </>
                                    ))
                                }
                            </Tab.Navigator>
                        ):null
                    }                    
                </View>
            </View>
            )
        }
        </>
    )
}

export default Student;