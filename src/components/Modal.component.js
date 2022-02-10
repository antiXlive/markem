import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import constants from '@helpers/constants';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const Modal = (props) => {
    return(
        <View style={styles.modal}>
            {props.children}
        </View>
    )
}

const styles = new StyleSheet.create({
    modal:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height:HEIGHT,
        width:WIDTH,
        backgroundColor:'#00000030',
        zIndex:100
    }
})

export default Modal