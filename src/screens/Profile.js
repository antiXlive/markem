import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';

import constants from '@helpers/constants'
// import {BorderedBar} from '@components/BorderedBar';


const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const Profile = ({navigation}) => {

    const handlePress = () => {
        navigation.push('details3', {headerLabel:'DETAILS'})
    }
    return(
        <View style={{flex:1, backgroundColor:'#FFF'}}>
            <View style={styles.profileBar}>
                <View style={styles.imageContainer}></View>
                <View style={styles.profileDetails}>
                    <Text style={{fontWeight:'500', fontSize:20}}>Piyush Kumar</Text>
                    <Text style={{fontWeight:'600', fontSize:15, opacity:0.5}}>Assistant Professor</Text>
                    <Text style={{fontWeight:'600', fontSize:13, opacity:0.5}}>Computer Science & Engineering</Text>
                    <Text style={{fontWeight:'600', fontSize:13, opacity:0.5}}>piyush107@iiitmanipur.ac.in</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20, }}>
            <View style={{paddingVertical:20, alignItems:'center'}}>
                {/* <BorderedBar click={handlePress}/>
                <BorderedBar click={handlePress}/>
                <BorderedBar click={handlePress}/>
                <BorderedBar click={handlePress}/>
                <BorderedBar click={handlePress}/>
                <BorderedBar click={handlePress}/>
                <BorderedBar click={handlePress}/>
                <BorderedBar click={handlePress}/>
                <BorderedBar click={handlePress}/>
                <BorderedBar click={handlePress}/> */}
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileBar: {
        // alignSelf:'flex-end',
        // justifyContent:'flex-start',
        width:WIDTH,
        alignSelf:"center",
        height:HEIGHT*0.15,
        marginTop:HEIGHT*0.08,
        flexDirection:'row',
        // paddingLeft:10
        // borderWidth:1
    },
    imageContainer: {
        width:HEIGHT*0.15,
        height:HEIGHT*0.15,
        borderRadius:100,
        position:'absolute',
        bottom:'6%',
        left:10,
        backgroundColor:'#ECECEC'
    },
    profileDetails: {
        width:'70%',
        height:'90%',
        backgroundColor:'#03B89816',
        marginLeft:'25%',
        zIndex:-1,
        paddingLeft:'12%',
        justifyContent:'center'
    }
})

export default Profile;