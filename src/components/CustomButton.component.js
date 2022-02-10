import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'

const WIDTH = Dimensions.get('window').width;

const CustomButtonFilled = (props) => {
    return(
        <TouchableOpacity activeOpacity={0.5} style={[styles.filledButton, props.style]} onPress={props.click}>
            <View>
                <Text style={{fontSize:17, textAlign:'center', color:props.theme=='light'?'#00000090':'white'}}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    )
}
const CustomButtonOutlined = (props) => {
    return(
        <TouchableOpacity activeOpacity={0.5} style={[styles.outlinedButton, props.style]} onPress={() => props.click(props.index)}>
            <View>
                <Text style={{fontSize:17, textAlign:'center', color:'white'}}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    filledButton:{
        alignSelf:'center',
        width: WIDTH * 0.6,
        textAlign:'center',
        // marginTop:40,
        // marginBottom:20,
        borderRadius:WIDTH*0.025,
        height:45,
        justifyContent:'center',
        backgroundColor:'#54dbd5',
        // backgroundColor:'#3DCCBE',
        elevation:5,
    },
    outlinedButton:{
        alignSelf:'center',
        width: WIDTH * 0.7,
        textAlign:'center',
        // marginTop:40,
        // marginBottom:20,
        borderRadius:WIDTH*0.025,
        borderColor:'white',
        borderWidth:1,
        height:45,
        justifyContent:'center',
    },
})
export{
    CustomButtonFilled, 
    CustomButtonOutlined
}