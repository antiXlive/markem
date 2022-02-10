import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import constants from '@helpers/constants.js';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const CourseBar = (props) => {
    

    const handleTouch = () => {
        props.click();
    }
    const handleLongPress = () => {
        if(props.ContextMenu){
            props.ContextMenu(true, props.ID, props.index, props.code);
        }
    };
    
    return (
        <View style={{width:WIDTH*0.88,height:HEIGHT*0.12,alignSelf:'center',overflow:'hidden',borderRadius:8,marginBottom:HEIGHT*0.03}}>
            <TouchableNativeFeedback onPress={handleTouch} onLongPress={handleLongPress}>
                <View style={[styles.barStyle]}>
                <View style={{width:WIDTH*0.88,height:HEIGHT*0.12, flexDirection:'column',paddingLeft:'5%'}}>
                    <View style={{height:'60%', flexDirection:'row', paddingTop:-10, justifyContent:'space-between', paddingRight:'5%', alignItems:'center'}}>
                        <Text style={styles.title1}>{props.code}</Text>
                        <View style={{backgroundColor:'white', borderWidth:1, borderRadius:50, width:40, height:22, alignItems:'center', justifyContent:'center', borderColor:'#03B898'}}>
                            <Text style={{color:'#03B898', fontSize:13}}>{props.classesTaken}</Text>
                        </View>
                        <View style={{backgroundColor:'white', borderWidth:1, borderRadius:50, width:60, height:24, alignItems:'center', justifyContent:'center', borderColor:'#03B898'}}>
                            <Text style={{color:'#03B898', fontSize:13}}>{props.PROGRAMME_NAME}</Text>
                        </View>
                        <View style={{backgroundColor:'white', borderWidth:1, borderRadius:50, width:60, height:24, alignItems:'center', justifyContent:'center', borderColor:'#03B898'}}>
                            <Text style={{color:'#03B898', fontSize:13}}>{props.semester}</Text>
                        </View>
                    </View>
                    <Text style={styles.title2}>{props.title}</Text>
                </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}


const styles = StyleSheet.create({
    barStyle: {
        borderLeftWidth:6, 
        borderLeftColor:'#3DCCBE',
        width: WIDTH * 0.88, 
        height: HEIGHT*0.12, 
        borderRadius: 7, 
        flexDirection: 'row', 
        backgroundColor: '#F2FCF8', 
        marginBottom:25, 
        overflow:'hidden',
        alignSelf:'center',
    },
    title1: {
        fontSize: WIDTH*0.045,
        fontWeight:'600',
        paddingRight:10,
        opacity:1
    },
    title2: {
        fontSize: WIDTH*0.035,
        opacity: 0.6
    }

})

export  {CourseBar};
