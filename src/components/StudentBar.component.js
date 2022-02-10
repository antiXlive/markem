import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const StudentBar = (props) => {

    const handleLongPress = () => {
        props.ContextMenu(true, props.ID, props.index)
    }
    const handleClick = () => {
        props.click();
    }

    return (
        <TouchableOpacity style={styles.barStyle} onPress={handleClick} onLongPress={handleLongPress}>
            <View style={{ width: '80%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',paddingLeft:10}}>
                <View style={{width:'30%', height:'110%',position:'absolute', borderRadius:100,}}></View>
                {/* <View style={{width:'30%', height:'110%',position:'absolute', borderRadius:100, backgroundColor:'#3DCCBE16', transform:[{rotate:'-9deg'},{translateX:-33},{translateY:-9}]}}></View> */}
                <Text style={{width:'15%',fontSize:WIDTH*0.04}}>{props.count}.</Text>
                <View style={{width:'108%',justifyContent:'space-between',paddingVertical:'2%',height:'100%'}}>
                    <Text style={styles.title1}>{props.name}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:'5%'}}>
                        <Text style={styles.title2}>CSE - {props.roll}</Text>
                        <Text style={[styles.title2,{paddingLeft:WIDTH*0.05}]}>B.Tech : 2018 - 2022</Text>
                    </View>
                </View>
            </View>
            {/* <View style={{alignSelf:'flex-end',marginBottom:'1%',backgroundColor:'#FFF', borderColor:constants.BLUE2, width:WIDTH*0.13, borderWidth:1, height:WIDTH*0.06, borderRadius:50, justifyContent:'center'}}><Text style={{fontSize:WIDTH*0.035,alignSelf:'center', color:constants.BLUE2}}>CSE</Text></View> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    barStyle: {
        alignSelf:'center',
        width: WIDTH * 0.9, 
        height: HEIGHT*0.09, 
        borderRadius: 6,
        borderBottomLeftRadius:6,
        borderLeftColor:'#3DCCBE',
        flexDirection: 'row', 
        backgroundColor: '#FFF', 
        marginBottom:16, 
        paddingRight:15,
        overflow:'hidden',
        paddingBottom:HEIGHT*0.01,
        borderBottomColor:'#00000010',
        borderBottomWidth:0.8
    },
    title1: {
        fontSize: WIDTH*0.041
    },
    title2: {
        fontSize: WIDTH*0.034,
        opacity: 0.5
    }

})

export default StudentBar;