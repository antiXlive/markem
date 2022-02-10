import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import StudentBar from '@components/StudentBar.component';
import BottomSheetEditor from '@components/BottomSheetEditor.component';
import { CustomButtonFilled } from '@components/CustomButton.component';
import { CardButton } from '@components/CardButton.component';
import { LOAD_COURSE_STUDENTS} from '@actions/markemAction';

import NoData from '@assets/ND.png';

import constants from '@helpers/constants'
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const ClassStudents = ({navigation, route}) => {

    const COURSE_NAME = route.params.headerLabel; 
    const COURSE_ID = route.params.ID; 
    const PROGRAMME_ID = route.params.PROGRAMME_ID; 
    const PROGRAMME_NAME = route.params.PROGRAMME_NAME;
    const Tab = createMaterialTopTabNavigator();

    let COURSE_STUDENTS_DATA = useSelector((state) => state.markemReducer.courseStudentsData);
    let COURSE_STUDENTS = useSelector((state) => state.markemReducer.courseStudents);
    let LOADING = useSelector((state) => state.markemReducer.loading);

    // console.log('***--',COURSE_STUDENTS_DATA);
    // console.log('***--',COURSE_STUDENTS);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const IsDrawerOpen = useIsDrawerOpen();

    const [form, setForm] = useState(false);
    const [bgColor, setBgColor] = useState('#FFFFFF');

    useEffect(() => {
        console.log(IsDrawerOpen);
        if(IsDrawerOpen){
            setBgColor('#54dbd5');
        }
        else{
            setBgColor('#FFFFFF');
        }
    },[IsDrawerOpen])
    // useEffect(() => {
    //     if(COURSE_ID){
    //         dispatch(LOAD_COURSE_STUDENTS(PROGRAMME_ID, COURSE_ID));
    //     }
    // },[COURSE_ID, isFocused])



    const handlePress = (student) => {
        navigation.navigate('student_details', {headerLabel:'STUDENT', student:student, course:COURSE_NAME});
    }
    const registerStudent = () => {
        setForm(true)
    }
    const handleEntry = (entry) => {
        setForm(false)
        navigation.navigate('register_course_students', {headerLabel:COURSE_NAME, ID:COURSE_ID, entry:entry, PROGRAMME_ID:PROGRAMME_ID, PROGRAMME_NAME:PROGRAMME_NAME, REGISTERED_STUDENTS:COURSE_STUDENTS_DATA});
    }

    const newStudents = () => {
        return(
             <FlatList
                style={{backgroundColor:'#FFF',height:'100%',backgroundColor:'#FFF',paddingTop:HEIGHT*0.04}}
                data={COURSE_STUDENTS.new}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                    <StudentBar 
                        click={() => handlePress(item)}
                        ID={item.id} index={index} count={index+1} name={item.full_name} roll={item.roll} department="jkl"
                    />
                )}
            /> 
        )
    }
    const backlogStudents = () => {
        return(
             <FlatList
                style={{backgroundColor:'#FFF',height:'100%',backgroundColor:'#FFF',paddingTop:HEIGHT*0.04}}
                data={COURSE_STUDENTS.backlog}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                    <StudentBar 
                        click={() => handlePress(item)}
                        ID={item.id} index={index} count={index+1} name={item.full_name} roll={item.roll} department="jkl"
                    />
                )}
            /> 
        )
    }

    return(
        <>
            <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#FFF'}}>
                <View style={{height:'87%',paddingTop:HEIGHT*0.09}}>
                    {
                        LOADING?(
                            <ActivityIndicator size='large' color='#3DCCBE'/>
                        )
                        :(
                            !LOADING && COURSE_STUDENTS.length < 1?(
                                <View style={{height:'90%',alignItems:'center',zIndex:-1,paddingTop:'15%'}}>
                                    <Image source={NoData} style={{width:'100%',height:'65%'}} resizeMode='stretch'/>
                                    <Text style={{fontSize:WIDTH*0.05,marginTop:'5%'}}>Oops! No Students are registered</Text>
                                </View>
                            )
                            :(
                                <Tab.Navigator tabBarOptions={{
                                    activeTintColor: '#03B898',
                                    inactiveTintColor: '#00000080',
                                    labelStyle: { fontSize: WIDTH*0.04 },
                                    style: { backgroundColor: '#FFF' },
                                    indicatorStyle:{backgroundColor:'#03B898'}
                                }}>
                                    <Tab.Screen name='new' options={{ tabBarLabel: 'New' }} component={newStudents}/>
                                    <Tab.Screen name='backlog' options={{ tabBarLabel: 'Backlog' }} component={backlogStudents}/>
                                </Tab.Navigator>
                            )
                        )                        
                    }
                    
                </View>
                <View style={{height:'10%',position:'absolute',width:WIDTH,bottom:'1%',justifyContent:'center'}}>
                    <CustomButtonFilled label="REGISTER STUDENT" click={registerStudent}/>
                </View>
            </View>
            {
                form
                ?(
                    <BottomSheetEditor label="Register Student" closeModal={() => setForm(null)} handleSave={() => {}} showButton="no">
                        <View style={{marginTop:'15%',width:'100%', flexDirection:'row',justifyContent:'space-between',paddingHorizontal:'7%'}}>
                            <CardButton label="New" entry="new" action={handleEntry}/>
                            <CardButton label="Backlog" entry="backlog" action={handleEntry}/>
                        </View>
                    </BottomSheetEditor>
                )
                :null
            }
        </>
    )
}
export default ClassStudents;