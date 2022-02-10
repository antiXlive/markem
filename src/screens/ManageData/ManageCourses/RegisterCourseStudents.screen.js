import React, {useEffect, useState, useCallback} from 'react';
import {
    View,
    Text,
    FlatList,
    BackHandler,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NotifierBar from '@components/NotifierBar.component';
import ContextMenu from '@components/ContextMenu.component';
import { CustomButtonFilled } from '@components/CustomButton.component';


import { LOAD_BATCHES, LOAD_DEPARTMENTS, LOAD_STUDENTS } from '@actions/dbAction';
import { LOAD_REGISTERED_COURSE_STUDENTS, LOAD_COURSE_STUDENTS } from '@actions/markemAction';
import { REGISTER_COURSE_STUDENTS } from '@helpers/DataFunctions.js';

import constants from '@helpers/constants'
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;



const RegisterCourseStudents = ({navigation, route}) => {
    const ENTRY = route.params.entry;
    const COURSE_ID = route.params.ID;
    const COURSE_CODE = route.params.headerLabel;
    const PROGRAMME_ID = route.params.PROGRAMME_ID;
    const PROGRAMME_NAME = route.params.PROGRAMME_NAME;
    const COURSE_STUDENTS = route.params.REGISTERED_STUDENTS;
    const dispatch = useDispatch();


    useEffect(() => {
        // console.log('\n');
        // console.log('-------------------------------------effect-------------------------------------');
        dispatch(LOAD_BATCHES(PROGRAMME_ID));
        dispatch(LOAD_REGISTERED_COURSE_STUDENTS(PROGRAMME_ID,COURSE_ID, ENTRY));
    },[]);


    const [touchPoint, setTouchPoint] = useState(null);
    const [touchPoint1, setTouchPoint1] = useState(null);
    const [contextMenu, setContextMenu] = useState({status:false, mode:null});
    
    const [addedBatch, setAddedBatch] = useState([]);
    const [addedDepartment, setAddedDepartment] = useState([]);
    const [addedStudent, setAddedStudent] = useState([]);

    const [tempBatch, setTempBatch] = useState(null);
    const [tempDepartment, setTempDepartment] = useState(null);
    const [tempStudent, setTempStudent] = useState(null);

    const [tempBatchRemove, setTempBatchRemove] = useState(null);
    const [tempDepartmentRemove, setTempDepartmentRemove] = useState(null);
    const [tempStudentRemove, setTempStudentRemove] = useState(null);

    const [currentView, setCurrentView] = useState('batch');
    const [openedBatch, setOpenedBatch] = useState(null)
    const [openedDepartment, setOpenedDepartment] = useState(null);

    const [notification, setNotification] = useState(null);

    const LOADING = useSelector((state) => state.dbReducer.loading);
    const BATCHES = useSelector((state) => state.dbReducer.batches);
    const DEPARTMENTS = useSelector((state) => state.dbReducer.departments);
    const STUDENTS = useSelector((state) => state.dbReducer.students);  

    const LOADING1 = useSelector((state) => state.markemReducer.loading);
    const NEW = useSelector((state) => state.markemReducer.registered_NEW);
    const BACKLOG = useSelector((state) => state.markemReducer.registered_BACKLOG);



    const handleBack = useCallback(() => {
        // console.log('ppp',currentView);
        if(currentView === 'student'){
            // console.log(STUDENTS);
            dispatch(LOAD_DEPARTMENTS(PROGRAMME_ID, openedBatch.id));
            setCurrentView('department');
            return true;
        }
        else if(currentView === 'department'){
            setCurrentView('batch');
            dispatch(LOAD_BATCHES(PROGRAMME_ID));
            // console.log(DEPARTMENTS)
            return true;
        }
        else if(currentView === 'batch'){
            // console.log(BATCHES)
            dispatch(LOAD_COURSE_STUDENTS(PROGRAMME_ID, COURSE_ID));
            return false;
        };
        return true
    }, [currentView]);
    useEffect(() => {
        let handler = BackHandler.addEventListener(
            'hardwareBackPress',handleBack,
        );
    
        return () => handler.remove();
    },[handleBack]);

    // if(!LOADING){
    //     console.log('BT-----',BATCHES);
    //     console.log('DT-----',DEPARTMENTS);
    //     console.log('ST-----',STUDENTS);
    // }
    if(!LOADING1){
        // console.log('-----------',ENTRY);
        let data;
        if(ENTRY == 'new'){
            data = NEW;
        }
        else if(ENTRY == 'backlog'){
            data = BACKLOG;
        }
        // console.log('...............',ENTRY,data);
        let B = [], D = [], S = [];
        if(data.b && data.b.length > 0){
            data.b.map((data) => {
                const exists = addedBatch.find(item => item.data.ID === data.ID);
                if(!exists){
                    let save = {data}
                    B.push(save);
                }
            })
        }
        if(data.d && data.d.length > 0){
            data.d.map((data) => {
                const exists = addedDepartment.find(item => item.data.ID === data.ID);
                if(!exists){
                    let save = {data}
                    D.push(save);
                }
            })
        }
        if(data.s && data.s.length > 0){
            data.s.map((data) => {
                const exists = addedStudent.find(item => item.data.ID === data.ID);
                if(!exists){
                    let save = {data}
                    S.push(save);
                }
            })
        }
        if(B.length > 0){
            setAddedBatch(B);
        }
        if(D.length > 0){
            setAddedDepartment(D);
        }
        if(S.length > 0){
            setAddedStudent(S);
        }
    }
    const namePrinter = (name) => {
        let z = name;
        if(z.length>15){
            z=z.substring(0,14);
            z+='..'
        }
        return z;
    }
    const handleSave = async() => {
        let batchsToAdd = [];
        let departmentsToAdd = [];
        let studentsToAdd = [];
        addedBatch.map((item) => {
            batchsToAdd.push(item.data.ID);
        })
        addedDepartment.map((item) => {
            departmentsToAdd.push(item.data.ID);
        })
        addedStudent.map((item) => {
            studentsToAdd.push(item.data.ID);
        })
        if(batchsToAdd.length > 0 || departmentsToAdd.length > 0 || studentsToAdd.length > 0){
            // dispatch(REGISTER_COURSE_STUDENTS(ENTRY,batchsToAdd, departmentsToAdd, studentsToAdd, COURSE_ID, PROGRAMME_ID, COURSE_STUDENTS));
            REGISTER_COURSE_STUDENTS(ENTRY,batchsToAdd, departmentsToAdd, studentsToAdd, COURSE_ID, PROGRAMME_ID, COURSE_STUDENTS, COURSE_CODE);
            dispatch(LOAD_COURSE_STUDENTS(PROGRAMME_ID, COURSE_ID));    
            setTimeout(() => {navigation.goBack()}, 500);
        }
    }
    const handleRedirect = (path) => {
        switch(path){
            case 'batch':
                navigation.navigate('programmes',{headerLabel:'PROGRAMMES', data:'students'})
                break;
            case 'department':
                navigation.navigate('manage_data_2', {headerLabel:'BATCHES', ID:PROGRAMME_ID, label:PROGRAMME_NAME})
                break;
            case 'student':
                navigation.navigate('manage_data_3', {headerLabel:'DEPARTMENTS', PROGRAMME_ID:PROGRAMME_ID, BATCH_ID:openedBatch.id, START_YEAR:openedBatch.startYear, PASSOUT_YEAR:openedBatch.passoutYear, Label:PROGRAMME_NAME})
                break;
            default:
                break;
        }
    }
    const openBatch = (batchId, startYear, passoutYear) => {
        setCurrentView('department');
        setOpenedBatch({id:batchId, startYear:startYear,passoutYear:passoutYear})
        dispatch(LOAD_DEPARTMENTS(PROGRAMME_ID, batchId));
    }
    const openStudents = (departmentId, departmentName) => {
        setCurrentView('student');
        setOpenedDepartment({id:departmentId, shortName:departmentName})
        dispatch(LOAD_STUDENTS(PROGRAMME_ID, openedBatch.id, departmentId));
    }
    const handleContextMenu = (category, status, mode, data) => {
        if(status){
            switch(category){
                case 'exists':
                    let msg;
                    if(ENTRY == 'new'){
                        msg = 'Added as Backlog'
                    }
                    else{
                        msg = 'Added as New'
                    }
                    setNotification({
                        msg1:msg,
                        type:"error",
                        endsIn:2500
                    })
                    setTimeout(() => {setNotification(null)},3000);
                    break;
                case 'batch':
                     if(mode === 'addOnly'){
                        setContextMenu({status:true, mode:'addOnly', category:category})
                        setTempBatch(data);    
                    }
                    if(mode === 'removeOnly'){
                        setContextMenu({status:true, mode:'removeOnly', category:category})
                        setTempBatchRemove(data)
                    }
                    break;

                case 'department':
                     if(mode === 'addOnly'){
                        setContextMenu({status:true, mode:'addOnly', category:category})
                        setTempDepartment(data);    
                    }
                    if(mode === 'removeOnly'){
                        setContextMenu({status:true, mode:'removeOnly', category:category})
                        setTempDepartmentRemove(data)
                    }
                    break;

                case 'student':
                    if(mode === 'addOnly'){
                        setContextMenu({status:true, mode:'addOnly', category:category})
                        setTempStudent(data);    
                    }
                    if(mode === 'removeOnly'){
                        setContextMenu({status:true, mode:'removeOnly', category:category})
                        setTempStudentRemove(data)
                    }
                    break;

                default:
                    break;
            }
        }
        else{
            setContextMenu({status:false, type:null, category:null});
        }
    }
    const handleAdd = () => {
        switch(contextMenu.category){
            case 'batch':
                const exists = addedBatch.find(item => item.data.ID === tempBatch.data.ID);
                if(!exists){
                    if(addedDepartment.length > 0 || addedStudent.length > 0){
                        if(addedDepartment.length > 0){
                            let filteredDepartments = addedDepartment.filter((item) => {return item.data.batchID != tempBatch.data.ID})
                            setAddedDepartment(filteredDepartments);
                        }
                        if(addedStudent.length > 0){
                            let filteredStudents = addedStudent.filter((item) => {return item.data.batchID != tempBatch.data.ID})
                            setAddedStudent(filteredStudents);
                        }
                        addedBatch.push(tempBatch);
                    }
                    else{
                        addedBatch.push(tempBatch)
                    }
                }
                else{
                    setNotification({
                        msg1:`${tempBatch.data.startYear} - ${tempBatch.data.passoutYear} Batch is already added.`,
                        type:"error",
                        endsIn:2500
                    })
                    setTimeout(() => {setNotification(null)},3000);
                }
                break;
            case 'department':
                const parentExist = addedBatch.find(item => item.data.ID == openedBatch.id);
                if(!parentExist){
                    const exists = addedDepartment.find(item => item.data.ID === tempDepartment.data.ID);
                    if(!exists){
                        if(addedStudent.length > 0){
                            let filteredStudents = addedStudent.filter((item) => {return item.data.departmentID != tempDepartment.data.ID})
                            setAddedStudent(filteredStudents);
                            addedDepartment.push(tempDepartment);
                        }
                        else{
                            addedDepartment.push(tempDepartment);
                        }
                    }
                    else{
                        setNotification({
                            msg1:`${tempDepartment.data.shortName} Department is already added.`,
                            type:"error",
                            endsIn:2500
                        })
                        setTimeout(() => {setNotification(null)},3000);
                    }
                }
                else{
                    setNotification({
                        msg1:`${tempDepartment.data.shortName} Department's batch is already added.`,
                        type:"error",
                        endsIn:2500
                    })
                    setTimeout(() => {setNotification(null)},3000);
                }
                break;
            case 'student':
                let parentExist1 = addedBatch.find(item => item.data.ID == openedBatch.id);
                if(!parentExist1){
                    let parentExist2 = addedDepartment.find(item => item.data.ID == openedDepartment.id);
                    if(!parentExist2){
                        const exist = addedStudent.find(item => item.data.ID === tempStudent.data.ID);
                        if(!exist){
                            addedStudent.push(tempStudent)
                        }
                        else{
                            setNotification({
                                msg1:"Student is already added.",
                                type:"error",
                                endsIn:2500
                            })
                            setTimeout(() => {setNotification(null)},3000);
                        }               
                    }
                    else{
                        setNotification({
                            msg1:"Student's department is already added.",
                            type:"error",
                            endsIn:2500
                        })
                        setTimeout(() => {setNotification(null)},3000);
                    }
                }
                else{
                    setNotification({
                        msg1:"Student's batch is already added.",
                        type:"error",
                        endsIn:2500
                    })
                    setTimeout(() => {setNotification(null)},3000);
                }
                break;
            default:
                break;
        }
        handleContextMenu(false);
    };
    const handleRemove = async() => {
        switch(contextMenu.category){
            case 'batch':
                let duplicated = [...addedBatch]
                duplicated.splice(tempBatchRemove,1)
                setAddedBatch(duplicated)
                break;
            case 'department':
                let duplicated1 = [...addedDepartment]
                duplicated1.splice(tempDepartmentRemove,1)
                setAddedDepartment(duplicated1)
                break;
            case 'student':
                let duplicated2 = [...addedStudent]
                duplicated2.splice(tempStudentRemove,1)
                setAddedStudent(duplicated2)
                break;
            default:
                break;
        }
        handleContextMenu(false);
    };
    let DIS;
    if(ENTRY == 'new'){
        DIS = BACKLOG;
    }
    else if(ENTRY == 'backlog'){
        DIS = NEW;
    }
    return(
        <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#FFF'}}>
            <View style={{width:WIDTH,height:'43%',marginBottom:'3%'}}>
                {
                    LOADING && LOADING1?(
                        <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                            <ActivityIndicator size='large' color='#3DCCBE'/>
                        </View>
                    ):(
                        <View style={{paddingTop:HEIGHT*0.1,height:'100%'}}>
                            <View 
                                style={{height:'100%',flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-evenly',marginBottom:'7%'}} 
                                onTouchStart={(evt) => setTouchPoint({x:evt.nativeEvent.pageX, y:evt.nativeEvent.pageY})}
                            >
                            {
                                currentView === 'batch' && BATCHES?
                                BATCHES.length>0?(
                                    <FlatList
                                        contentContainerStyle={{alignItems:'center'}}
                                        numColumns={2}
                                        data={BATCHES}
                                        keyExtractor={item => item.id.toString()}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => {
                                            if(DIS.b && DIS.b.find(x => x.ID == item.id)){
                                                return(
                                                    <TouchableOpacity onLongPress={() => handleContextMenu('batch', true, 'addOnly', {data:{ID:item.id, startYear:item.start_year, passoutYear:item.passout_year}})} onPress={() => openBatch(item.id, item.start_year, item.passout_year)}>
                                                        <View style={{width:WIDTH*0.45,alignItems:'center',paddingTop:'5%'}}>
                                                            <View key={index} style={{borderWidth:1,borderColor:'#00000020',backgroundColor:'#00000010',width:WIDTH*0.3,height:WIDTH*0.22,alignItems:'center',justifyContent:'space-evenly',borderRadius:5,marginBottom:HEIGHT*0.045}}>
                                                                <Text style={{fontSize:WIDTH*0.04}}>{PROGRAMME_NAME}</Text>
                                                                <Text style={{fontSize:WIDTH*0.035}}>{item.start_year} - {item.passout_year}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
        
                                                )
                                            }
                                            else{
                                                return(
                                                    <TouchableOpacity onLongPress={() => handleContextMenu('batch', true, 'addOnly', {data:{ID:item.id, startYear:item.start_year, passoutYear:item.passout_year}})} onPress={() => openBatch(item.id, item.start_year, item.passout_year)}>
                                                        <View style={{width:WIDTH*0.45,alignItems:'center',paddingTop:'5%'}}>
                                                            <View key={index} style={{borderWidth:1,borderColor:'#3DCBBE', width:WIDTH*0.3,height:WIDTH*0.22,alignItems:'center',justifyContent:'space-evenly',borderRadius:5,marginBottom:HEIGHT*0.045}}>
                                                                <Text style={{fontSize:WIDTH*0.04}}>{PROGRAMME_NAME}</Text>
                                                                <Text style={{fontSize:WIDTH*0.035}}>{item.start_year} - {item.passout_year}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
        
                                                )
                                            }
                                        }}
                                    />
                                )
                                :(
                                    <View style={{height:'60%',alignItems:'center',justifyContent:'flex-end'}}>
                                        <Text style={{fontSize:WIDTH*0.05,color:'red',marginBottom:'3%',textAlign:'center'}}>Oops! No batch were found in</Text>
                                        <Text style={{fontSize:WIDTH*0.05,color:'red',marginBottom:'10%',textAlign:'center'}}>{PROGRAMME_NAME} Programme.</Text>
                                        <TouchableOpacity onPress={() => handleRedirect('batch')}><Text style={{fontSize:WIDTH*0.044,color:'#49C1BF',fontWeight:'600',letterSpacing:1}}>ADD NOW</Text></TouchableOpacity>
                                    </View>
                                )
                                :null
                            }
                            {
                                currentView === 'department' && DEPARTMENTS?
                                DEPARTMENTS.length>0?(
                                    <FlatList
                                        contentContainerStyle={{alignItems:'center'}}
                                        numColumns={2}
                                        data={DEPARTMENTS}
                                        keyExtractor={item => item.id.toString()}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => {
                                            if(DIS.d && DIS.d.find(x => x.ID == item.id)){
                                                return(
                                                    <TouchableOpacity onLongPress={() => handleContextMenu('department', true, 'addOnly', {data:{ID:item.id, batchID:openedBatch.id, shortName:item.short_name, startYear:openedBatch.startYear, passoutYear:openedBatch.passoutYear}})} onPress={() => openStudents(item.id, item.short_name)}>
                                                        <View style={{width:WIDTH*0.45,alignItems:'center',paddingTop:'5%'}}>
                                                            <View key={index} style={{borderWidth:1,borderColor:'#00000020',backgroundColor:'#00000010', width:WIDTH*0.3,height:WIDTH*0.22,alignItems:'center',justifyContent:'space-evenly',borderRadius:5,marginBottom:HEIGHT*0.045}}>
                                                                <Text style={{fontSize:WIDTH*0.04}}>{item.short_name}</Text>
                                                                <Text style={{fontSize:WIDTH*0.035}}>{openedBatch?openedBatch.startYear:''} - {openedBatch?openedBatch.passoutYear:''}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                            else{
                                                return(
                                                    <TouchableOpacity onLongPress={() => handleContextMenu('department', true, 'addOnly', {data:{ID:item.id, batchID:openedBatch.id, shortName:item.short_name, startYear:openedBatch.startYear, passoutYear:openedBatch.passoutYear}})} onPress={() => openStudents(item.id, item.short_name)}>
                                                        <View style={{width:WIDTH*0.45,alignItems:'center',paddingTop:'5%'}}>
                                                            <View key={index} style={{borderWidth:1,borderColor:'#3DCBBE', width:WIDTH*0.3,height:WIDTH*0.22,alignItems:'center',justifyContent:'space-evenly',borderRadius:5,marginBottom:HEIGHT*0.045}}>
                                                                <Text style={{fontSize:WIDTH*0.04}}>{item.short_name}</Text>
                                                                <Text style={{fontSize:WIDTH*0.035}}>{openedBatch?openedBatch.startYear:''} - {openedBatch?openedBatch.passoutYear:''}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        }}
                                    />
                                )
                                :(
                                    <View style={{height:'80%',alignItems:'center',justifyContent:'flex-end'}}>
                                        <Text style={{fontSize:WIDTH*0.05,color:'red',marginBottom:'3%'}}>Oops! No departments were found in</Text>
                                        <Text style={{fontSize:WIDTH*0.05,color:'red',marginBottom:'10%'}}>Batch {openedBatch.startYear} - {openedBatch.passoutYear}</Text>
                                        <TouchableOpacity onPress={() => handleRedirect('department')}><Text style={{fontSize:WIDTH*0.044,color:'#49C1BF',fontWeight:'600',letterSpacing:1}}>ADD NOW</Text></TouchableOpacity>
                                    </View>
                                )
                                :null
                            }
                            {
                                currentView === 'student' && STUDENTS?
                                STUDENTS.length>0?(
                                    <FlatList
                                        contentContainerStyle={{alignItems:'center'}}
                                        data={STUDENTS}
                                        keyExtractor={item => item.id.toString()}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => {
                                            if(DIS.s && DIS.s.find(x => x.ID == item.id)){
                                                return(
                                                    <TouchableOpacity onLongPress={() => handleContextMenu('exists', true, 'exists', {data:{ID:item.id,batchID:openedBatch.id,departmentID:openedDepartment.id, fullName:item.full_name, roll:item.roll, department:openedDepartment.shortName, startYear:openedBatch.startYear, passoutYear:openedBatch.passoutYear}})}>
                                                    <View key={index} style={{flexDirection:'row',borderWidth:1,borderColor:'#00000020', width:WIDTH*0.9,height:WIDTH*0.11,alignItems:'center',borderRadius:5,marginBottom:HEIGHT*0.02,backgroundColor:'#00000007'}}>
                                                        <View style={{width:'43%',justifyContent:'center',paddingLeft:'3%',height:'100%'}}>
                                                            <Text style={{fontSize:WIDTH*0.04,paddingRight:'5%',opacity:0.5}}>{namePrinter(item.full_name)}</Text>
                                                        </View>
                                                        <Text style={{fontSize:WIDTH*0.035,paddingRight:'5%',opacity:0.5}}>{item.roll}</Text>
                                                        <Text style={{fontSize:WIDTH*0.035,paddingRight:'5%',opacity:0.5}}>{openedDepartment.shortName}</Text>
                                                        <Text style={{fontSize:WIDTH*0.035,opacity:0.5}}>{openedBatch.startYear} - {openedBatch.passoutYear}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                )
                                            }
                                            else{
                                                return(
                                                    <TouchableOpacity onLongPress={() => handleContextMenu('student', true, 'addOnly', {data:{ID:item.id,batchID:openedBatch.id,departmentID:openedDepartment.id, fullName:item.full_name, roll:item.roll, department:openedDepartment.shortName, startYear:openedBatch.startYear, passoutYear:openedBatch.passoutYear}})}>
                                                    <View key={index} style={{flexDirection:'row',borderWidth:1,borderColor:'#3DCBBE', width:WIDTH*0.9,height:WIDTH*0.11,alignItems:'center',borderRadius:5,marginBottom:HEIGHT*0.02}}>
                                                        <View style={{width:'43%',justifyContent:'center',paddingLeft:'3%',height:'100%'}}>
                                                            <Text style={{fontSize:WIDTH*0.04,paddingRight:'5%'}}>{namePrinter(item.full_name)}</Text>
                                                        </View>
                                                        <Text style={{fontSize:WIDTH*0.035,paddingRight:'5%'}}>{item.roll}</Text>
                                                        <Text style={{fontSize:WIDTH*0.035,paddingRight:'5%'}}>{openedDepartment.shortName}</Text>
                                                        <Text style={{fontSize:WIDTH*0.035}}>{openedBatch.startYear} - {openedBatch.passoutYear}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                )
                                            }
                                        }}
                                    />
                                )
                                :(
                                    <View style={{height:'80%',alignItems:'center',justifyContent:'flex-end'}}>
                                        <Text style={{fontSize:WIDTH*0.05,color:'red',marginBottom:'3%'}}>Oops! No Students were found in</Text>
                                        <Text style={{fontSize:WIDTH*0.05,color:'red',marginBottom:'10%'}}>{openedDepartment.shortName} Department </Text>
                                        <TouchableOpacity onPress={() => handleRedirect('student')}><Text style={{fontSize:WIDTH*0.044,color:'#49C1BF',fontWeight:'600',letterSpacing:1}}>ADD NOW</Text></TouchableOpacity>
                                    </View>
                                )
                                :null
                            }
                        </View>
                    </View>
                    )
                }

            </View>
            <View style={{alignItems:'center',justifyContent:'center',height:'45%',alignItems:'center',justifyContent:'center'}} onTouchStart={(evt) => setTouchPoint1({x:evt.nativeEvent.pageX, y:evt.nativeEvent.pageY})}>
            {
                addedBatch.length<1 && addedDepartment.length<1 && addedStudent.length<1
                ?(
                    <View style={{width:'100%',height:'100%',alignItems:'center',paddingHorizontal:'8%',justifyContent:'center'}}>
                        <Text style={{textAlign:'center',lineHeight:35,fontSize:WIDTH*0.05,color:'#3D90CC', letterSpacing:1}}>Hold a Student, Department</Text>
                        <Text style={{textAlign:'center',lineHeight:35,fontSize:WIDTH*0.05,color:'#3D90CC', letterSpacing:1}}>or a whole batch to add to</Text>
                        <Text style={{textAlign:'center',lineHeight:35,fontSize:WIDTH*0.05,color:'#3D90CC', letterSpacing:1}}>the course {COURSE_CODE}</Text>
                    </View>
                )
                :(
                    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#3DCBBE09',width:'95%',height:'90%',borderWidth:1,borderColor:'#3DCBBE',borderStyle:'dotted',borderRadius:8,paddingHorizontal:'3%',paddingVertical:'6%',marginTop:'2%'}}>
                        <View style={{justifyContent:'space-evenly',width:'100%',height:'100%',flexDirection:'row',flexWrap:'wrap',marginBottom:'5%'}}>
                            {
                                addedBatch.map((item,index) => (
                                    <TouchableOpacity key={index} onLongPress={() => handleContextMenu('batch', true, 'removeOnly', index)}>
                                    <View style={{borderWidth:1,borderColor:'#3DCBBE', width:WIDTH*0.3,height:WIDTH*0.22,alignItems:'center',justifyContent:'space-evenly',borderRadius:5,marginBottom:HEIGHT*0.04}}>
                                        <Text style={{fontSize:WIDTH*0.04}}>{PROGRAMME_NAME}</Text>
                                        <Text style={{fontSize:WIDTH*0.035}}>{item.data.startYear} - {item.data.passoutYear}</Text>
                                    </View>
                                    </TouchableOpacity>
                                ))
                            }
                            {
                                addedDepartment.map((item,index) => (
                                    <TouchableOpacity key={index} onLongPress={() => handleContextMenu('department', true, 'removeOnly', index)}>
                                    <View style={{borderWidth:1,borderColor:'#3DCBBE', width:WIDTH*0.3,height:WIDTH*0.22,alignItems:'center',justifyContent:'space-evenly',borderRadius:5,marginBottom:HEIGHT*0.04}}>
                                        <Text style={{fontSize:WIDTH*0.04}}>{item.data.shortName}</Text>
                                        <Text style={{fontSize:WIDTH*0.035}}>{item.data.startYear} - {item.data.passoutYear}</Text>
                                    </View>
                                    </TouchableOpacity>
                                ))
                            }
                            {
                                addedStudent.map((item,index) => (
                                    <TouchableOpacity key={index} onLongPress={() => handleContextMenu('student', true, 'removeOnly', index)}>
                                    <View style={{flexDirection:'row',justifyContent:'center',borderWidth:1,borderColor:'#3DCBBE', width:WIDTH*0.88,height:WIDTH*0.11,alignItems:'center',borderRadius:5,marginBottom:HEIGHT*0.02}}>
                                        <View style={{width:'42%',justifyContent:'center',paddingLeft:'3%',height:'100%'}}>
                                            <Text style={{fontSize:WIDTH*0.04,paddingRight:'3%'}}>{namePrinter(item.data.fullName)}</Text>
                                        </View>
                                        <Text style={{fontSize:WIDTH*0.035,paddingRight:'5%'}}>{item.data.roll}</Text>
                                        <Text style={{fontSize:WIDTH*0.035,paddingRight:'5%'}}>{item.data.department}</Text>
                                        <Text style={{fontSize:WIDTH*0.035}}>{item.data.startYear} - {item.data.passoutYear}</Text>
                                    </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </ScrollView>
                )
            }
            </View>
            <View style={{height:'9%',zIndex:1,position:'absolute',width:WIDTH,bottom:'2%',justifyContent:'flex-end'}}>
                <CustomButtonFilled label="SAVE" click={handleSave}/>
            </View>

            {
                notification?(
                    <NotifierBar msg1={notification.msg1} type={notification.type} endsIn={notification.endsIn}/>
                ):null
            }
            {
                contextMenu.status
                ?(
                    <>
                    <ContextMenu touchPoint={contextMenu.mode === 'addOnly'?touchPoint:touchPoint1} editHandler={handleAdd} deleteHandler={handleRemove} mode={contextMenu.mode}/>
                    <TouchableOpacity onPress={() => handleContextMenu(false)} style={{zIndex:2,position:'absolute',height:HEIGHT,width:WIDTH,left:0,top:0}}></TouchableOpacity>
                    </>
                )
                :null
            }
        </View>
    )
}

export default RegisterCourseStudents;