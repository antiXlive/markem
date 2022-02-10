import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    View,Text,Image,Animated,PanResponder,
    ActivityIndicator,TouchableOpacity,ScrollView,FlatList,
    StatusBar,StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';
import BackButton from '@assets/backButton.png'
import AnimatedBar from '@components/AnimatedBar.component';
import PieChart from '@components/PieChart.component';
import { AnimatedStudentCard} from '@components/StudentCard.component';

import { LOAD_COURSE_STUDENTS} from '@actions/markemAction';
import { GET_STUDENT_ATTENDANCE_PERCENT } from '@helpers/DataFunctions';

import constants from '@helpers/constants'
const WIDTH = constants.WIDTH;
let HEIGHT = constants.HEIGHT;
HEIGHT = HEIGHT*0.98;

const Home2 = ({navigation, route}) => {

    const COURSE_ID = route.params.ID; 
    const COURSE_CODE = route.params.headerLabel; 
    const PROGRAMME_ID = route.params.PROGRAMME_ID; 
    const dispatch = useDispatch();

    let COURSE_STUDENTS = useSelector((state) => state.markemReducer.courseStudents);
    // if(COURSE_STUDENTS){
    //     COURSE_STUDENTS = COURSE_STUDENTS.new
    // }

    const spinValue = new Animated.Value(0);
    const position = useRef(new Animated.ValueXY()).current;
    const position1 = useRef(new Animated.ValueXY()).current;
    const scrollRef = useRef();
    const rollRef = useRef();
    const [currentStudent, setCurrentStudent] = useState(0);
    const [absentStudents, setAbsentStudents] = useState([]);
    const [absentStudents1, setAbsentStudents1] = useState([]);
    const [currentPercent, setCurrentPercent] = useState(0);
    const [attendanceStats, setAttendanceStats] = useState([]);
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        getStudentAttendance();
    },[COURSE_STUDENTS])
    useEffect(() => {
        Markem_NavBarColor.setBackgroundColor('#100C1F',false);
        setTimeout(() => {setLoading(false)}, 500);
        return () => {
            Markem_NavBarColor.setBackgroundColor('#FFFFFF',true);
        }
    },[]);
    useEffect(() => {
        if(COURSE_ID){
            dispatch(LOAD_COURSE_STUDENTS(PROGRAMME_ID, COURSE_ID, 'together'));
        }
    },[])
   
    useEffect(() => {
        position.setValue({x:0,y:0});
        if(currentStudent>0){
            if(absentStudents.length>0){
                if(absentStudents.indexOf(currentStudent-1) >= 0){
                    position1.setValue({x:-WIDTH*2,y:0})
                }
                else{
                    position1.setValue({x:WIDTH*2,y:0})
                }
            }
            else{
                position1.setValue({x:WIDTH*2,y:0})
            }
        }
        if(COURSE_STUDENTS.length > 0){
            if(currentStudent === COURSE_STUDENTS.length){
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    // let x = [...absentStudents1];
                    // let y = [...new Map(x.map(item => [item[roll], item])).values()]
                    // console.log(y);
                    navigation.navigate('attendance_statistics', {headerLabel:COURSE_CODE,STUDENTS:COURSE_STUDENTS,ABSENT:absentStudents1})
                },500)
            }
            else{
                setFinished(false);
            }
        }
    },[currentStudent]);

    // if(COURSE_STUDENTS){
    //     // console.log(COURSE_STUDENTS);
    //     COURSE_STUDENTS.sort(function(a,b){
    //         return  a.roll - b.roll;
    //     })
    // }

    let rotate = position.x.interpolate({
        inputRange:[-WIDTH/2, 0, WIDTH/2],
        outputRange:['-10deg', '0deg', '10deg'],
        extrapolate:'clamp'
    });
    let rotate1 = position1.x.interpolate({
        inputRange:[-WIDTH/2, 0, WIDTH/2],
        outputRange:['-10deg', '0deg', '10deg'],
        extrapolate:'clamp'
    });
    
    let NSA = position.x.interpolate({
        inputRange:[-WIDTH/1.5, 0, WIDTH/1.5],
        outputRange:[1, 0.1, 1],
        extrapolate:'clamp'
    })
    let RnT = {
        transform:[{
            rotate
        },
        ...position.getTranslateTransform()
        ]
    }
    let PRnT = {
        transform:[
            {
            rotate:rotate1
        },
        ...position1.getTranslateTransform()
        ]
    }
    const spin = spinValue.interpolate({
        inputRange:[0,1],
        outputRange:['0deg', '-90deg']
    });
    const panResponder = useMemo(() =>
        PanResponder.create({
            onStartShouldSetPanResponder:() => true,
            onPanResponderMove:(e, gestureState) => {
                position.setValue({x:gestureState.dx, y:gestureState.dy/6});
            },
            onPanResponderRelease: (evt, gestureState) => {
                if(gestureState.dx > WIDTH/2.5){
                    setCurrentStudent(currentStudent+1)
                    rollRef.current.scrollToIndex({index:currentStudent, viewOffset:100});
                    Animated.spring(position,{
                        toValue:{x:WIDTH*1.5, y:gestureState.dy},
                        useNativeDriver:true
                    }).start();
                    setCurrentPercent(((currentStudent+1)/COURSE_STUDENTS.length) * 100);
                }
                else if(gestureState.dx < -WIDTH/2.5){
                    setAbsentStudents([...absentStudents, currentStudent]);
                    setAbsentStudents1([...absentStudents1, COURSE_STUDENTS[currentStudent]]);
                    setCurrentStudent(currentStudent+1)
                    rollRef.current.scrollToIndex({index:currentStudent, viewOffset:100});
                    Animated.spring(position,{
                        toValue:{x:-WIDTH*2, y:gestureState.dy},
                        useNativeDriver:true
                    }).start();
                    setCurrentPercent(((currentStudent+1)/COURSE_STUDENTS.length) * 100);
                }
                else{
                    Animated.spring(position,{
                        toValue:{x:0, y:0},
                        duration:700,
                        useNativeDriver:true
                    }).start();
                }
            },
        }),[currentStudent]
    ) 

    const getStudentAttendance = async() => {
        let data = [];
        for(let i in COURSE_STUDENTS){
            let res = await GET_STUDENT_ATTENDANCE_PERCENT(COURSE_CODE, COURSE_STUDENTS[i].roll);
            data.push(res);
        }
        setAttendanceStats(data);
    }
    
   
    const handleBack = () => {
        if(currentStudent>2){
            rollRef.current.scrollToIndex({index:currentStudent-2, viewOffset:100});
        }
        if(currentStudent > 0){
            Animated.timing(spinValue, {
                toValue:1,
                duration:100,
                useNativeDriver:true
            }).start(() => {
                Animated.timing(spinValue, {
                    toValue:0,
                    duration:100,
                    useNativeDriver:true
                }).start();
            })
            Animated.spring(position1, {
                toValue: {x:0,y:0},
                useNativeDriver:true,
            }).start();
            setTimeout(() => {
                setCurrentStudent(currentStudent-1);
                if(absentStudents1.find((item) => item == COURSE_STUDENTS[currentStudent-1])){
                    let x = [...absentStudents1];
                    x.pop();
                    setAbsentStudents1(x);
                }
                setCurrentPercent(((currentStudent-1)/COURSE_STUDENTS.length) * 100);
                if(absentStudents.indexOf(currentStudent-1) >= 0){
                    let x = [...absentStudents];
                    x.pop();
                    setAbsentStudents(x);
                }
            },400);
        }
    }



    const renderStudents = () => {
        return COURSE_STUDENTS.map((item,index) => {
            if(index === currentStudent){
                return(
                    <Animated.View key={index} {...panResponder.panHandlers} style={[RnT, styles.studentCardContainer]}>
                        <AnimatedStudentCard key={index} style={styles.studentCard} name={item.full_name} roll={item.roll}/>
                    </Animated.View>
                )
            }
            else if(index > currentStudent){
                return(
                    <Animated.View key={index} style={[{transform:[{scale:NSA}]}, styles.studentCardContainer]}>
                        <AnimatedStudentCard key={index} style={styles.studentCard} name={item.full_name} roll={item.roll}/>
                    </Animated.View>
                )
            }
            else if(index === currentStudent-1){
                return(
                    <Animated.View key={index} style={[PRnT,styles.studentCardContainer]}>
                        <AnimatedStudentCard key={index} style={styles.studentCard} name={item.full_name} roll={item.roll}/>
                    </Animated.View>                
                )
            }
            else{
                return null
            }
        }).reverse()
    }

    const absentHandler = () => {
        if(currentStudent < COURSE_STUDENTS.length){
            rollRef.current.scrollToIndex({index:currentStudent});
            Animated.timing(position, {
                toValue:{x:-WIDTH*2,y:30},
                duration:500,
                useNativeDriver:true
            }).start();
            setTimeout(() => {setCurrentStudent(currentStudent+1);},150)
            setAbsentStudents([...absentStudents, currentStudent]);
            setAbsentStudents1([...absentStudents1, COURSE_STUDENTS[currentStudent]]);
            setCurrentPercent(((currentStudent+1)/COURSE_STUDENTS.length) * 100);
        }
    };
    const presentHandler = () => {
        if(currentStudent < COURSE_STUDENTS.length){
            rollRef.current.scrollToIndex({index:currentStudent});
            Animated.timing(position, {
                toValue:{x:WIDTH*2,y:30},
                duration:500,
                useNativeDriver:true
            }).start();
            setTimeout(() => {setCurrentStudent(currentStudent+1);},200)
            setCurrentPercent(((currentStudent+1)/COURSE_STUDENTS.length) * 100);
        }
    };

    return(
        <>
        <StatusBar backgroundColor='#100C1F' barStyle="light-content"/>
        <ScrollView ref={scrollRef} style={styles.scrollContainer}>
            {
                loading?(
                    <ActivityIndicator size='large' color='#3DCCBE'/>
                )
                :(
                    <>
                    <View key={0} style={styles.statusBar}>
                        <Text style={styles.statusBarText}>{COURSE_CODE}</Text>
                        <AnimatedBar length={0.55} height={HEIGHT*0.06} strokeWidth={3} fs={20} color1="#3DCCBE50" color2="#3DCCBE" percentage={currentPercent<=100?currentPercent:0}/>
                    </View>
                    <FlatList
                        ref={rollRef}
                        data={COURSE_STUDENTS}
                        horizontal
                        style={{height:HEIGHT*0.13,width:WIDTH*0.965,paddingLeft:WIDTH*0.03}}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item,index}) => {
                            if(index < currentStudent){
                                if(absentStudents.indexOf(index) >= 0){
                                    return(
                                        <View key={index} style={[styles.rollCardMain, styles.rollCardAbsent]}>
                                            <Text style={{fontSize:WIDTH*0.05,color:'#F34B30'}}>{item.roll.substr((item.roll.length) - 3)}</Text>
                                        </View>
                                    )
                                }
                                else{
                                    return(
                                        <View key={index} style={[styles.rollCardMain,styles.rollCardPresent]}>
                                            <Text style={{fontSize:WIDTH*0.05,color:'#65D53D'}}>{item.roll.substr((item.roll.length) - 3)}</Text>
                                        </View>
                                    )
                                }
                            }
                            else if(index === currentStudent){
                                return(
                                    <View key={index} style={[styles.rollCardMain,styles.rollCardHighlighted]}>
                                        <Text style={{fontSize:WIDTH*0.05,color:'#3DCCBE'}}>{item.roll.substr((item.roll.length) - 3)}</Text>
                                    </View> 
                                )
                            }
                            else if(index > currentStudent){
                                return(
                                    <View key={index} style={[styles.rollCardMain]}>
                                        <Text style={{fontSize:WIDTH*0.05,color:'#3DCCBE'}}>{item.roll.substr((item.roll.length) - 3)}</Text>
                                    </View>
                                )
                            }
                        }}
        
                    />

                    <View style={{width:WIDTH,height:HEIGHT*0.5}}>
                        {renderStudents()}
                    </View>

                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.absentButton} onPress={absentHandler} disabled={finished}>
                            <Text style={styles.absentButtonText}>ABSENT</Text>
                        </TouchableOpacity>
                        <Animated.View style={[styles.backButton,{transform:[{rotate: spin}]}]}>
                            <TouchableOpacity activeOpacity={1} onPress={handleBack} style={{width:'100%', height:'100%',alignItems:'center',justifyContent:'center'}} disabled={currentStudent === 0?true:false}>
                                <Image source={BackButton} style={{width:'50%', height:'50%'}} resizeMode="stretch"/>
                            </TouchableOpacity>
                        </Animated.View>
                        <TouchableOpacity style={styles.presentButton} onPress={presentHandler} disabled={finished}>
                            <Text style={styles.presentButtonText}>PRESENT</Text>
                        </TouchableOpacity>
                    </View>  

                    <View style={styles.statsTube}>
                        <View style={[styles.statsTubeCorners,styles.statsTubeAbsent]}>
                            <Text style={{fontSize:WIDTH*0.06, color:'#F63F22', fontWeight:'800'}}>{attendanceStats.length>0&&currentStudent<COURSE_STUDENTS.length?attendanceStats[currentStudent].absentDays:0}</Text>
                        </View>
                        <View style={styles.statsTubeCenter}>
                            <PieChart radius={WIDTH*0.07} strokeWidth={4} fs={WIDTH*0.04} color1='#3DCCBE40' color2='#3DCCBE' percentage={attendanceStats.length>0&&currentStudent<COURSE_STUDENTS.length?attendanceStats[currentStudent].presentPercent:0}/>
                        </View>
                        <View style={[styles.statsTubeCorners,styles.statsTubePresent]}>
                            <Text style={{fontSize:WIDTH*0.06, color:'#65D53D', fontWeight:'800'}}>{attendanceStats.length>0&&currentStudent<COURSE_STUDENTS.length?attendanceStats[currentStudent].presentDays:0}</Text>
                        </View>
                    </View>
                </>
                )
            }
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scrollContainer:{
        backgroundColor:'#100C1F', paddingTop:HEIGHT*0.03
    },
    statusBar:{
        marginBottom:HEIGHT*0.02,justifyContent:'space-around',paddingHorizontal:WIDTH*0.03,alignItems:'center',flexDirection:'row',width:WIDTH*0.9,height:HEIGHT*0.065, borderWidth:1,borderColor:'#3DCCBE',backgroundColor:'#3DCCBE20', alignSelf:'center',borderRadius:6
    },
    statusBarText:{
        color:'#3DCCBE',fontSize:WIDTH*0.06
    },
    rollCard:{
        marginRight:WIDTH*0.04,alignItems:'center',justifyContent:'center',borderRadius:6,height:'70%', width:WIDTH*0.12,backgroundColor:'#F34B3010',transform:[{scale:0.9}]
    },
    rollCardMain:{
        marginRight:WIDTH*0.04,alignItems:'center',justifyContent:'center',borderRadius:6,height:'70%', width:WIDTH*0.12,transform:[{scale:0.9}]
    },
    rollCardAbsent:{
        backgroundColor:'#F34B3010'
    },
    rollCardPresent:{
        backgroundColor:'#65D53D20'
    },
    rollCardDefault:{
        backgroundColor:'#3DCCBE15'
    },
    rollCardHighlighted:{
        borderWidth:1,borderColor:'#3DCCBE',backgroundColor:'#3DCCBE15',transform:[{scale:1}]
    },
    studentCardContainer:{
        height:HEIGHT*0.5, position:'absolute',width:WIDTH
    },
    studentCard:{
        alignSelf:'center', marginBottom:HEIGHT*0.04,position:'absolute'
    },
    statsTube:{
        flexDirection:'row', width:WIDTH*0.8,height:HEIGHT*0.07,alignSelf:'center',borderRadius:100, flexDirection:'row', justifyContent:'space-between',marginBottom:HEIGHT*0.03
    },
    statsTubeCenter:{
        width:'60%', height:'100%', backgroundColor:'#3DCCBE10',alignItems:'center'
    },
    statsTubeCorners:{
        width:'20%',alignItems:'center',justifyContent:'center',height:'100%',borderWidth:1
    },
    statsTubeAbsent:{
        backgroundColor:'#FF000030', borderTopLeftRadius:100, borderBottomLeftRadius:100,borderColor:'#F63F22'
    },
    statsTubePresent:{
        backgroundColor:'#56FF3930', borderTopRightRadius:100, borderBottomRightRadius:100,borderColor:'#62D43C'
    },
    absentButton: {
        minWidth:WIDTH*0.28,height:WIDTH*0.28,borderRadius:12,backgroundColor:'#FF000030',borderWidth:2,borderColor:'#F63F22',alignItems:'center',justifyContent:'center'
    },
    absentButtonText: {
        fontSize:19,letterSpacing:1,fontWeight:'700',color:'#F63F22'
    },
    presentButtonText: {
        fontSize:19,letterSpacing:1,fontWeight:'700',color:'#65D53D'
    },
    presentButton: {
        minWidth:WIDTH*0.28,height:WIDTH*0.28,borderRadius:12,backgroundColor:'#56FF3930',borderWidth:2,borderColor:'#65D53D',alignItems:'center',justifyContent:'center',
        
    },
    backButton: {
        width:HEIGHT*0.09,height:HEIGHT*0.09,backgroundColor:'#3DCCBE20',borderColor:'#3DCCBE',borderWidth:3,borderRadius:50,alignItems:'center',justifyContent:'center'
    },
    actionContainer:{
        width:WIDTH*0.9,alignSelf:'center', height:HEIGHT*0.13, flexDirection:'row',justifyContent:'space-around',alignItems:'center', marginBottom:HEIGHT*0.04
    }

})


export default Home2;