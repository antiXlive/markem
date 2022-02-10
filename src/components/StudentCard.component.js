import React, { useEffect, useRef, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    PanResponder,
    Animated,
    StyleSheet,
} from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons';
import constants from '@helpers/constants.js';
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const AnimatedStudentCard = (props) => {
    const AnimatedViewRef = useRef();
    const animatedValue = useRef(new Animated.Value(10)).current;
    const position = useRef(new Animated.ValueXY()).current;
    const thumbsAngle = new Animated.Value(0);

    useEffect(() => {
        // animation(20);
        // animatedValue.addListener((v) => {
        //     AnimatedViewRef.current.setNativeProps({
        //         borderWidth:v.value
        //     })
        // })
        // return () => {
        //     animatedValue.removeAllListeners();
        // }
    })
    // const animation = (value) => {
    //     return Animated.timing(animatedValue, {
    //         toValue:value,
    //         duration:1000,
    //         delay:500,
    //         useNativeDriver:false
    //     }).start(() => {
    //             animation(value === 10 ? 20 : 10)
    //         });
    // }
    // let BR = (props.roll);
    // BR = (BR.substr(BR.length - 3));

    const nameLogo = (name) => {
        let nameArray = name.split(' ');
        let nameLogo = nameArray[0].charAt(0) + nameArray[1].charAt(0)
        return nameLogo;
    }

    const formatName = (name) => {
        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        if(name.split(' ').length > 2){
            let splitted = name.split(' ');
            let fls = name.match(/\b(\w)/g);
            fls.pop();
            fls = fls.join('. ');
            fls = fls.concat('.  ',splitted[splitted.length-1]);
            return fls;
        }
        else{
            let newName = name.toLowerCase().split(' ').map(capitalize).join(' ');
            return newName;
        }
    }
    const handleThumbAction = (action) => {
        if(action == 'up'){
            Animated.timing(thumbsAngle, {
                toValue:-15,
                duration:500,
                useNativeDriver:true
            }).start(() => {
            Animated.timing(thumbsAngle, {
                toValue:0,
                duration:500,
                useNativeDriver:true
            }).start()
            });
        }
        else if(action == 'down'){
            Animated.timing(thumbsAngle, {
                toValue:15,
                duration:500,
                useNativeDriver:true
            }).start(() => {
            Animated.timing(thumbsAngle, {
                toValue:0,
                duration:500,
                useNativeDriver:true
            }).start()
            });
        }
    }

    return (
        <>
        {/* <View style={{width: WIDTH * 0.6,alignSelf:'center', borderWidth:1,borderColor:'red'}}> */}
        <Animated.View style={[styles.barStyle1, props.style]}>
            <View style={[styles.barStyle, props.style]}>
             <View style={{ width: '90%', paddingLeft:15}}>
                <Text style={styles.title1}>{formatName(props.name)}</Text>
                <Text style={styles.title2}>{props.roll}</Text>
            </View>
            {/* <View style={{borderWidth:1,width:WIDTH*0.35,height:WIDTH*0.35,position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#F34B3012',borderWidth:10}}>
                <View style={{borderWidth:1,width:'100%',height:'100%',position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#F34B3025',borderWidth:10}}>
                    <View style={{alignItems:'center',justifyContent:'center',position:'absolute',backgroundColor:'transparent', width:'100%',height:'100%', borderRadius:100, borderColor:'#F34B30',borderWidth:1}}>
                        <Text style={{color:'#F34B30',fontSize:WIDTH*0.1,letterSpacing:3,fontWeight:'800'}}>PK</Text>
                    </View>
                </View>
            </View>     */}
            <Animated.View ref={AnimatedViewRef} style={{width:WIDTH*0.42,height:WIDTH*0.42,position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#65D53D12',borderWidth:20}}>
                <View style={{borderWidth:1,width:'100%',height:'100%',position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#65D53D25',borderWidth:10}}>
                    <View style={{alignItems:'center',justifyContent:'center',position:'absolute',backgroundColor:'transparent', width:'100%',height:'100%', borderRadius:100, borderColor:'#65D53D',borderWidth:1}}>
                        <Text style={{color:'#65D53D',fontSize:WIDTH*0.1,letterSpacing:5,fontWeight:'800'}}>{nameLogo(props.name)}</Text>
                    </View>
                </View>
            </Animated.View>    
            {/* <View style={{borderWidth:1,width:WIDTH*0.35,height:WIDTH*0.35,position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#FFFFFF20',borderWidth:10}}>
                <View style={{borderWidth:1,width:'100%',height:'100%',position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#FFFFFF30',borderWidth:10}}>
                    <View style={{alignItems:'center',justifyContent:'center',position:'absolute',backgroundColor:'transparent', width:'100%',height:'100%', borderRadius:100, borderColor:'#FFF',borderWidth:1}}>
                        <Text style={{color:'#FFF',fontSize:WIDTH*0.1,letterSpacing:3,fontWeight:'800'}}>PK</Text>
                    </View>
                </View>
            </View>     */}
            <View style={{marginTop:10}}><Text style={{textAlign:'center', fontSize:WIDTH*0.1, fontWeight:'700', color:'#FFF'}}>{(props.roll).substr((props.roll).length - 3)}</Text></View>
            
            </View>
            <TouchableOpacity onPress={() => handleThumbAction('down')} activeOpacity={0.8} style={{width:80, backgroundColor:'#580816', height:80, borderRadius:20, position:'absolute', bottom:-15, left:-20, alignItems:'flex-end', justifyContent:'flex-start', borderWidth:2, borderColor:'#100C1F',paddingTop:20,paddingRight:20}}>
                <Octicons name="thumbsdown" color="#F34B30" size={20}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleThumbAction('up')} activeOpacity={0.8} style={{width:80, backgroundColor:'#255527', height:80, borderRadius:20, position:'absolute', bottom:-15, right:-20, alignItems:'flex-start', justifyContent:'flex-start', borderWidth:2, borderColor:'#100C1F',paddingTop:20,paddingLeft:20}}>
                {/* <Animated.View style={{transform:[{rotate:`${thumbsAngle}deg`}]}}> */}
                    <Octicons name="thumbsup" color="#65D53D" size={20}/>
                {/* </Animated.View> */}
            </TouchableOpacity>
        </Animated.View>
        {/* </View> */}
        </>
    )
}
const StudentCard = (props) => {
    // let BR = (props.roll);
    // BR = (BR.substr(BR.length - 3));
    return (
        <>
        <View style={{width: WIDTH * 0.6,alignSelf:'center'}}>
        <View style={[styles.barStyle1, props.style]}>
            <View style={[styles.barStyle, props.style]}>
             <View style={{ width: '80%', paddingLeft:20}}>
                <Text style={styles.title1}>Piyush Kumar</Text>
                <Text style={styles.title2}>{props.roll}</Text>
            </View>
            {/* <View style={{borderWidth:1,width:WIDTH*0.35,height:WIDTH*0.35,position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#F34B3012',borderWidth:10}}>
                <View style={{borderWidth:1,width:'100%',height:'100%',position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#F34B3025',borderWidth:10}}>
                    <View style={{alignItems:'center',justifyContent:'center',position:'absolute',backgroundColor:'transparent', width:'100%',height:'100%', borderRadius:100, borderColor:'#F34B30',borderWidth:1}}>
                        <Text style={{color:'#F34B30',fontSize:WIDTH*0.1,letterSpacing:3,fontWeight:'800'}}>PK</Text>
                    </View>
                </View>
            </View>     */}
            <View style={{width:WIDTH*0.42,height:WIDTH*0.42,position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#65D53D12',borderWidth:20}}>
                <View style={{borderWidth:1,width:'100%',height:'100%',position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#65D53D25',borderWidth:10}}>
                    <View style={{alignItems:'center',justifyContent:'center',position:'absolute',backgroundColor:'transparent', width:'100%',height:'100%', borderRadius:100, borderColor:'#65D53D',borderWidth:1}}>
                        <Text style={{color:'#65D53D',fontSize:WIDTH*0.1,letterSpacing:3,fontWeight:'800'}}>PK</Text>
                    </View>
                </View>
            </View>    
            {/* <View style={{borderWidth:1,width:WIDTH*0.35,height:WIDTH*0.35,position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#FFFFFF20',borderWidth:10}}>
                <View style={{borderWidth:1,width:'100%',height:'100%',position:'relative',borderRadius:100,alignSelf:'center',borderColor:'#FFFFFF30',borderWidth:10}}>
                    <View style={{alignItems:'center',justifyContent:'center',position:'absolute',backgroundColor:'transparent', width:'100%',height:'100%', borderRadius:100, borderColor:'#FFF',borderWidth:1}}>
                        <Text style={{color:'#FFF',fontSize:WIDTH*0.1,letterSpacing:3,fontWeight:'800'}}>PK</Text>
                    </View>
                </View>
            </View>     */}
            <View style={{marginTop:10}}><Text style={{textAlign:'center', fontSize:WIDTH*0.11, fontWeight:'700', color:'#FFF'}}>{(props.roll).substr((props.roll).length - 3)}</Text></View>
            
            </View>
            <TouchableOpacity activeOpacity={0.8} style={{width:80, backgroundColor:'#580816', height:80, borderRadius:20, position:'absolute', bottom:-15, left:-20, alignItems:'flex-end', justifyContent:'flex-start', borderWidth:2, borderColor:'#100C1F',paddingTop:20,paddingRight:20}}>
                <Octicons name="thumbsdown" color="#F34B30" size={20}/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{width:80, backgroundColor:'#255527', height:80, borderRadius:20, position:'absolute', bottom:-15, right:-20, alignItems:'flex-start', justifyContent:'flex-start', borderWidth:2, borderColor:'#100C1F',paddingTop:20,paddingLeft:20}}>
                <Octicons name="thumbsup" color="#65D53D" size={20}/>
            </TouchableOpacity>
        </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    barStyle: {
        width: WIDTH * 0.6,
        height: HEIGHT*0.41, 
        borderRadius: 20, 
        paddingTop:20,
        flexDirection: 'column', 
        // backgroundColor: '#3DCCBE20', 
        backgroundColor: '#172936', 
        // marginBottom:20, 
    },
    barStyle1: {
        width: WIDTH * 0.6, 
        height: HEIGHT*0.45, 
        borderRadius: 20, 
        // paddingTop:20,
        flexDirection: 'column', 
        backgroundColor: 'transparent', 
        marginBottom:15, 
        // elevation:5,
        overflow:'hidden'
    },
    title1: {
        fontSize: WIDTH*0.05,
        color:'#FFF',
        marginBottom:HEIGHT*0.005
    },
    title2: {
        fontSize: WIDTH*0.035,
        opacity: 0.8,
        color:'#FFF'
    }

})


export { AnimatedStudentCard, StudentCard };