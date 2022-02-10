import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';
import { CourseBar } from '@components/CourseBar.component';
import ContextMenu from '@components/ContextMenu.component';
import BottomSheetForm from '@components/BottomSheetForm.component';
import BottomSheetEditor from '@components/BottomSheetEditor.component';
import CustomTextInput from '@components/CustomTextInput.component';
import { CustomButtonFilled } from '@components/CustomButton.component';
import bulk4 from '@assets/bulk4.png';

import {  SAVE_HANDLER_COURSE, UPDATE_HANDLER_COURSE } from '@helpers/DataFunctions.js';
import { LOAD_COURSES, DELETE_COURSE, DELETE_COURSE_ATTENDANCE } from '@actions/dbAction';
import { LOAD_COURSE_STUDENTS} from '@actions/markemAction';


import constants from '@helpers/constants'
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const Classes = ({navigation, route}) => {
    const PROGRAMME_ID = route.params.ID;
    const PROGRAMME_NAME = route.params.label;

    const [course, setCourse] = useState( {code:null, title:null, semester:null} );
    const [edit, setEdit] = useState();
    const [courseID, setCourseID] = useState();
    const [courseCode, setCourseCode] = useState();
    const [index, setIndex] = useState();
    const [contextMenu, setContextMenu] = useState(false);
    const [touchPoint, setTouchPoint] = useState(null);
    const [error, setError] = useState( [{status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}] )
    const [form, setForm] = useState(false);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();


    const COURSES = useSelector((state) => state.dbReducer.courses);

    useEffect(() => {
        // Markem_NavBarColor.setBackgroundColor('#FFFFFF');
        dispatch(LOAD_COURSES(PROGRAMME_ID));
    },[isFocused])
    useEffect(() => {
        let error1 = [...error];
        if(course.code){
            if(course.code.length > 0){
                error1[0] = {status:0, msg:''}
            }
        }
        if(course.title){
            if(course.title.length > 0){
                error1[1] = {status:0, msg:''}
            }
        }
        if(course.semester){
            if(course.semester.length > 0){
                error1[2] = {status:0, msg:''}
            }
        }
        setError(error1);        
    },[course])

    const handlePress = (id, code) => {
        navigation.navigate('course_students', {headerLabel:code, ID:id, PROGRAMME_ID:PROGRAMME_ID, PROGRAMME_NAME:PROGRAMME_NAME})
    }

    const semesterPrinter = (value) => {
        switch(value){
            case '1' || 1:
                return '1st Sem'
                break;
            case '2' || 2:
                return '2nd Sem'
                break;
            case '3' || 3:
                return '3rd Sem'
                break;
            case '4' || 4:
                return '4th Sem'
                break;
            case '5' || 5:
                return '5th Sem'
                break;
            case '6' || 6:
                return '6th Sem'
                break;
            case '7' || 7:
                return '7th Sem'
                break;
            case '8' || 8:
                return '8th Sem'
                break;
            default:
                return;
        }
    }
    const handleChange = (name, input) => {
        let error1 = [...error];
        switch(name){
            case "code":
                setCourse({code:input, title:course.title, semester:course.semester});
                if(input.length < 1){
                    error1[0] = {status:1, msg:'Course Code is required'}
                }
                break;
            case "title":
                setCourse({code:course.code, title:input, semester:course.semester});
                if(input.length < 1){
                    error1[1] = {status:1, msg:'Course Title is required'}
                }
                break;
            case "semester":
                setCourse({code:course.code, title:course.title, semester:input});
                if(input.length < 1){
                    error1[2] = {status:1, msg:'Course Semester is required'}
                }
                break;
            default:
                return;
        }
        setError(error1);
    }
    const handleContextMenu = (status, ID, index, code) => {
        if(status){
            setCourseID(ID);
            setCourseCode(code);
            setIndex(index);
        }
        setContextMenu(status);
    }
    const handleSave = async() => {
        const result = await SAVE_HANDLER_COURSE( course.code, course.title, course.semester, PROGRAMME_ID, error, COURSES)
        if(result === 'SAVED'){
            dispatch(LOAD_COURSES(PROGRAMME_ID));
            toggleForm(false);
        }
        else if(result && result.error){
            setError(result.error);
        }
    }
    const handleUpdate = async() => {
        const result = await UPDATE_HANDLER_COURSE( course.code, course.title, course.semester, PROGRAMME_ID, error, index, COURSES, courseID );
        if(result && result.edited === 'no'){
            setEdit(null);
        }
        if(result && result.error){
            setError(result.error);
        }
        if(result && result.updated){
            dispatch(LOAD_COURSES(PROGRAMME_ID));
            setEdit(null);
        }
    }
    const handleEdit = () => {
        setCourse({
            code:COURSES[index].course_code, 
            title:COURSES[index].course_title, 
            semester:COURSES[index].course_semester
        })
        setEdit(courseID);
        handleContextMenu(false);
    };
    const handleDelete = () => {
        handleContextMenu(false);
        dispatch(DELETE_COURSE(courseID))
        dispatch(DELETE_COURSE_ATTENDANCE(courseCode))
        dispatch(LOAD_COURSES(PROGRAMME_ID));
    };
    const toggleForm = (status) => {
        setForm(status);
    }
    const handleContinue = () => {
        navigation.push('upload_file', {headerLabel:'BULK ENTRY', category:'course'})
        toggleForm(false);
    }

    return(
        <>
        <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content'/>
        <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#FFFFFF'}} onTouchStart={(evt) => setTouchPoint({x:evt.nativeEvent.pageX, y:evt.nativeEvent.pageY})}>
            <View style={{height:'90%',paddingTop:HEIGHT*0.15,width:WIDTH}}>
            <FlatList
                data={COURSES}
                showsVerticalScrollIndicator={false}
                // style={{borderWidth:1}}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                    <CourseBar 
                        click={() => handlePress(item.id, item.course_code)} ContextMenu={handleContextMenu}
                        ID={item.id} index={index} code={item.course_code} title={item.course_title} PROGRAMME_NAME={PROGRAMME_NAME} semester={semesterPrinter(item.course_semester)} classesTaken={item.classes_taken}
                    />
                )}
            />
            </View>
            <View style={{height:'10%',position:'absolute',width:WIDTH,bottom:'3%',justifyContent:'center'}}>
                <CustomButtonFilled label="New Course" click={() => toggleForm(true)}/>
            </View>
        </View>
        {
            form
            ? <BottomSheetForm label="New Course" image={bulk4} closeModal={() => toggleForm(false)} handleContinue={handleContinue} handleSave={handleSave}>
                <>
                <CustomTextInput name="code" placeholder="Course Code" handleChange={handleChange} empty={error[0]} capitalize="characters"/>
                <CustomTextInput name="title" placeholder="Course Title" handleChange={handleChange} empty={error[1]} capitalize="words"/>
                <CustomTextInput name="semester" placeholder="Course Semester" handleChange={handleChange} empty={error[2]} type="number-pad" length={1}/>
                </>
            </BottomSheetForm>
            : null
        }
        {
            contextMenu
            ?(
                <>
                <ContextMenu touchPoint={touchPoint} editHandler={handleEdit} deleteHandler={handleDelete}/>
                <TouchableOpacity onPress={() => handleContextMenu(false)} style={{zIndex:2,position:'absolute',height:HEIGHT,width:WIDTH,left:0,top:0}}></TouchableOpacity>
                </>
            )
            :null
        }
         {
            edit
            ?(
                <BottomSheetEditor label="Edit Student" closeModal={() => setEdit(null)} handleSave={handleUpdate}>
                    <CustomTextInput value={course.code} name="code" placeholder="Course Code" handleChange={handleChange} empty={error[0]} capitalize="characters" />
                    <CustomTextInput value={course.title} name="title" placeholder="Course Title" handleChange={handleChange} empty={error[1]} capitalize="words" />
                    <CustomTextInput value={course.semester} name="semester" placeholder="Course Semester" handleChange={handleChange} empty={error[2]} type="number-pad" length={1} />
                </BottomSheetEditor>
            )
            :null
        }
        </>
    )
}
export default Classes;