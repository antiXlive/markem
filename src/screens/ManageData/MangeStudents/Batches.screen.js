import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    StatusBar,
    StyleSheet
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import BatchCard from '@components/BatchCard.component';
import {TopTabBar} from '@components/TopTabBar.component';
import CustomTextInput from '@components/CustomTextInput.component';
import { CustomButtonFilled } from '@components/CustomButton.component';
import BottomSheetForm from '@components/BottomSheetForm.component';
import BottomSheetEditor from '@components/BottomSheetEditor.component';
import ContextMenu from '@components/ContextMenu.component';
import NoData from '@assets/ND.png'

import { SAVE_HANDLER_BT, UPDATE_HANDLER_BT, GET_BATCH_DEPARTMENTS, GET_BATCH_STUDENTS } from '@helpers/DataFunctions.js';
import { LOAD_BATCHES, setSelectedProgramme, DELETE_BATCH, UPDATE_PROGRAMME } from '@actions/dbAction';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// import bulk2 from '@assets/bulk2.png';
import bulk1 from '@assets/bulk1.png';

import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;




const Batch = ({navigation, route}) => {

    const PROGRAMME_ID = route.params.ID; 
    const Label = route.params.label; 

    const [activeTab, setActiveTab] = useState(0);
    const [show, setShow] = useState(false);
    const [entry, setEntry] = useState(null);
    const [contextMenu, setContextMenu] = useState(false);
    const [top, setTop] = useState();
    const [batchID, setBatchID] = useState(null);
    const [index, setIndex] = useState(null);
    const [edit, setEdit] = useState(null);
    const [touchPoint, setTouchPoint] = useState(null);
    const [dCount, setDCount] = useState();
    const [sCount, setSCount] = useState();



    const [startYear, setStartYear] = useState(null);
    const [passoutYear, setPassoutYear] = useState(null);
    const [empty, setEmpty] = useState([{status:0, msg:''}, {status:0, msg:''}])

    const BATCHES = useSelector((state) => state.dbReducer.batches);
    if(BATCHES){
        BATCHES.sort(function(a,b){
            return  b.start_year - a.start_year;
        })
    }

    const dispatch = useDispatch();
    const IsDrawerOpen = useIsDrawerOpen();
    const isFocused = useIsFocused();

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
        dispatch(LOAD_BATCHES(PROGRAMME_ID));
        getAllCourses();
    },[isFocused]);

    const tabs = ['Active', 'Passouts']

    const handlePress = (BATCH_ID, START_YEAR, PASSOUT_YEAR) => {
        if(contextMenu){
            return;
        }
        else{
            navigation.navigate('manage_data_3', {headerLabel:Label, PROGRAMME_ID:PROGRAMME_ID, BATCH_ID, START_YEAR, PASSOUT_YEAR, Label})
        }
    }
    const handleSwitch = (tabIndex) => {
        setActiveTab(tabIndex);
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
        const result = await SAVE_HANDLER_BT( PROGRAMME_ID, startYear, passoutYear, BATCHES, empty );
        console.log(result);
        if(result === 'SAVED'){
            dispatch(LOAD_BATCHES(PROGRAMME_ID));
            closeModal();
        }
        else if(result && result.error){
            setEmpty(result.error);
        }
    }

    const handleContinue = () => {
        navigation.push('upload_file', {headerLabel:'BULK ENTRY', category:'batch', PROGRAMME_ID:PROGRAMME_ID, PROGRAMME_NAME:Label})
        closeModal();
    }

    const handleChange = (name, input) => {
        let empty1 = [...empty];
        switch(name){
            case "startYear":
                setStartYear(input);
                if(input.length < 1){
                    empty1[0] = {status:1, msg:'Start Year is required'}
                }
                break;
            case "passoutYear":
                setPassoutYear(input);
                if(input.length < 1){
                    empty1[1] = {status:1, msg:'Passout Year is required'}
                }
                break;
            default:
                return;
        }
        setEmpty(empty1);
    }
    useEffect(() => {
        let empty1 = [...empty];
        if(startYear){
            if(startYear.length > 0){
                empty1[0] = {status:0, msg:''}
            }
        }
        if(passoutYear){
            if(passoutYear.length > 0){
                empty1[1] = {status:0, msg:''}
            }
        }
        setEmpty(empty1);        
    },[startYear, passoutYear])

    const handleContextMenu = (status, ID, index) => {
        if(status){
            setBatchID(ID);
            setIndex(index);
        }
        setContextMenu(status);
    }

    const handleUpdate = async() => {
        const result = await UPDATE_HANDLER_BT( startYear, passoutYear, BATCHES, empty, batchID, index, PROGRAMME_ID );
        if(result && result.edited === 'no'){
            setEdit(null);
        }
        if(result && result.error){
            setEmpty(result.error);
        }
        if(result && result.updated){
            dispatch(LOAD_BATCHES(ID));
            setEdit(null);
        }
    }

    const handleEdit = () => {
        setStartYear(BATCHES[index].start_year);
        setPassoutYear(BATCHES[index].passout_year);
        setEdit(batchID)
        handleContextMenu(false);
    };
    const handleDelete = () => {
        dispatch(DELETE_BATCH(batchID))
        dispatch(LOAD_BATCHES(PROGRAMME_ID));
        handleContextMenu(false);
    };

    const getAllCourses = async() => {
        let count = await GET_BATCH_DEPARTMENTS(PROGRAMME_ID);
        let count1 = await GET_BATCH_STUDENTS(PROGRAMME_ID);
        setDCount(count);
        setSCount(count1);
    }


    return(
        <>
        {/* <StatusBar backgroundColor={ show === true ?'#AAA' :bgColor}/> */}
        <View style={{height:HEIGHT,width:WIDTH,backgroundColor:'#FFF',paddingTop:HEIGHT*0.09}}>
            {
                show === true
                ? <BottomSheetForm label="New Batch" image={bulk1} closeModal={closeModal} setEntry={handleEntry} handleContinue={handleContinue} handleSave={handleSave} >
                    <CustomTextInput name="startYear" placeholder="Start Year" handleChange={handleChange} empty={empty[0]} type="number-pad" length={4} />
                    <CustomTextInput name="passoutYear" placeholder="Passout Year" handleChange={handleChange} empty={empty[1]} type="number-pad" length={4} />
                </BottomSheetForm>
                : null
            }
            {/* <View>
                <TopTabBar tabs={tabs} click={handleSwitch} top='16%' />
            </View> */}
            <View style={{marginTop:HEIGHT*0.05,height:'83%'}} onTouchStart={(evt) => setTouchPoint({x:evt.nativeEvent.pageX, y:evt.nativeEvent.pageY})}>
                {
                    BATCHES && BATCHES.length > 0?(
                        <FlatList
                            data={BATCHES}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <BatchCard 
                                    styles={{marginBottom: index === BATCHES.length - 1 ? HEIGHT*0.03 : HEIGHT*0.05, zIndex:10 }}
                                    click={() => handlePress(item.id, item.start_year, item.passout_year)} ContextMenu={handleContextMenu}
                                    ID={item.id} index={index} programmeName={Label} classes="0" 
                                    departments={dCount?dCount[index]:0} students={sCount?sCount[index]:0}
                                    startYear={item.start_year} passoutYear={item.passout_year} 
                                    opacity={contextMenu?1:0.5}
                                />
                            )}
                        />
                    )
                    :(
                        <View style={{height:'90%',alignItems:'center',zIndex:-1,paddingTop:'15%'}}>
                            <Image source={NoData} style={{width:'100%',height:'65%'}} resizeMode='stretch'/>
                            <Text style={{fontSize:WIDTH*0.05,marginTop:'5%'}}>Oops! No Data Found</Text>
                        </View>
                    )
                }
            </View>
            <View style={{height:'10%',position:'absolute',width:WIDTH,bottom:'3%',justifyContent:'center'}}>
                <CustomButtonFilled label="NEW BATCH" click={handleNewProgramme}/>
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
                    <CustomTextInput value={startYear} name="startYear" placeholder="Batch Start Year" handleChange={handleChange} empty={empty[0]} type="number-pad" length={4} />
                    <CustomTextInput value={passoutYear} name="passoutYear" placeholder="Batch Passout Year" handleChange={handleChange} empty={empty[1]} type="number-pad" length={4} />
                </BottomSheetEditor>
            )
            :null
        }
        </View>
        
    </>
    )
}

export default Batch;