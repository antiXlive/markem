import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableNativeFeedback,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native'
import { useDispatch, useSelector} from 'react-redux';
import {
    useIsDrawerOpen,
    DrawerContentScrollView,
} from '@react-navigation/drawer'
import {useRoute} from '@react-navigation/native';


import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SIGNOUT } from '@actions/authAction.js'
import constants from '@helpers/constants'


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const DrawerItem = (props) => {
    const {label, iconFamily, iconName, size, currentKey, activeRouteKey} = props;
    return(
        <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple('#FFF')} 
            onPress={props.handlePress}
        >
            <View style={styles.drawerItem}>
                {
                    currentKey === activeRouteKey?
                    <View style={styles.active}></View>
                    :null
                }
                <View style={styles.drawerItem_icon}>
                    <DrawerIcon family={iconFamily} name={iconName} size={size}/>
                </View>
                <View style={styles.drawerItem_label}>
                    <Text style={styles.drawerItem_labelText}>{label}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}
const DrawerIcon = ({ family, name, size}) => {
    switch(family){
        case "MaterialCommunityIcons":
            return(
                <MaterialCommunityIcons name={name} size={size} color="#FFF"/>
            )
            break;
        case "FontAwesome5":
            return(
                <FontAwesome5 name={name} size={size} color="#FFF"/>
            )
            break;
        case "Ionicons":
            return(
                <Ionicons name={name} size={size} color="#FFF"/>
            )
            break;
        case "EvilIcons":
            return(
                <EvilIcons name={name} size={size} color="#FFF"/>
            )
            break;
        case "AntDesign":
            return(
                <AntDesign name={name} size={size} color="#FFF" style={{transform:[{rotateY:'180deg'}]}}/>
            )
            break;
        default:
        return;
    }
}

const CustomDrawer = (props) => {

    const route = useRoute();
    const dispatch = useDispatch();
    const IsDrawerOpen = useIsDrawerOpen();
    const USER_NAME = useSelector((state) => state.auth.userName);
    const USER_DESIGNATION = useSelector((state) => state.auth.userDesignation);

    const [bgColor, setBgColor] = useState('#FFFFFF');

    useEffect(() => {
        if(IsDrawerOpen){
            setBgColor('#54dbd5');
        }
        else{
            setBgColor('#FFFFFF');
        }
    },[IsDrawerOpen])

    let activeRouteKey = 0;
    route.state?
        activeRouteKey = route.state.index
    :
        activeRouteKey = 0

    const handlePress = (route_name) => {
        console.log(route_name);
        if(route_name === 'signout'){
            props.navigation.closeDrawer();
            setTimeout(() => {dispatch(SIGNOUT())},1000)
        }
        else{
            props.navigation.navigate(route_name);
        }

    }

    return(
        <>
        <StatusBar backgroundColor={bgColor}/>
        <View style={styles.mainContainer}>
            <DrawerContentScrollView {...props}>
                <View style={styles.userInfo}>
                    <View style={styles.userInfo_avatarContainer}>
                        <View style={styles.userInfo_avatar}>
                            <Text style={styles.userInfo_avatarText}>{USER_NAME?(USER_NAME.split(' ')[0]).charAt(0):''}</Text>
                        </View>
                    </View>
                    <View style={styles.userInfo_nameContainer}>
                        <Text style={styles.userInfo_name}>{USER_NAME?USER_NAME:''}</Text>
                        <Text style={styles.userInfo_designation}>{USER_DESIGNATION}</Text>
                    </View>
                </View>
                <DrawerItem 
                    label="Home" 
                    iconFamily="MaterialCommunityIcons" 
                    iconName="home-circle-outline" size={27} 
                    currentKey={0} 
                    activeRouteKey={activeRouteKey}
                    handlePress={() => handlePress('HOME')}
                />
                <DrawerItem 
                    label="Statistics" 
                    iconFamily="Ionicons" 
                    iconName="stats-chart" size={22} 
                    currentKey={3} 
                    activeRouteKey={activeRouteKey}
                    handlePress={() => handlePress('reports_entry')}
                    />
                <DrawerItem 
                    label="Manage Data" 
                    iconFamily="FontAwesome5" 
                    iconName="database" size={18} 
                    currentKey={1} 
                    activeRouteKey={activeRouteKey}
                    handlePress={() => handlePress('manage_data')}
                    // onPress={() => {console.log("hi")}}
                />
                <DrawerItem 
                    label="Settings" 
                    iconFamily="Ionicons" 
                    iconName="settings-outline" size={22} 
                    currentKey={4} 
                    activeRouteKey={activeRouteKey}
                    handlePress={() => handlePress('upweir')}
                />
                <DrawerItem 
                    label="My Account" 
                    iconFamily="EvilIcons" 
                    iconName="user" size={30} 
                    currentKey={5} 
                    activeRouteKey={activeRouteKey}
                    handlePress={() => handlePress('asd')}
                />
                <DrawerItem 
                    label="About" 
                    iconFamily="MaterialCommunityIcons" 
                    iconName="information-outline" size={24} 
                    currentKey={6} 
                    activeRouteKey={activeRouteKey}
                    handlePress={() => handlePress('djasl')}
                />
            </DrawerContentScrollView>
            <DrawerItem 
                label="Sign Out" 
                iconFamily="AntDesign" 
                iconName="logout" size={18} 
                currentKey={7} 
                activeRouteKey={activeRouteKey}
                handlePress={() => handlePress('signout')}
            />
        </View>
        </>
    )
}

const styles = new StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:'#54dbd5',
        // width:WIDTH*0.9
    },
    userInfo: {
        flexDirection:'row',
        height:HEIGHT*0.18,
        borderBottomWidth:1.5,
        borderBottomColor:'#FFFFFF60',
        marginBottom:HEIGHT*0.03
    },
    userInfo_avatarContainer: {
        width:'30%',
        alignItems:'center',
        justifyContent:'center'
    },
    userInfo_avatar: {
        elevation:10,borderWidth:2,
        borderRadius:100,
        backgroundColor:'#F0F0F0',
        borderColor:'#3DCBBE',
        width:HEIGHT*0.08,
        height:HEIGHT*0.08,
        alignItems:'center',
        justifyContent:'center'
    },
    userInfo_avatarText: {
        fontSize:HEIGHT*0.06,
        fontWeight:'bold',
        color:'#3DCBBE'
    },
    userInfo_nameContainer: {
        width:'70%',
        justifyContent:'center',
    },
    userInfo_name: {
        color:'#FFF',
        letterSpacing:1,
        fontSize:HEIGHT*0.035
    },
    userInfo_designation: {
        color:'#FFF',
        paddingTop:'3%',
        fontSize:HEIGHT*0.018,
        paddingLeft:'1%'
    },
    drawerItem: {
        flexDirection:'row',
        height:HEIGHT*0.06,
        marginBottom:HEIGHT*0.015
    },
    drawerItem_icon: {
        width:'18%',
        alignItems:'center',
        justifyContent:'center'
    },
    drawerItem_label: {
        width:'80%',
        justifyContent:'center',
        paddingLeft:'3%'
    },
    drawerItem_labelText: {
        fontSize:HEIGHT*0.024,
        color:'#FFF'
    },
    active: {
        position:'absolute',
        backgroundColor:'#FFFFFF50',
        width:'100%',
        height:'100%'
    },
    
})

export default CustomDrawer;