import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const DateCard = (props) => {
    const date = new Date();
    let day = date.toLocaleString("default", {weekday:"short"});
    day = day.split(" ");
    
    return(
        <View style={[styles.dateContainer, props.style]}>
            <View style={{width:10, height:10, backgroundColor:'white', alignSelf:'center', borderRadius:50}}></View>
            <View style={{flexDirection:'row', alignItems:'center', paddingLeft:7}}>
                <Text style={{fontSize:15, color:'white', textTransform:'uppercase'}}>{day[0]},  </Text>
                <Text style={{fontSize:15, color:'white', textTransform:'uppercase'}}>{day[1]} </Text>
                <Text style={{fontSize:15, color:'white', textTransform:'uppercase'}}>{day[2]} </Text>
                <Text style={{fontSize:15, color:'white', textTransform:'uppercase'}}>{day[4]}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dateContainer: {
        width:150,
        height:30,
        alignSelf:'center',
        borderRadius:100,
        backgroundColor:'#3DCCBE',
        flexDirection:'row',
        paddingHorizontal:10,
        justifyContent:'space-around'
    }
})

export default DateCard;