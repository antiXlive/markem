import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';

import constants from '@helpers/constants'
import { NavigationContainer } from '@react-navigation/native';



const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Statistics = ({navigation}) => {
    return(
        <View style={{flex:1, backgroundColor:'#FFF'}}>
            <Text onPress={() => navigation.push('details2', {headerLabel:'DETAILS'})} >STATS</Text>
        </View>
    )
}

export default Statistics;