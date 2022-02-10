import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    Animated,
    StatusBar,
    StyleSheet
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import NoData from '@assets/ND.png'
import homeAvatar from '@assets/home-avatar.png'
import { CourseBar } from '@components/CourseBar.component';
import GreetCard from '@components/GreetCard.component';
import {TopTabBar} from '@components/TopTabBar.component';
import { LOAD_COURSES } from '@actions/dbAction';

import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';


import {semesterPrinter} from '@helpers/functions';
import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const Home = ({navigation}) => {
    const [activeTab, setActiveTab] = useState(0);
    // const [time, setTime] = useState();

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const Tab = createMaterialTopTabNavigator();


    const USER_NAME = useSelector((state) => state.auth.userName);

    // const COURSES = [{"classes_taken": 0, "course_code": "CS 330", "course_semester": "5", "course_title": "Software Engineering", "deregistered_students": null, "id": 1, "programme_id": 1, "registered_students": "{\"new\":{\"batches\":\"\",\"departments\":[1],\"students\":\"\"},\"backloggers\":{}}"}]
    const COURSES = useSelector((state) => state.dbReducer.courses);

    useEffect(() => {
        dispatch(LOAD_COURSES());
    },[isFocused]);

    useEffect(() => {
        Markem_NavBarColor.setBackgroundColor('#FFFFFF',true);
        // let secTimer = setInterval( () => {
        //     setTime(new Date().toLocaleString())
        // },1000)

        // return () => clearInterval(secTimer);
    },[])



    

    

    


    const handlePress = (ID, code) => {
        navigation.navigate('class_details', {headerLabel:code, COURSE_ID:ID, PROGRAMME_ID:activeTab+1, PROGRAMME_NAME:tabs[activeTab]})
    }
    // const handleSwitch = (tabIndex) => {
    //     setActiveTab(tabIndex);
    // }
    // const time1 = new Date().toLocaleString();
    // const splittedDate = time1.split(" ");
    const tabs = ['B.Tech', 'M.Tech', 'PHD'];
    // const showTime = () => {
    //     if(time1){
    //         let z = new Date(time1);
    //         let hours = z.getHours();
    //         let minutes = z.getMinutes();
    //         let ampm = hours >= 12 ? 'PM' : 'AM';
    //         hours = hours % 12;
    //         hours = hours ? hours : 12;
    //         minutes = minutes < 10 ? '0'+minutes : minutes;
    //         let strTime = hours + ':' + minutes + ' ' + ampm;
    //         return strTime;
    //     }
       
    // }
    // console.log(time1);
    // console.log(splittedDate);

    const btech_renderer = () => {
        return(
            <View style={{height:'100%',backgroundColor:'#FFF'}}>
                {
                    COURSES && COURSES.b.length > 0
                    ?(
                        <FlatList
                            data={COURSES.b}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id.toString()}
                            style={{width:WIDTH,height:'100%',backgroundColor:'#FFF'}}
                            renderItem={({ item, index }) => (
                                <CourseBar 
                                    click={() => handlePress( item.id, item.course_code)} 
                                    ID={item.id} index={index} code={item.course_code} title={item.course_title} PROGRAMME_NAME={tabs[activeTab]} semester={semesterPrinter(item.course_semester)} classesTaken={item.classes_taken}
                                />
                            )}
                        />

                    ):(
                        <View style={{height:'100%',alignItems:'center',zIndex:-1}}>
                            <Image source={NoData} style={{width:'110%',height:'70%'}} resizeMode='stretch'/>
                            <Text style={{fontSize:WIDTH*0.05,marginTop:'5%'}}>Oops! No Classes Found</Text>
                        </View>
                    )

                }

            </View>        
        )        
    }
    const mtech_renderer = () => {
        return(
            <View style={{height:'100%',backgroundColor:'#FFF'}}>
                {
                    COURSES && COURSES.m.length > 0
                    ?(
                        <FlatList
                            data={COURSES.m}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id.toString()}
                            style={{width:WIDTH,height:'100%',backgroundColor:'#FFF'}}
                            renderItem={({ item, index }) => (
                                <CourseBar 
                                    click={() => handlePress( item.id, item.course_code)} 
                                    ID={item.id} index={index} code={item.course_code} title={item.course_title} PROGRAMME_NAME={tabs[activeTab]} semester={semesterPrinter(item.course_semester)} classesTaken={item.classes_taken}
                                />
                            )}
                        />

                    ):(
                        <View style={{height:'100%',alignItems:'center',zIndex:-1}}>
                            <Image source={NoData} style={{width:'110%',height:'70%'}} resizeMode='stretch'/>
                            <Text style={{fontSize:WIDTH*0.05,marginTop:'5%'}}>Oops! No Classes Found</Text>
                        </View>
                    )

                }

            </View>        
        )        
    }
    const phd_renderer = () => {
        return(
            <View style={{height:'100%',backgroundColor:'#FFF'}}>
                {
                    COURSES && COURSES.p.length > 0
                    ?(
                        <FlatList
                            data={COURSES.p}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id.toString()}
                            style={{width:WIDTH,height:'100%',backgroundColor:'#FFF'}}
                            renderItem={({ item, index }) => (
                                <CourseBar 
                                    click={() => handlePress( item.id, item.course_code)} 
                                    ID={item.id} index={index} code={item.course_code} title={item.course_title} PROGRAMME_NAME={tabs[activeTab]} semester={semesterPrinter(item.course_semester)} classesTaken={item.classes_taken}
                                />
                            )}
                        />

                    ):(
                        <View style={{height:'100%',alignItems:'center',zIndex:-1}}>
                            <Image source={NoData} style={{width:'110%',height:'70%'}} resizeMode='stretch'/>
                            <Text style={{fontSize:WIDTH*0.05,marginTop:'5%'}}>Oops! No Classes Found</Text>
                        </View>
                    )

                }

            </View>        
        )        
    }


    return(
        <>
        <StatusBar backgroundColor='#FFF' barStyle="dark-content"/>
        <View style={{backgroundColor:'#FFF',width:WIDTH,height:HEIGHT}}>
            {/* <View style={styles.greetBox}>
                <View style={{width:'65%'}}>
                    <View style={{height:'75%'}}>
                        <Text style={styles.greetBox_Text1}>Hi</Text>
                        <Text style={styles.greetBox_Text2}>{USER_NAME?USER_NAME.split(' ')[0]:''}</Text>
                    </View>
                    <View style={{height:'25%',flexDirection:'row',alignItems:'center',paddingLeft:'5%', paddingBottom:'5%'}}>
                        <View style={{width:6,height:6,backgroundColor:'#3DCCBE',borderRadius:20, marginRight:WIDTH*0.02}}></View>
                        <Text style={{fontSize:12, fontWeight:'700',opacity:0.5}}>{splittedDate[0].toUpperCase()}, {splittedDate[3]} {splittedDate[1].toUpperCase()}  {showTime()}</Text>
                    </View>
                </View>
                <View style={{width:'35%'}}>
                    <Image style={styles.greetBox_Image} resizeMode="stretch" source={homeAvatar}/>
                </View>
            </View> */}
            <GreetCard userName={USER_NAME?USER_NAME.split(' ')[0]:''}/>
            <View style={{height:HEIGHT*0.76,width:WIDTH}}>
                <Tab.Navigator tabBarOptions={{
                    activeTintColor: '#03B898',
                    inactiveTintColor: '#00000080',
                    labelStyle: { fontSize: WIDTH*0.04,textTransform:'none'},
                    style: { backgroundColor: '#FFF',marginBottom:HEIGHT*0.05},
                    indicatorStyle:{backgroundColor:'#03B898'}
                }}>
                    <Tab.Screen name='btech' options={{ tabBarLabel: 'B.Tech' }} component={btech_renderer}/>
                    <Tab.Screen name='mtech' options={{ tabBarLabel: 'M.Tech' }} component={mtech_renderer}/>
                    <Tab.Screen name='phd' options={{ tabBarLabel: 'PHD' }} component={phd_renderer}/>
                </Tab.Navigator>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    greetBox:{
        width:WIDTH*0.9,
        height:HEIGHT*0.12,
        alignSelf:"center",
        borderRadius:8,
        backgroundColor:'#E3E1E150',
        marginTop:HEIGHT*0.1,
        marginBottom:HEIGHT*0.02,
        flexDirection:'row',
    },
    greetBox_Text1: {
        fontWeight:'500',
        position:'absolute',
        bottom:15, 
        left:12,
        fontSize:WIDTH*0.07,
        opacity:0.5
    },
    greetBox_Image: {
        width:90,
        height:120,
        borderWidth:3,
        position:'absolute',
        bottom:0,
        right:1
    },
    greetBox_Text2: {
        fontWeight:'600',
        position:'absolute',
        bottom:12,
        left:35,
        fontSize:WIDTH*0.11,
        color:'#3DCCBE',
        paddingLeft:10
    },
})

export default Home;