import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Image,
    StatusBar,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import DepartmentCard from '@components/DepartmentCard.component';
import { CustomButtonFilled } from '@components/CustomButton.component';
import CustomTextInput from '@components/CustomTextInput.component';
import BottomSheetForm from '@components/BottomSheetForm.component';
import BottomSheetEditor from '@components/BottomSheetEditor.component';
import ContextMenu from '@components/ContextMenu.component';
import bulk3 from '@assets/bulk3.png';
import NoData from '@assets/ND.png'

import { SAVE_HANDLER_DEPARTMENT, UPDATE_HANDLER_DEPARTMENT } from '@helpers/DataFunctions.js';
import { LOAD_DEPARTMENTS, setSelectedProgramme, DELETE_DEPARTMENT, UPDATE_PROGRAMME } from '@actions/dbAction';


import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;




const Department = ({navigation, route}) => {
    const PROGRAMME_ID = route.params.PROGRAMME_ID; 
    const BATCH_ID = route.params.BATCH_ID; 
    const START_YEAR = route.params.START_YEAR;
    const PASSOUT_YEAR = route.params.PASSOUT_YEAR;
    const SHORT_NAME = route.params.Label;

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const [show, setShow] = useState(false);
    const [entry, setEntry] = useState(null);
    const [contextMenu, setContextMenu] = useState(false);
    const [edit, setEdit] = useState(null);
    const [departmentID, setDepartmentID] = useState(null);
    const [index, setIndex] = useState(null);
    const [top, setTop] = useState(290);
    const [touchPoint, setTouchPoint] = useState(null);


    const [dpShortName, setDpShortName] = useState(null);
    const [dpFullName, setDpFullName] = useState(null);
    const [empty, setEmpty] = useState([{status:0, msg:''}, {status:0, msg:''}])

    const DEPARTMENTS = useSelector((state) => state.dbReducer.departments);
    const IsDrawerOpen = useIsDrawerOpen();

    const [bgColor, setBgColor] = useState('#FFFFFF');

    useEffect(() => {
        if(IsDrawerOpen){
            setBgColor('#54dbd5');
        }
        else{
            setBgColor('#FFFFFF');
        }
    },[IsDrawerOpen])


    useEffect(() => {
        dispatch(LOAD_DEPARTMENTS(PROGRAMME_ID, BATCH_ID));
    },[isFocused])

    const handleSwitch = (tabIndex) => {
        setActiveTab(tabIndex);
    }

    const handlePress = (DEPARTMENT_ID) => {
        navigation.push('manage_data_4', {headerLabel:'STUDENTS', PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID, SHORT_NAME })
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
        const result = await SAVE_HANDLER_DEPARTMENT( dpShortName, dpFullName, DEPARTMENTS, empty, BATCH_ID, PROGRAMME_ID );
        if(result === 'SAVED'){
            dispatch(LOAD_DEPARTMENTS(PROGRAMME_ID, BATCH_ID));
            closeModal();
        }
        else if(result && result.error){
            setEmpty(result.error);
        }
    }

    const handleContinue = () => {
        navigation.push('upload_file', {headerLabel:'BULK ENTRY', category:'department', PROGRAMME_ID:PROGRAMME_ID, BATCH_ID:BATCH_ID, START_YEAR:START_YEAR, PASSOUT_YEAR:PASSOUT_YEAR, SHORT_NAME:SHORT_NAME})
        closeModal();
    }

    const handleChange = (name, input) => {
        let empty1 = [...empty];
        switch(name){
            case "dpShortName":
                setDpShortName(input);
                if(input.length < 1){
                    empty1[0] = {status:1, msg:'Short Name is required'}
                }
                break;
            case "dpFullName":
                setDpFullName(input);
                if(input.length < 1){
                    empty1[1] = {status:1, msg:'Full Name is required'}
                }
                break;
            default:
                return;
        }
        setEmpty(empty1);
    }
    useEffect(() => {
        let empty1 = [...empty];
        if(dpShortName){
            if(dpShortName.length > 0){
                empty1[0] = {status:0, msg:''}
            }
        }
        if(dpFullName){
            if(dpFullName.length > 0){
                empty1[1] = {status:0, msg:''}
            }
        }
        setEmpty(empty1);        
    },[dpShortName, dpFullName])

    const handleContextMenu = (status, ID, index) => {
        if(status){
            setDepartmentID(ID);
            setIndex(index);
        }
        setContextMenu(status);
    }

    const handleEdit = () => {
        setDpShortName(DEPARTMENTS[index].short_name);
        setDpFullName(DEPARTMENTS[index].full_name);
        setEdit(departmentID)
        handleContextMenu(false);
    };
    const handleDelete = () => {
        dispatch(DELETE_DEPARTMENT(departmentID))
        dispatch(LOAD_DEPARTMENTS(PROGRAMME_ID, BATCH_ID));
        handleContextMenu(false);
    };

    const handleUpdate = async() => {
        const result = await UPDATE_HANDLER_DEPARTMENT( dpShortName, dpFullName, DEPARTMENTS, empty, departmentID, BATCH_ID, PROGRAMME_ID, index );
        if(result && result.edited === 'no'){
            setEdit(null);
        }
        if(result && result.error){
            setEmpty(result.error);
        }
        if(result && result.updated){
            dispatch(LOAD_DEPARTMENTS(PROGRAMME_ID, BATCH_ID));
            setEdit(null);
        }
    }



    return(
        <>
        <StatusBar backgroundColor={ show === true ?'#AAA' :bgColor}/>
        <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#FFF',paddingTop:HEIGHT*0.1}}>
            {
                show === true
                ? <BottomSheetForm label="New Department" image={bulk3} closeModal={closeModal} setEntry={handleEntry} handleContinue={handleContinue} handleSave={handleSave}>
                    <CustomTextInput name="dpShortName" placeholder="Department Short Name" handleChange={handleChange} empty={empty[0]} capitalize="characters"/>
                    <CustomTextInput name="dpFullName" placeholder="Department Full Name" handleChange={handleChange} empty={empty[1]} capitalize="words"/>
                </BottomSheetForm>
                : null
            }
            <View style={{height:'89%',marginTop:HEIGHT*0.01,flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',alignItems:'center',paddingTop:'13%',width:WIDTH}} onTouchStart={(evt) => setTouchPoint({x:evt.nativeEvent.pageX, y:evt.nativeEvent.pageY})}>
                {
                    DEPARTMENTS && DEPARTMENTS.length > 0?(
                        <FlatList
                            contentContainerStyle={{alignItems:'center'}}
                            numColumns={2}                
                            data={DEPARTMENTS}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <DepartmentCard 
                                    styles={{marginBottom: index === DEPARTMENTS.length - 1 ? HEIGHT*0.03 : HEIGHT*0.1 }}
                                    // click={() => handlePress(item.id, item.start_year, item.passout_year)} 
                                    click={() => handlePress(item.id)} ContextMenu={handleContextMenu}
                                    ID={item.id} index={index} departmentName={item.short_name} classes="0" startYear={START_YEAR} passoutYear={PASSOUT_YEAR} 
                                />
                            )}
                        />
                    )
                    :(
                        <View style={{height:'90%',width:WIDTH,alignItems:'center',zIndex:-1,paddingTop:'15%'}}>
                            <Image source={NoData} style={{width:'100%',height:'65%'}} resizeMode='stretch'/>
                            <Text style={{fontSize:WIDTH*0.05,marginTop:'5%'}}>Oops! No Departments were Found</Text>
                        </View>
                    )
                }
            </View>  
            <View style={{height:'10%',position:'absolute',width:WIDTH,bottom:'3%',justifyContent:'center'}}>
                <CustomButtonFilled label="NEW DEPARTMENT" click={handleNewProgramme}/>
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
            ?(
                <BottomSheetEditor label="Edit Programme" closeModal={() => setEdit(null)} handleSave={handleUpdate}>
                    <CustomTextInput value={dpShortName} name="dpShortName" placeholder="Department Short Name" handleChange={handleChange} empty={empty[0]} capitalize="characters" />
                    <CustomTextInput value={dpFullName} name="dpFullName" placeholder="Department Full Name" handleChange={handleChange} empty={empty[1]} capitalize="words" />
                </BottomSheetEditor>
            )
            :null
        }
        </>
    )
}

export default Department;