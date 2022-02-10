import React, {useState, useEffect} from 'react';
import {
    View,
    ScrollView,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet
} from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import TopTabBar from '@components/TopTabBar.component';
import { CourseBar } from '@components/CourseBar.component';
import CustomTextInput from '@components/CustomTextInput.component';
import ContextMenu from '@components/ContextMenu.component';
import StudentBar from '@components/StudentBar.component';
import { CustomButtonFilled } from '@components/CustomButton.component';
import BottomSheetForm from '@components/BottomSheetForm.component';
import BottomSheetEditor from '@components/BottomSheetEditor.component';

import NoData from '@assets/ND.png'
import bulk4 from '@assets/bulk4.png';
import bulk5 from '@assets/bulk5.png';

import { SAVE_HANDLER_COURSE, UPDATE_HANDLER_COURSE, SAVE_HANDLER_STUDENT, UPDATE_HANDLER_STUDENT } from '@helpers/DataFunctions.js';
import { LOAD_COURSES, LOAD_STUDENTS, DELETE_COURSE, DELETE_STUDENT } from '@actions/dbAction';


import constants from '@helpers/constants.js';
import { DELETE_BATCH } from '@actions/dbAction';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;




const ManageData_4 = ({navigation, route}) => {
    const PROGRAMME_ID = route.params.PROGRAMME_ID; 
    const BATCH_ID = route.params.BATCH_ID; 
    const DEPARTMENT_ID = route.params.DEPARTMENT_ID;
    const PROGRAMME_NAME = route.params.SHORT_NAME;

    const [activeTab, setActiveTab] = useState(1);
    const [show, setShow] = useState(false);
    const [entry, setEntry] = useState(null);

    const [cCode, setCCode] = useState(null);
    const [cFullName, setCFullName] = useState(null);
    const [cSemester, setCSemester] = useState(null);
    const [sName, setSName] = useState(null);
    const [sRoll, setSRoll] = useState(null);
    const [sEmail, setSEmail] = useState(null);
    const [contextMenu, setContextMenu] = useState(false);
    const [touchPoint, setTouchPoint] = useState(null);

    const [courseID, setCourseID] = useState();
    const [studentID, setStudentID] = useState();
    const [index, setIndex] = useState();

    const [edit, setEdit] = useState(null);



    const [empty, setEmpty] = useState([{status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}])

    const dispatch = useDispatch();
    const isFocused = useIsFocused();


    const COURSES = useSelector((state) => state.dbReducer.courses);
    const STUDENTS = useSelector((state) => state.dbReducer.students);
    const IsDrawerOpen = useIsDrawerOpen();

    if(STUDENTS){
        STUDENTS.sort(function(a,b){
            return  a.roll - b.roll;
        })
    }

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

    useEffect(() => {
        dispatch(LOAD_COURSES(PROGRAMME_ID, DEPARTMENT_ID));
        dispatch(LOAD_STUDENTS(PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID));
    },[isFocused]);


    const tabs = ['Classes', 'Students']

    const handleSwitch = (tabIndex) => {
        setActiveTab(tabIndex);
    }

    const handlePress = () => {
        console.log('hey');
        // navigation.navigate('student_details', {headerLabel:'STUDENT'});
    }
    const handleNewProgramme = () => {
        setShow(true);
    }
    const closeModal = () => {
        setShow(false);
    }
    const handleEntry = (entry) => {
        setEntry(entry)
    }
    const handleSave = async() => {
        if(activeTab === 0){
            const result = await SAVE_HANDLER_COURSE( cCode, cFullName, cSemester, PROGRAMME_ID, DEPARTMENT_ID, empty, COURSES)
            if(result === 'SAVED'){
                dispatch(LOAD_COURSES(PROGRAMME_ID, DEPARTMENT_ID));
                closeModal();
            }
            else if(result && result.error){
                setEmpty(result.error);
            }
        }
        if(activeTab === 1){
            const result = await SAVE_HANDLER_STUDENT( sName, sRoll, sEmail, PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID, empty, STUDENTS)
            if(result === 'SAVED'){
                dispatch(LOAD_STUDENTS(PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID));
                closeModal();
            }
            else if(result && result.error){
                setEmpty(result.error);
            }
        }
    }
    const handleContinue = () => {
        navigation.push('upload_file', {headerLabel:'BULK ENTRY', category:'student', PROGRAMME_ID:PROGRAMME_ID, BATCH_ID:BATCH_ID, DEPARTMENT_ID:DEPARTMENT_ID})
        closeModal();
    }
    const handleChange = (name, input) => {
        let empty1 = [...empty];
        switch(name){
            case "cCode":
                setCCode(input);
                if(input.length < 1){
                    empty1[0] = {status:1, msg:'Code is required'}
                }
                break;
            case "cFullName":
                setCFullName(input);
                if(input.length < 1){
                    empty1[1] = {status:1, msg:'Full Name is required'}
                }
                break;
            case "cSemester":
                setCSemester(input);
                if(input.length < 1){
                    empty1[2] = {status:1, msg:'Course Semester is required'}
                }
                break;
            case "sName":
                setSName(input);
                if(input.length < 1){
                    empty1[3] = {status:1, msg:'Full Name is required'}
                }
                break;
            case "sRoll":
                setSRoll(input);
                if(input.length < 1){
                    empty1[4] = {status:1, msg:'Roll no. is required'}
                }
                break;
            case "sEmail":
                setSEmail(input);
                if(input.length < 1){
                    empty1[5] = {status:1, msg:'Email is required'}
                }
                break;
            default:
                return;
        }
        setEmpty(empty1);
    }
    useEffect(() => {
        let empty1 = [...empty];
        if(cCode){
            if(cCode.length > 0){
                empty1[0] = {status:0, msg:''}
            }
        }
        if(cFullName){
            if(cFullName.length > 0){
                empty1[1] = {status:0, msg:''}
            }
        }
        if(cSemester){
            if(cSemester.length > 0){
                empty1[2] = {status:0, msg:''}
            }
        }
        setEmpty(empty1);        
    },[cCode, cFullName, cSemester])
    useEffect(() => {
        let empty1 = [...empty];
        if(sName){
            if(sName.length > 0){
                empty1[3] = {status:0, msg:''}
            }
        }
        if(sRoll){
            if(sRoll.length > 0){
                empty1[4] = {status:0, msg:''}
            }
        }
        if(sEmail){
            if(sEmail.length > 0){
                empty1[5] = {status:0, msg:''}
            }
        }
        setEmpty(empty1);        
    },[sName, sRoll, sEmail])
    
    const handleContextMenu = (status, ID, index) => {
        if(status){
            if(activeTab === 0){
                setCourseID(ID);
            }
            if(activeTab === 1){
                setStudentID(ID)
            }
            setIndex(index);
        }
        setContextMenu(status);
    }
    const handleUpdate = async() => {
        if(activeTab === 0){
            const result = await UPDATE_HANDLER_COURSE( cCode, cFullName, cSemester, PROGRAMME_ID, DEPARTMENT_ID, empty, index, COURSES, edit );
            if(result && result.edited === 'no'){
                setEdit(null);
            }
            if(result && result.error){
                setEmpty(result.error);
            }
            if(result && result.updated){
                dispatch(LOAD_COURSES(PROGRAMME_ID, DEPARTMENT_ID));
                setEdit(null);
            }
        };
        if(activeTab === 1){
            const result = await UPDATE_HANDLER_STUDENT( sName, sRoll, sEmail, PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID, empty, STUDENTS, index, edit );
            if(result && result.edited === 'no'){
                setEdit(null);
            }
            if(result && result.error){
                setEmpty(result.error);
            }
            if(result && result.updated){
                dispatch(LOAD_STUDENTS(PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID));
                setEdit(null);
            }
        };
    }

    const handleEdit = () => {
        if(activeTab === 0){
            setCCode(COURSES[index].course_code);
            setCFullName(COURSES[index].course_title);
            setCSemester(COURSES[index].course_semester);
            setEdit(courseID);
        }
        if(activeTab === 1){
            setSName(STUDENTS[index].full_name);
            setSRoll(STUDENTS[index].roll);
            setSEmail(STUDENTS[index].email);
            setEdit(studentID);
        }
        handleContextMenu(false);
    };
    const handleDelete = () => {
        if(activeTab === 0){
            dispatch(DELETE_COURSE(courseID))
            dispatch(LOAD_COURSES(PROGRAMME_ID, DEPARTMENT_ID));
        }
        if(activeTab === 1){
            dispatch(DELETE_STUDENT(studentID))
            dispatch(LOAD_STUDENTS(PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID));
        }
        handleContextMenu(false);
    };
    return(
        <>
        <StatusBar backgroundColor={ show === true ?'#AAA' :bgColor}/>
        <View style={{height:HEIGHT,backgroundColor:'#FFF',paddingTop:HEIGHT*0.1}}>
            {
                show === true
                ? <BottomSheetForm label={activeTab === 0 ? "New Class" : "New Student"} image={activeTab === 0 ? bulk4 : bulk5} closeModal={closeModal} setEntry={handleEntry} handleContinue={handleContinue} handleSave={handleSave}>
                    <>
                        <CustomTextInput name="sName" placeholder="Student Name" handleChange={handleChange} empty={empty[3]} capitalize="words"/>
                        <CustomTextInput name="sRoll" placeholder="Student Roll" handleChange={handleChange} empty={empty[4]}/>
                        <CustomTextInput name="sEmail" placeholder="Student Email" handleChange={handleChange} empty={empty[5]} type="default"/>
                    </>
                </BottomSheetForm>
                : null
            }
            {/* <TopTabBar tabs={tabs} click={handleSwitch} /> */}
            <View style={{alignItems:'center',marginTop:HEIGHT*0.01,width:WIDTH, height:'87%'}} onTouchStart={(evt) => setTouchPoint({x:evt.nativeEvent.pageX, y:evt.nativeEvent.pageY})}>
                {
                    STUDENTS && STUDENTS.length > 0?(
                        <FlatList
                            data={STUDENTS}
                            showsVerticalScrollIndicator={false}
                            style={{width:WIDTH}}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <StudentBar 
                                    click={() => console.log('zzzzzzzzz')} ContextMenu={handleContextMenu}
                                    ID={item.id} index={index} count={index+1} name={item.full_name} roll={item.roll} department="jkl"
                                />
                            )}
                        />
                    )
                    :(
                        <View style={{height:'90%',alignItems:'center',zIndex:-1,width:WIDTH,paddingTop:'15%'}}>
                            <Image source={NoData} style={{width:'100%',height:'65%'}} resizeMode='stretch'/>
                            <Text style={{fontSize:WIDTH*0.05,marginTop:'5%'}}>Oops! No Data Found</Text>
                        </View>
                    )
                }
            </View>
            <View style={{height:'10%',position:'absolute',width:WIDTH,bottom:'2%',justifyContent:'center'}}>
                <CustomButtonFilled label={activeTab === 0 ? "NEW CLASS" : "NEW STUDENT"} click={handleNewProgramme}/>
            </View>
        </View>
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
            ?
            (
                <BottomSheetEditor label="Edit Student" closeModal={() => setEdit(null)} handleSave={handleUpdate}>
                    <CustomTextInput value={sName} name="sName" placeholder="Student Name" handleChange={handleChange} empty={empty[3]} capitalize="words" />
                    <CustomTextInput value={sRoll} name="sRoll" placeholder="Student Roll" handleChange={handleChange} empty={empty[4]} capitalize="words" />
                    <CustomTextInput value={sEmail} name="sEmail" placeholder="Student Email" handleChange={handleChange} empty={empty[5]} type="default" />
                </BottomSheetEditor>
            )
            :null
        }
        </>
    )
}

export default ManageData_4;