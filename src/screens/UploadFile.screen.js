import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import * as mime from 'react-native-mime-types';
import * as RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import excel_logo from '@assets/excel_logo.png';
import BottomSheetEditor from '@components/BottomSheetEditor.component';
import CustomTextInput from '@components/CustomTextInput.component';
import NotifierBar from '@components/NotifierBar.component';
import { CustomButtonFilled } from '@components/CustomButton.component';
import SwipeableBar from '@components/SwipeableBar.component';
import Skelton from '@components/Skelton.component';
import { validateFileExtension, validateFileData, filterExistingData,verifySingleBatch_BULK,verifySingleDepartment_BULK,verifySingleStudent_BULK } from '@helpers/functions.js';
// import { verifySingleProgramme, verifySingleBatch, , verifySingleCourse, verifySingleStudent } from '@helpers/functions.js';
import { SAVE_HANDLER_BT, SAVE_HANDLER_DEPARTMENT, SAVE_HANDLER_STUDENT } from '@helpers/DataFunctions.js';
import constants from '@helpers/constants';


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const UploadFile = ({navigation, route}) => {

    const PROGRAMME_ID = route.params.PROGRAMME_ID;
    const BATCH_ID = route.params.BATCH_ID;
    const DEPARTMENT_ID = route.params.DEPARTMENT_ID;
    const PROGRAMME_NAME = route.params.PROGRAMME_NAME;
    const START_YEAR = route.params.START_YEAR;
    const PASSOUT_YEAR = route.params.PASSOUT_YEAR;
    const SHORT_NAME = route.params.SHORT_NAME;
    const category = route.params.category;

    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [edit, setEdit] = useState(null);
    const [notification, setNotification] = useState(null);

    // const [pgShortName, setPgShortName] = useState(null);
    // const [pgFullName, setPgFullName] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [passoutYear, setPassoutYear] = useState(null);
    const [shortName, setShortName] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [name, setName] = useState(null);
    const [roll, setRoll] = useState(null);
    const [email, setEmail] = useState(null);
    const [empty, setEmpty] = useState([ {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''} ]);

    const ALL_PROGRAMMES = useSelector((state) => state.dbReducer.all_programmes);
    const BATCHES = useSelector((state) => state.dbReducer.batches);
    const DEPARTMENTS = useSelector((state) => state.dbReducer.departments);
    const STUDENTS = useSelector((state) => state.dbReducer.students);

    

    let EXISTING_DATA = [];

    switch(category){
      case 'batch':
        EXISTING_DATA = BATCHES;
        break;
      case 'department':
        EXISTING_DATA = DEPARTMENTS;
        break;
      case 'student':
        EXISTING_DATA = STUDENTS;
        break;
      default:
        break;
    }

    const handleError = () => {
      setNotification({
        msg1:"Your file don't have correct data",
        type:"error",
        endsIn:"2500"
      })
      setTimeout(() => {setNotification(null)},3000);
    }
    const handleUpload = async() => {
        try {
            const pickedFile = await DocumentPicker.pick({
              type: [ mime.lookup('xlsx'), mime.lookup('xls'), mime.lookup('ods') ],
            });
            if(validateFileExtension(pickedFile.name)){
              RNFS.readFile(pickedFile.uri, 'ascii')
              .then((res) => {
                let x = XLSX.read(res, {type:'binary'});
                if(x){
                  x = x.Sheets[x.SheetNames[0]];
                  let data = XLSX.utils.sheet_to_json(x,{header:1})
                  let valid = validateFileData(data, category, handleError);
                  if(valid){
                    console.log('filter');
                    const actualData = filterExistingData(data, category, EXISTING_DATA);
                    setFile(pickedFile);
                    setFileData(actualData.new);
                  }
                }
              })
              .catch((err) => {
                console.log(err);
                setNotification({
                  msg1:"Oops! Your file is corrupt",
                  type:"error",
                  endsIn:2500
                })
                setTimeout(() => {setNotification(null)},3500);
              })
            }
            else{
              setNotification({
                msg1:"Incorrect File Format",
                type:"error",
                endsIn:2500
              })
              setTimeout(() => {setNotification(null)},2700);
              setTimeout(() => {
                setNotification({
                  msg1:"Allowed File Extension :  ",
                  type:"",
                  endsIn:2500,
                  msg2:"xlsx, xls, ods"
                })
              },2800);
              setTimeout(() => {setNotification(null)},7000);
            }
          }
          catch (err) {
            console.log("z => ",err);
          }
    }
    const handleSave = async() => {
      if(category === 'batch'){
        for(let i in fileData){
          let result = await SAVE_HANDLER_BT( PROGRAMME_ID, fileData[i][0], fileData[i][1], BATCHES, empty );
          if(i == fileData.length -1){
            setTimeout(() => {navigation.navigate('manage_data_2', {headerLabel:PROGRAMME_NAME, ID:PROGRAMME_ID, label:PROGRAMME_NAME})},500)
          }
        }
      }
      else if(category === 'department'){
        for(let i in fileData){
          let result =  await SAVE_HANDLER_DEPARTMENT( fileData[i][0], fileData[i][1], DEPARTMENTS, empty, BATCH_ID, PROGRAMME_ID );
          if(i == fileData.length -1){
            setTimeout(() => {navigation.navigate('manage_data_3', {headerLabel:SHORT_NAME, PROGRAMME_ID:PROGRAMME_ID, BATCH_ID:BATCH_ID, START_YEAR:START_YEAR, PASSOUT_YEAR:PASSOUT_YEAR, Label:SHORT_NAME})},500)
          }
        }
      }
      else if(category === 'student'){
        for(let i in fileData){
          let result =  await SAVE_HANDLER_STUDENT( fileData[i][1], fileData[i][0], fileData[i][2], PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID, empty, STUDENTS)
          if(i == fileData.length -1){
            setTimeout(() => {navigation.navigate('manage_data_4', {headerLabel:'STUDENTS', PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID, SHORT_NAME })},500)
          }
        }
      }
    }
    const handleDelete = (index) => {
      console.log(index);
      fileData.splice(index,1);
      let x = [...fileData];
      setFileData(x);
    };
    const handleEdit = (index) => {
      setEdit(index+1);
      switch(category){
        case 'batch':
          setStartYear(fileData[index][0])
          setPassoutYear(fileData[index][1])  
          break;
        case 'department':
          setShortName(fileData[index][0]);
          setFullName(fileData[index][1])
          break;
        case 'student':
          setName(fileData[index][1]);
          setRoll(fileData[index][0]);
          setEmail(fileData[index][2])
          break;
        default:
          break;
      }
    };
    const handleEditSave = () => {
      let empty1 = [...empty];
      if(category == 'batch'){
        let dd = [...fileData];
        dd.splice(edit-1,1);
        const response = verifySingleBatch_BULK([startYear, passoutYear], BATCHES, dd);
        if(response.x == 'valid' && response.y == 'valid'){
          let dd1 = [...fileData];
          dd1[edit-1] = [startYear,passoutYear];
          setFileData(dd1);
          setEmpty([ {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''} ]);
          setEdit(null);
        }
        else{
          if(response.x == 'invalid'){
            empty1[0] = {status:1, msg:'Batch with this value already exist!'}
          }
          if(response.y == 'invalid'){
            empty1[1] = {status:1, msg:'Batch with this value already exist!'}
          }
          setEmpty(empty1);
        }
      }
      else if(category == 'department'){
        let dd = [...fileData];
        dd.splice(edit-1,1);
        const response = verifySingleDepartment_BULK([shortName, fullName], DEPARTMENTS, dd);
        if(response.x == 'valid' && response.y == 'valid'){
          let dd1 = [...fileData];
          dd1[edit-1] = [shortName,fullName];
          setFileData(dd1);
          setEmpty([ {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''} ]);
          setEdit(null);
        }
        else{
          if(response.x == 'invalid'){
            empty1[2] = {status:1, msg:'Department with this value already exist!'}
          }
          if(response.y == 'invalid'){
            empty1[3] = {status:1, msg:'Department with this value already exist!'}
          }
          setEmpty(empty1);
        }
      }
      else if(category == 'student'){
        let dd = [...fileData];
        dd.splice(edit-1,1);
        const response = verifySingleStudent_BULK([name, roll, email], STUDENTS, dd);
        if(response.x == 'valid' && response.y == 'valid' && response.z == 'valid'){
          let dd1 = [...fileData];
          dd1[edit-1] = [roll,name,email];
          setFileData(dd1);
          setEmpty([ {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''} ]);
          setEdit(null);
        }
        else{
          if(response.x == 'invalid'){
            empty1[4] = {status:1, msg:'Student with this name already exist!'}
          }
          if(response.y == 'invalid'){
            empty1[5] = {status:1, msg:'Student with this roll already exist!'}
          }
          if(response.z == 'invalid'){
            empty1[6] = {status:1, msg:'Student with this email already exist!'}
          }
          setEmpty(empty1);
        }
      }
    };
    const handleChange = (name, input) => {
      console.log(name,'  =>  ',input);
      switch(category){
        case 'batch':
          if(name == 'startYear'){
            setStartYear(input);
          }
          if(name == 'passoutYear'){
            setPassoutYear(input);
          }
          break;
        case 'department':
          if(name == 'shortName'){
            setShortName(input);
          }
          if(name == 'fullName'){
            setFullName(input);
          }
          break;
        case 'student':
          if(name == 'sName'){
            setName(input);
          }
          if(name == 'sRoll'){
            setRoll(input);
          }
          if(name == 'sEmail'){
            setEmail(input);
          }
          break;
      }
    }
    const handleClose = () => {
      setEdit(null);
      setEmpty([ {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''}, {status:0, msg:''} ]);
    }

    return(
        <View style={{height:HEIGHT,width:WIDTH,backgroundColor:'#FFF',paddingTop:file?HEIGHT*0.1:0,alignItems:'center',justifyContent:fileData?'flex-start':'center'}}>
          {
            notification
            ?(
              <NotifierBar msg1={notification.msg1} type={notification.type} endsIn={notification.endsIn} msg2={notification.msg2}/>
            )
            :null
          }

          <TouchableOpacity style={{borderWidth:fileData?1.3:2,borderColor:'#3DCCBE',borderStyle:'dashed',borderRadius:fileData?7:10,width:WIDTH*0.85,height:fileData?'23%':'30%', marginBottom:fileData?'8%':0}} onPress={handleUpload}>
            <View style={{height:fileData?'85%':'80%',alignItems:'center',justifyContent:'center'}}>
              <View style={{borderWidth:fileData?8:15,borderColor:'#00000010',borderRadius:100,width:fileData?WIDTH*0.25:WIDTH*0.3,height:fileData?WIDTH*0.25:WIDTH*0.3,alignItems:'center',justifyContent:'center'}}>
                <Image source={excel_logo} style={{width:fileData?'45%':'55%',height:fileData?'40%':'50%',position:'relative',right:'4%'}} resizeMode="stretch"/>
              </View>
            </View>
            <View style={{height:fileData?'10%':'20%',alignItems:'center'}}>
              <Text style={{fontSize:fileData?WIDTH*0.035:WIDTH*0.045}}>
                {file ? file.name : "Choose Your File"}
              </Text>
            </View>                
          </TouchableOpacity>
          {
            file?(
                <View style={{width:'100%',height:'72%'}}>
                  <View style={{height:'6%',marginBottom:'2%',alignItems:'center'}}>
                    {
                      fileData
                      ?(
                        <Text style={{color:'#03B898', fontSize:WIDTH*0.05,letterSpacing:1}}>
                          <Text style={{fontWeight:'bold'}}>{fileData.length}</Text> New Entries Found
                        </Text>
                      )
                      :(
                        <Skelton style={{width:'50%',height:'30%'}}/>
                      )
                    }
                  </View>
                    {
                      fileData
                      ?(
                        <>
                        <ScrollView style={{marginBottom:'-2%'}} showsVerticalScrollIndicator>
                          {
                          fileData.map((data, index) => (
                              category === 'batch'?(
                                <SwipeableBar key={index} index={index} edit={handleEdit} delete={handleDelete} parentStyle={{width:WIDTH*0.8,height:50,alignSelf:'center',marginBottom:HEIGHT*0.04}} style={{borderRadius:4,borderTopLeftRadius:6,borderBottomLeftRadius:6,height:HEIGHT*0.08}}>
                                  <View style={{backgroundColor:"#FFF",elevation:4,borderLeftWidth:3,borderLeftColor:'#3DCBBE',borderRadius:4,borderTopLeftRadius:6,borderBottomLeftRadius:6,width:WIDTH*0.85,height:HEIGHT*0.08,alignSelf:'center',marginBottom:HEIGHT*0.04,flexDirection:'row',alignItems:'center',paddingLeft:'3%'}}>
                                    <Text style={{fontSize:WIDTH*0.04,opacity:0.6}}>{index+1}.</Text>
                                    <View style={{width:'95%',height:'100%',flexDirection:'row',paddingLeft:'5%',alignItems:'center'}}>
                                      <Text style={{fontSize:WIDTH*0.045,paddingLeft:'2%'}}>{PROGRAMME_NAME}</Text>
                                      <Text style={{fontSize:WIDTH*0.048,paddingLeft:'8%'}}>{data[0]}   -   {data[1]}</Text>
                                    </View>
                                  </View>
                                </SwipeableBar>
                              ):(
                                category === 'department'?(
                                  <SwipeableBar key={index} index={index} edit={handleEdit} delete={handleDelete} parentStyle={{width:WIDTH*0.8,height:50,alignSelf:'center',marginBottom:HEIGHT*0.06}} style={{borderRadius:4,borderTopLeftRadius:6,borderBottomLeftRadius:6,height:HEIGHT*0.08}}>
                                    <View style={{backgroundColor:"#FFF",elevation:4,borderLeftWidth:3,borderLeftColor:'#3DCBBE',borderRadius:4,borderTopLeftRadius:6,borderBottomLeftRadius:6,width:WIDTH*0.85,height:HEIGHT*0.09,alignSelf:'center',marginBottom:HEIGHT*0.04,flexDirection:'row',alignItems:'center',paddingLeft:'3%'}}>
                                      <Text style={{fontSize:WIDTH*0.04,opacity:0.6}}>{index+1}.</Text>
                                      <View style={{width:'95%',height:'100%',paddingLeft:'5%',justifyContent:'space-evenly'}}>
                                        <Text style={{fontSize:WIDTH*0.045,paddingLeft:'2%',letterSpacing:3}}>{data[0]}</Text>
                                        <Text style={{fontSize:WIDTH*0.035,paddingLeft:'2%',opacity:0.7}}>{data[1]}</Text>
                                      </View>
                                    </View>
                                  </SwipeableBar>
                                )
                                :(
                                  category === 'student'?(
                                    <SwipeableBar key={index} index={index} edit={handleEdit} delete={handleDelete} parentStyle={{width:WIDTH*0.8,height:50,alignSelf:'center',marginBottom:HEIGHT*0.06}} style={{borderRadius:4,borderTopLeftRadius:6,borderBottomLeftRadius:6,height:HEIGHT*0.08}}>
                                      <View style={{backgroundColor:"#FFF",elevation:4,borderLeftWidth:3,borderLeftColor:'#3DCBBE',borderRadius:4,borderTopLeftRadius:6,borderBottomLeftRadius:6,width:WIDTH*0.85,height:HEIGHT*0.09,alignSelf:'center',marginBottom:HEIGHT*0.04,flexDirection:'row',alignItems:'center',paddingLeft:'3%'}}>
                                        <Text style={{fontSize:WIDTH*0.04,opacity:0.6}}>{index+1}.</Text>
                                        <View style={{width:'95%',height:'100%',paddingLeft:'5%',justifyContent:'space-evenly'}}>
                                          <Text style={{fontSize:WIDTH*0.04,paddingLeft:'2%',letterSpacing:1}}>{data[1]}</Text>
                                          <Text style={{fontSize:WIDTH*0.035,paddingLeft:'2%',opacity:0.8}}>{data[0]}    {data[2]}</Text>
                                        </View>
                                      </View>
                                    </SwipeableBar>
                                  )
                                  :null
                                )
                              )
                          ))
                          }
                      </ScrollView>
                      <View style={{marginBottom:HEIGHT*0.014}}>
                          <CustomButtonFilled label="SAVE" click={handleSave}/>
                      </View>
                      </>
                      )
                      :(
                        [...Array(4)].map((value, index) => (
                          <Skelton key={index} style={{width:'85%',height:'12%',borderRadius:7}}/>
                        ))
                      )
                    }
                    {
                      edit
                      ?(
                        <BottomSheetEditor label={category=='batch'?'Edit Batch':(category=='department'?'Edit Department':(category=='student'?'Edit Student':Edit))} closeModal={handleClose} handleSave={handleEditSave}>
                          {
                            category === 'batch'?(
                              <>
                                <CustomTextInput value={String(fileData[edit-1][0])} name="startYear" placeholder="Batch Start Year" handleChange={handleChange} empty={empty[0]} type="number-pad" length={4} />
                                <CustomTextInput value={String(fileData[edit-1][1])} name="passoutYear" placeholder="Batch Passout Year" handleChange={handleChange} empty={empty[1]} type="number-pad" length={4} />
                              </>
                            )
                            :(
                              category === 'department'?(
                                <>
                                  <CustomTextInput value={String(fileData[edit-1][0])} name="shortName" placeholder="Department Short Name" handleChange={handleChange} empty={empty[2]} capitalize="characters" />
                                  <CustomTextInput value={String(fileData[edit-1][1])} name="fullName" placeholder="Department Full Name" handleChange={handleChange} empty={empty[3]} capitalize="words" />
                                </>
                              )
                              :(
                                category === 'student'?(
                                  <>
                                    <CustomTextInput value={String(fileData[edit-1][1])} name="sName" placeholder="Student Name" handleChange={handleChange} empty={empty[4]} capitalize="words" />
                                    <CustomTextInput value={String(fileData[edit-1][0])} name="sRoll" placeholder="Student Roll" handleChange={handleChange} empty={empty[5]} capitalize="words" />
                                    <CustomTextInput value={String(fileData[edit-1][2])} name="sEmail" placeholder="Student Email" handleChange={handleChange} empty={empty[6]} type="default" />
                                  </>
                                )
                                :null
                              )
                            )
                          }
                        </BottomSheetEditor>
                      )
                      :null
                    }
              </View>  
              )
              :null
          }
        </View>
    );
}
export default UploadFile;