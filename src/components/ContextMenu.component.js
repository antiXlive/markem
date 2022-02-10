import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';


import constants from '@helpers/constants.js';
import { touch } from 'react-native-fs';
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const ContextMenu = ({ touchPoint, editHandler, deleteHandler, mode }) => {
    const handleEdit = () => {
        editHandler();
    };
    const handleDelete = () => {
        deleteHandler();
    };

    const X = touchPoint.x > WIDTH*0.72 ? WIDTH*0.72 : touchPoint.x; 

    return(
        mode?
        mode == 'addOnly'?
        (
            <View style={[styles.container,{ top:touchPoint.y-20, left:X-10, height:HEIGHT*0.1,width:WIDTH*0.25}]}>
                <TouchableOpacity activeOpacity={0.4} onPress={handleEdit} style={[styles.button,{paddingTop:'-5%',paddingLeft:'15%'}]}>
                    <Entypo name="add-to-list" color='#3D90CC' size={18} />
                    <Text style={[styles.text, styles.edit,{fontSize:WIDTH*0.05,color:'#3D90CC'}]}>ADD</Text>
                </TouchableOpacity>
            </View>
        )
        :mode == 'removeOnly'?(
            <View style={[styles.container,{ top:touchPoint.y-20, left:X-10, height:HEIGHT*0.1,width:WIDTH*0.32}]}>
                <TouchableOpacity activeOpacity={0.4} onPress={handleDelete} style={[styles.button,{paddingTop:'-5%',paddingLeft:'10%'}]}>
                    <MaterialCommunityIcons name="playlist-remove" color='#F36262' size={18} />
                    <Text style={[styles.text, styles.edit,{fontSize:WIDTH*0.05,color:'#F36262'}]}>REMOVE</Text>
                </TouchableOpacity>
            </View>  
        )
        :null
        :(
            <View style={[styles.container,{ top:touchPoint.y-20, left:X-10}]}>
            <View style={styles.row}>
                <TouchableOpacity activeOpacity={0.4} onPress={handleEdit} style={styles.button}>
                    <MaterialIcons name="edit" color='#FACB21' size={22} />
                    <Text style={[styles.text, styles.edit]}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity activeOpacity={0.4} onPress={handleDelete} style={styles.button}>
                    <MaterialCommunityIcons name="delete-outline" color='#F36262' size={22} />
                    <Text style={[styles.text, styles.delete]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    )
}

const styles = new StyleSheet.create({
    container: {
        zIndex:20,position:'absolute',backgroundColor:'#FFF',width:WIDTH*0.28,height:WIDTH*0.33,right:'10%',elevation:5,borderRadius:8,justifyContent:'space-around'
    },
    row: {
        height:'50%',paddingLeft:'8%'
    },
    button: {
        width:'100%',height:'100%',flexDirection:'row',alignItems:'center',paddingTop:'10%'
    },
    text:{
        fontSize:WIDTH*0.043,paddingLeft:'8%'
    },
    edit: {
        color:'#FACB21'
    },
    delete: {
        color:'#F36262'
    },
})

export default ContextMenu;