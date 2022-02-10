import React, { useRef, useEffect, useState } from 'react';
import {
    View,Text,ScrollView,ActivityIndicator,
    FlatList,TouchableOpacity,Animated,StyleSheet
} from 'react-native';
import {DarkTopTabBar} from '@components/TopTabBar.component';
import PieChart from '@components/PieChart.component';
import { SAVE_COURSE_ATTENDANCE,GET_STUDENT_ATTENDANCE_PERCENT } from '@helpers/DataFunctions';
import { DB_fetch_attendance } from '@db/fetcher';


import constants from '@helpers/constants'
const WIDTH = constants.WIDTH;
let HEIGHT = constants.HEIGHT;
HEIGHT = HEIGHT*0.98;



const AttendanceStatistics = ({navigation,route}) => {

    const COURSE_CODE = route.params.headerLabel; 
    const STUDENTS = route.params.STUDENTS
    const ABSENT = route.params.ABSENT;

    // console.log(ABSENT);
    

    // [...Array(6)].map(async(item,i) => {
    //     let date = new Date();
    //     date.setDate(date.getDate() - (i+1));
    //     date = date.toLocaleDateString();
    //     date = date.replace(/\//g, '');
    //     let data = await DB_fetch_attendance(COURSE_CODE,date);
    //     console.log(data.rows.length);
    //     if(data.rows.length < 1){
    //         console.log('NO DATA');
    //     }
    //     else{
    //         console.log(data.rows.item(0));            
    //     }
    // })
    

    const [activeTab, setActiveTab] = useState(1);
    const [loading, setLoading] = useState(true);
    const [yesterdayStats, setYesterdayStats] = useState({p:0,a:0});
    const [absentsStats, setAbsentsStats] = useState([]);
    const [attendanceStats, setAttendanceStats] = useState([]);

    // console.log('*******--Absent Stats--*****************');
    // console.log(absentsStats)
    // console.log('*******--Absent Percents--*****************');
    // console.log(absentsPercents)


    useEffect(() => {
        getYesterdayAttendance();
        getLast6DayStats();
        getAbsentsPercents();
        setTimeout(() => {setLoading(false)}, 300);
    },[])

    const tabs = ['Previous', 'Today'];

    const handleSwitch = (tabIndex) => {
        setActiveTab(tabIndex);
    }
    const actionHandler = (action) => {
        let absentRolls = [];
        for(let i in ABSENT){
            absentRolls.push(ABSENT[i].roll)
        }
        // setLoading(true);
        SAVE_COURSE_ATTENDANCE(COURSE_CODE,absentRolls)
        // setTimeout(() => {
        //     navigation.navigate('HOME');
        //     setLoading(false);
        // },100)
    }

    const getAbsentsPercents = async() => {
        // console.log('******************************************************8');
        // let data = [];
        // for(let i in ABSENT){
        //     let res = await GET_STUDENT_ATTENDANCE_PERCENT(COURSE_CODE, ABSENT[i].roll);
        //     console.log(ABSENT[i].roll,'---------',res);
        //     data.push(res);
        // }
        // setAttendanceStats(data);
    }
    const getYesterdayAttendance = async() => {
        let date = new Date();
        date.setDate(date.getDate() -1);
        let trimmedDate = date.toLocaleDateString();
        trimmedDate = trimmedDate.replace(/\//g, '');
        let yesterdayAttendance = await DB_fetch_attendance(COURSE_CODE, trimmedDate);
        if(yesterdayAttendance){
            if(yesterdayAttendance.rows.length > 0){
                let data = yesterdayAttendance.rows.item(0).attendance;
                data = JSON.parse(data);
                let absentPercentage = data.length/STUDENTS.length*100;
                setYesterdayStats({presentPercent:100-absentPercentage,absentPercent:absentPercentage});
            }
        }
    }
    const getLast6DayStats = async() => {
        // let STATS = [];
        // for(let i in ABSENT){
        //     let p = 6, stats = [];
        //     while(p > 0){
        //         let date = new Date();
        //         date.setDate(date.getDate() - (p));
        //         date = date.toLocaleDateString();
        //         date = date.replace(/\//g, '');
        //         let data = await DB_fetch_attendance(COURSE_CODE,date);
        //         // console.log(data);
        //         if(data){
        //             if(data.rows.length < 1){
        //                 stats.push(-1);
        //             }
        //             else{
        //                 let atd = data.rows.item(0).attendance;
        //                 atd = JSON.parse(atd);
        //                 let exists = atd.find(function(roll) {
        //                     return roll == ABSENT[i].roll
        //                 })
        //                 if(exists){
        //                     stats.push(0);
        //                 }
        //                 else{
        //                     stats.push(1);
        //                 }
        //             }    
        //         }
        //         p--;
        //     }
        //     STATS.push(stats);
        // }
        // setAbsentsStats(STATS);
    }

    const namePrinter = (name) => {
        if(name.length > 15){
            let x = name.substr(0,14);
            x+='..';
            return x;
        }
        else{
            return name;
        }
    }

    return(
        loading?(
            <View style={{flex:1,backgroundColor:'#100C1F'}}>
                <ActivityIndicator size='large' color='#3DCCBE'/>
            </View>
        )
        :(
            <FlatList
            ListHeaderComponent={
                <View style={{width:WIDTH, height:ABSENT.length>0?HEIGHT*1.04:HEIGHT*0.9,backgroundColor:'#100C1F'}}>
                    <View style={{height:HEIGHT*0.45}}>
                        <View style={styles.listViewContainer}>
                            <View style={styles.courseBox}>
                                <Text style={{color:'#3DCCBE',fontSize:WIDTH*0.045,fontWeight:'700'}}>{COURSE_CODE}</Text>
                            </View>
                            <ScrollView>
                                <FlatList
                                    data={STUDENTS}
                                    contentContainerStyle={{alignSelf:'flex-start'}}
                                    keyExtractor={item => item.id.toString()}
                                    numColumns={5}
                                    renderItem={({item, index}) => (
                                        <View style={styles.listViewBox}>
                                            <View style={[{borderColor:ABSENT.find(item1=>item1.roll==item.roll)?'#F63F22':'#62D43C',backgroundColor:ABSENT.find(item1=>item1.roll==item.roll)?'#2C1925':'#1E2F28'},styles.listViewBall]}>
                                                <Text style={{color:ABSENT.find(item1=>item1.roll==item.roll)?'#F63F22':'#62D43C', fontSize:WIDTH*0.04}}>{item.roll.substr(item.roll.length-3)}</Text>
                                            </View>
                                        </View>
                                    )} 
                                />
                            </ScrollView>
                        </View>
                    </View>

                    <View style={{height:HEIGHT*0.22}}>
                        <DarkTopTabBar tabs={tabs} click={handleSwitch}/>
                        <View style={styles.pieChart}>
                            {
                                activeTab === 0?(
                                    <>
                                        <PieChart radius={WIDTH*0.12} strokeWidth={6} fs={WIDTH*0.05} color1='#F63F2240' color2='#F63F22' percentage={yesterdayStats.absentPercent}/>
                                        <PieChart radius={WIDTH*0.12} strokeWidth={6} fs={WIDTH*0.05} color1='#62D43C50' color2='#62D43C' percentage={yesterdayStats.presentPercent}/>
                                    </>
                                )
                                :(
                                    <>
                                        <PieChart radius={WIDTH*0.12} strokeWidth={6} fs={WIDTH*0.05} color1='#F63F2240' color2='#F63F22' percentage={(ABSENT.length/STUDENTS.length)*100}/>
                                        <PieChart radius={WIDTH*0.12} strokeWidth={6} fs={WIDTH*0.05} color1='#62D43C50' color2='#62D43C' percentage={(100 - (ABSENT.length/STUDENTS.length)*100)}/>
                                    </>
                                )
                            }
                        </View>
                    </View>

                    <View style={{height:ABSENT.length>0?HEIGHT*0.32:HEIGHT*0.1,paddingTop:ABSENT.length>0?0:HEIGHT*0.03}}>
                        <Text style={styles.abssentCardContainerLabel}>Absent Students - {ABSENT.length}</Text>
                        {
                            ABSENT.length > 0?(
                                <View style={styles.abssentCardContainer}>
                                <FlatList
                                    data={ABSENT}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({item, index}) => (
                                        <View style={[{marginLeft:index===0?WIDTH*0.04:0,},styles.absentCard]}>
                                            <Text style={[styles.absentCardName]}>{namePrinter(item.full_name)}</Text>
                                            <Text style={[styles.absentCardRoll]}>CSE - {item.roll}</Text>
                                            <View style={[styles.absentCardPieContainer]}>
                                                <PieChart radius={WIDTH*0.055} strokeWidth={3} fs={11} color1='#F63F2240' color2='#F63F22' percentage={attendanceStats[index]?attendanceStats[index].absentPercent:0}/>
                                                <PieChart radius={WIDTH*0.055} strokeWidth={3} fs={11} color1='#62D43C50' color2='#62D43C' percentage={attendanceStats[index]?attendanceStats[index].presentPercent:0}/> 
                                            </View>
                                            <View style={[styles.pastAttendanceContainer]}>
                                                <Text style={[styles.pastAttendanceContainerTitle]}>Last 6 class</Text>
                                                <View style={[styles.pastAttendanceView]}>
                                                {
                                                    absentsStats.length>0?absentsStats[index].map((item,i) => {
                                                        if(item == -1){
                                                            return(
                                                                // <View key={i} style={[]}>
                                                                //     <Text style={{color:'#3DCBBE',fontSize:WIDTH*0.015}}>0</Text>
                                                                // </View>
                                                                null
                                                            )
                                                        }
                                                        else if(item == 0){
                                                            return(
                                                                <View key={i} style={[styles.pastAttendanceBall,styles.pastAttendanceBallAbsent]}>
                                                                    <Text style={{color:'#F63F22',fontSize:WIDTH*0.02}}>A</Text>
                                                                </View>
                                                            )
                                                        }
                                                        else if(item ==1){
                                                            return(
                                                                <View key={i} style={[styles.pastAttendanceBall,styles.pastAttendanceBallPresent]}>
                                                                    <Text style={{color:'#62D43C',fontSize:WIDTH*0.02}}>P</Text>
                                                                </View>
                                                            )
                                                        }
                                                    })
                                                    :null
                                                }
                                                </View>
                                            </View>
                                            <View style={styles.studentBatch}>
                                                <View style={styles.studentBatchPoint}></View>
                                                <Text style={styles.studentBatchText}>Batch - 2018</Text>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>
                            ):null
                        }
                    </View>
                </View>
            }
            ListFooterComponent={
                <View style={[styles.buttonContainer,{height:ABSENT.length>0?HEIGHT*0.09:HEIGHT*0.15}]}>
                    <TouchableOpacity onPress={() => {actionHandler('discard')}} style={[styles.buttonDefault,styles.buttonDiscard]}>
                        <Text style={[{color:'#F63F22'},styles.buttonText]}>DISCARD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {actionHandler('save')}} style={[styles.buttonDefault,styles.buttonSave]}>
                        <Text style={[{color:'#62D43C',letterSpacing:1},styles.buttonText]}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            }
        />
        ) 
    )
}

const styles = new StyleSheet.create({
    listViewContainer:{
        borderTopWidth:0.5,paddingHorizontal:WIDTH*0.025,borderColor:'#3DCCBE',marginTop:'7%',height:'90%',backgroundColor:'#3DCCBE10',width:WIDTH*0.9,alignSelf:'center',alignItems:'center',paddingTop:'8%',borderBottomLeftRadius:15,borderBottomRightRadius:15
    },
    courseBox:{
        width:WIDTH*0.2,backgroundColor:'#100C1F',height:WIDTH*0.08,borderWidth:1,borderRadius:100,borderColor:'#3DCCBE',position:'absolute',top:'-6%',alignItems:'center',justifyContent:'center'
    },
    listViewBox:{
        width:WIDTH*0.17,height:WIDTH*0.17,zIndex:10,alignItems:'center'
    },
    listViewBall:{
        borderWidth:1,width:WIDTH*0.1,height:WIDTH*0.1,borderRadius:100,alignItems:'center',justifyContent:'center'
    },
    pieChart:{
        height:'80%',alignItems:'center',flexDirection:'row',justifyContent:'space-evenly'
    },
    abssentCardContainer:{
        height:'90%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'
    },
    abssentCardContainerLabel:{
        color:'#3DCCBE',fontSize:WIDTH*0.055,paddingLeft:'5%',marginTop:'3%'
    },
    absentCard:{
        borderWidth:1,height:HEIGHT*0.24,width:WIDTH*0.35,borderRadius:10,marginRight:WIDTH*0.05,borderColor:'#3DCBBE',paddingTop:'4%'
    },
    absentCardName:{
        fontSize:WIDTH*0.035,paddingLeft:'8%',color:'#3DCBBE',marginBottom:'3%',fontWeight:'bold'
    },
    absentCardRoll:{
        fontSize:WIDTH*0.027,paddingLeft:'8%',color:'#3DCBBE',
    },
    absentCardPieContainer:{
        flexDirection:'row',height:'35%',justifyContent:'space-evenly',paddingTop:'10%'
    },
    pastAttendanceContainer:{
        height:'28%',paddingLeft:'5%',paddingTop:'5%'
    },
    pastAttendanceContainerTitle:{
        color:'#3DCBBE',fontSize:WIDTH*0.03,marginBottom:'5%',
    },
    pastAttendanceView:{
        flexDirection:'row',justifyContent:'space-between',width:'90%'
    },
    pastAttendanceBall:{
        alignSelf:'center',width:14,height:14,borderRadius:20,borderWidth:1,alignItems:'center',justifyContent:'center'
    },
    pastAttendanceBallAbsent:{
        backgroundColor:'#F63F2240',borderColor:'#F63F22'
    },
    pastAttendanceBallPresent:{
        backgroundColor:'#62D43C50',borderColor:'#62D43C'
    },
    studentBatch:{
        height:'13%',flexDirection:'row',alignItems:'center',paddingLeft:'5%'
    },
    studentBatchPoint:{
        width:8,height:8,borderRadius:20,backgroundColor:'#3DCBBE'
    },
    studentBatchText:{
        color:'#3DCBBE',fontSize:WIDTH*0.03,paddingLeft:'5%'
    },

    buttonContainer:{
        flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#100C1F'
    },
    buttonDefault:{
        justifyContent:'center',borderWidth:1,width:WIDTH*0.4,height:HEIGHT*0.065,alignSelf:'center',borderRadius:6
    },
    buttonText:{
        fontSize:WIDTH*0.05,alignSelf:'center',letterSpacing:1
    },
    buttonSave:{
        borderColor:'#62D43C',backgroundColor:'#56FF3930'
    },
    buttonDiscard:{
        borderColor:'#F63F22',backgroundColor:'#FF000030'
    },
})

export default AttendanceStatistics;