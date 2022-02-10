import React, { useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import ProgrammeCard from '@components/ProgrammeCard.component';
import { CustomButtonFilled } from '@components/CustomButton.component';
import BottomSheetForm from '@components/BottomSheetForm.component';
import BottomSheetEditor from '@components/BottomSheetEditor.component';
import CustomTextInput from '@components/CustomTextInput.component';
import { LOAD_PROGRAMMES, setSelectedProgramme, DELETE_PROGRAMME, UPDATE_PROGRAMME } from '@actions/dbAction';
import bulk1 from '@assets/bulk1.png';
import ContextMenu from '@components/ContextMenu.component';
import { GET_PROGRAM_COURSE, SAVE_HANDLER_PG, UPDATE_HANDLER_PG } from '@helpers/DataFunctions.js';
import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';
import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Programme = ({ navigation, route }) => {

    const DATA = route.params.data; 

    const [show, setShow] = useState(false);
    const [contextMenu, setContextMenu] = useState(false);
    const [entry, setEntry] = useState(null);
    const [edit, setEdit] = useState(null);
    const [index, setIndex] = useState(null);
    const [programmeID, setProgrammeID] = useState(null);
    const [pgShortName, setPgShortName] = useState(null);
    const [pgFullName, setPgFullName] = useState(null);
    const [empty, setEmpty] = useState([{status:0, msg:''}, {status:0, msg:''}])
    const [touchPoint, setTouchPoint] = useState(null);
    const [counts, setCounts] = useState(null);
    const isFocused = useIsFocused();

    const dispatch = useDispatch();

    const ALL_PROGRAMMES = useSelector((state) => state.dbReducer.all_programmes);

    const category = 'programme';


    useEffect(() => {
        dispatch(LOAD_PROGRAMMES());
        get_ALL_CLASSES();
        // Markem_NavBarColor.setBackgroundColor('#FFFFFF')
    },[isFocused])


    useEffect(() => {
        let empty1 = [...empty];
        if(pgShortName){
            if(pgShortName.length > 0){
                empty1[0] = {status:0, msg:''}
            }
        }
        if(pgFullName){
            if(pgFullName.length > 0){
                empty1[1] = {status:0, msg:''}
            }
        }
        setEmpty(empty1);        
    },[pgShortName, pgFullName])

    const handlePress = (id,short_name) => {
        if(!contextMenu){
            if(DATA === 'courses'){
                navigation.navigate('courses', {headerLabel:'CLASSES', ID:id, label:short_name});
            }
            else{
                navigation.push('manage_data_2', {headerLabel:short_name, ID:id, label:short_name})
                // dispatch(setSelectedProgramme(id))
            }
        }
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
        const result = await SAVE_HANDLER_PG( pgShortName, pgFullName, ALL_PROGRAMMES, empty );
        if(result === 'SAVED'){
            dispatch(LOAD_PROGRAMMES());
            closeModal();
        }
        else{
            setEmpty(result);
        }
    }
    const handleUpdate = async() => {
        const result = await UPDATE_HANDLER_PG( pgShortName, pgFullName, ALL_PROGRAMMES, empty, edit, index );
        if(result && result.edited === 'no'){
            setEdit(null);
        }
        if(result && result.error){
            setEmpty(result.error);
        }
        if(result && result.updated){
            dispatch(LOAD_PROGRAMMES());
            setEdit(null);
        }
    }
    const handleContinue = () => {
        navigation.push('upload_file', {headerLabel:'BULK ENTRY', category:category})
        closeModal();
    }

    const handleChange = (name, input) => {
        let empty1 = [...empty];
        switch(name){
            case "pgShortName":
                setPgShortName(input);
                if(input.length < 1){
                    empty1[0] = {status:1, msg:'Short Namewa is required'}
                }
                break;
            case "pgFullName":
                setPgFullName(input);
                if(input.length < 1){
                    empty1[1] = {status:1, msg:'Full Namewa is required'}
                }
                break;
            default:
                return;
        }
        setEmpty(empty1);
    }

    const handleContextMenu = (status, index, ID) => {
        if(status){
            setProgrammeID(ID);
            setIndex(index);
        }
        setContextMenu(status);
    }
    const handleEdit = () => {
        setPgShortName(ALL_PROGRAMMES[index].short_name);
        setPgFullName(ALL_PROGRAMMES[index].full_name);
        setEdit(programmeID);
        handleContextMenu(false);
    };
    const handleDelete = async() => {
        dispatch(DELETE_PROGRAMME(programmeID));
        dispatch(LOAD_PROGRAMMES());
        handleContextMenu(false);
    };

    const get_ALL_CLASSES = async() => {
        let x  = await GET_PROGRAM_COURSE();
        setCounts(x);
    }

    return(
        <>
        {/* <StatusBar backgroundColor='#FFF' barStyle='dark-content'/> */}
        <View style={{height:HEIGHT,width:WIDTH,backgroundColor:'#FFF'}}>
            {
                show
                ? 
                <BottomSheetForm label="New Programme" image={bulk1} closeModal={closeModal} setEntry={handleEntry} handleContinue={handleContinue} handleSave={handleSave} >
                    <CustomTextInput name="pgShortName" placeholder="Programme Short Name" handleChange={handleChange} empty={empty[0]} capitalize="words" />
                    <CustomTextInput name="pgFullName" placeholder="Programme Full Name" handleChange={handleChange} empty={empty[1]} capitalize="words" />
                </BottomSheetForm>
                : null
            }
            {
                edit
                ?(
                    <BottomSheetEditor label="Edit Programme" closeModal={() => setEdit(null)} handleSave={handleUpdate}>
                        <CustomTextInput value={ALL_PROGRAMMES[index].short_name} name="pgShortName" placeholder="Programme Short Name" handleChange={handleChange} empty={empty[0]} capitalize="words" />
                        <CustomTextInput value={ALL_PROGRAMMES[index].full_name} name="pgFullName" placeholder="Programme Short Name" handleChange={handleChange} empty={empty[1]} capitalize="words" />
                    </BottomSheetEditor>
                )
                :null
            }
            {
                contextMenu
                ?(
                    <>
                    <ContextMenu touchPoint={touchPoint} editHandler={handleEdit} deleteHandler={() => handleDelete()}/>
                    <TouchableOpacity onPress={() => handleContextMenu(false)} style={{zIndex:2,position:'absolute',height:HEIGHT,width:WIDTH,left:0,top:0}}></TouchableOpacity>
                    </>
                )
                :null
            }
            <View style={{height:'88%',marginTop:HEIGHT*0.1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',paddingTop:'15%'}} onTouchStart={(evt) => setTouchPoint({x:evt.nativeEvent.pageX, y:evt.nativeEvent.pageY})}>
                <FlatList
                    // contentContainerStyle={{alignItems:'center'}}
                    // numColumns={2}
                    data={ALL_PROGRAMMES}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <ProgrammeCard 
                            // styles={{marginBottom: index === ALL_PROGRAMMES.length - 1 ? HEIGHT*0.05 : HEIGHT*0.1}}
                            index={index} id={item.id} programmeName={item.short_name} classes={counts?counts[index]:0} click={() => handlePress(item.id, item.short_name)}
                            // index={index} id={item.id} programmeName={item.short_name} classes={counts?counts[index]:0} click={() => handlePress(item.id, item.short_name)} ContextMenu={handleContextMenu}  edit={handleEdit} deletePg={handleDelete}
                        />
                    )}
                />
            </View> 
            {/* <View style={{height:'15%',justifyContent:'center'}}>
                <CustomButtonFilled label="NEW PROGRAMME" click={handleNewProgramme}/>
            </View> */}
        </View>
        </>
    )
}

export default Programme;