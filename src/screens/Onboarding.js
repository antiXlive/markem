// import React, { useRef, useState, useEffect } from 'react';

// import {
//     View,
//     Text,
//     StatusBar,
//     StyleSheet,
//     ScrollView
// } from 'react-native';
// import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';


// import constants from '@helpers/constants';
// import {CustomButtonOutlined} from '@components/CustomButton.component.js';
// import OnboardingSlider from '@components/OnboardingSlider';
// import onboardingImage1 from '@assets/onboarding-2.png'
// import Animated from 'react-native-reanimated';

// const WIDTH = constants.WIDTH;
// const HEIGHT = constants.HEIGHT;
// const onboardingData = [
//     {
//         text:"",
//     },
//     {
//         text:"",
//     },
//     {
//         text:"",
//     }
// ]

// const Onboarding = ({ navigation }) => {

//     const [index, setIndex] = useState(0)
//     const scroll = useRef();

//     useEffect(() => {
//         Markem_NavBarColor.setBackgroundColor('#3DCCBE')
//     })


//     const handleSwipe = (index) => {
//         if(scroll.current){
//             if(index != (onboardingData.length-1)){
//                 scroll.current.scrollTo({x:WIDTH*(index+1)+1});
//                 setIndex(index+1)
//             }
//         }
//         if(index == (onboardingData.length - 1)){
//             navigation.navigate('signup');
//         }
//     }
//     return(
//         <>
//         <StatusBar backgroundColor={constants.BLUE2} animated={true}/>
//         <View style={{flexGrow:1, width:WIDTH, height:HEIGHT, backgroundColor:constants.BLUE2}}>
//             {/* <LinearGradient colors={['#3DCCBE', '#46CDB2']} style={{height:HEIGHT}}> */}
//             <ScrollView 
//                 style={{maxHeight:'78%'}} 
//                 ref={scroll} 
//                 horizontal 
//                 snapToInterval={WIDTH} 
//                 showsHorizontalScrollIndicator={false} 
//                 decelerationRate="fast" 
//                 pagingEnabled={true} 
//                 onMomentumScrollEnd={(e) => setIndex(Math.round(Math.floor(e.nativeEvent.contentOffset.x)/WIDTH))}
//                 >
//                 {
//                     onboardingData.map((item, index) => (
//                         <OnboardingSlider key={index} text={item.text} img={onboardingImage1} index={index} click={handleSwipe} />
//                     ))
//                 }
//             </ScrollView>
//             <View style={{width:WIDTH, height: '19%'}}>
//                 <Animated.View style={{height:'20%', marginTop:20, alignItems:'center', paddingLeft:'9%', flexDirection:'row'}}>
//                     {
//                         [...new Array(3)].map((item,i) => (
//                             <View key={i} style={{width:(i === 0?50:7), height:7, borderWidth:1, borderColor:'white', borderRadius:10, marginRight:10, backgroundColor:((i) == index?'white':'transparent')}}></View>                            
//                         ))
//                     }
//                 </Animated.View>
//                 <CustomButtonOutlined style={{marginTop:30, position:'absolute', bottom:0}} label={index === 2?"GET STARTED":"NEXT"} index={index} click={handleSwipe}/>
//             </View>
//         </View>
//         </>
//     )
// }

// export default Onboarding;




















import React, { useRef, useState, useEffect } from 'react';

import {
    View,
    StatusBar,
    Animated,
    StyleSheet,
} from 'react-native';
import { Markem_NavBarColor } from '@helpers/Markem_NativeModules';


import constants from '@helpers/constants';
import {CustomButtonOutlined} from '@components/CustomButton.component.js';
import OnboardingSlider from '@components/OnboardingSlider';
import onboardingImage2 from '@assets/onboarding-2.png'
import onboardingImage1 from '@assets/ob3.1.png'
import onboardingImage3 from '@assets/ob4.png'
import onboardingImage4 from '@assets/ob5.jpg'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;
const onboardingData = [
    {
        key:'1',
        image:onboardingImage1,
        text1:"Old Traditional Method?",
        text2:"Are you still using that old traditional method of pen and paper to mark attendance?",
    },
    {
        key:'2',
        image:onboardingImage2,
        text1:"Export Data",
        text2:"Export all your attendance in a nicely formated pdf anytime anywhere.Get weekly, monthly, semesterly insights of your attendance in an easy way.",
    },
    {
        key:'3',
        image:onboardingImage3,
        text1:"Detailed Statistics",
        text2:"Get detailed insights of all your attendance. Analyze class wise, students wise detailed statistics in an easy way.",
    },
    {
        key:'4',
        image:onboardingImage4,
        text1:"New Smart",
        text2:"Forget that old traditional method",
    }
]

const Onboarding = ({ navigation }) => {

    const [index, setIndex] = useState(0)
    const scroll = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;

    // useEffect(() => {
    //     Markem_NavBarColor.setBackgroundColor('#54dbd5', false)
    // })


    const handleSwipe = (index) => {
        if(scroll.current){
            if(index < (onboardingData.length-1)){
                scroll.current.scrollToIndex({index:index+1});
                setIndex(index+1);
            }
            else{
                console.log("SIGNUP");
                // navigation.navigate('signup')
                navigation.navigate('getStarted')
            }

        }
    }
    return(
        <>
        <StatusBar backgroundColor='#54dbd5' animated={true}/>
        <View style={{width:WIDTH, height:HEIGHT, backgroundColor:'#54dbd5'}}>
            <Animated.FlatList
                ref={scroll}
                data={onboardingData}
                renderItem={({ item, index }) => (
                    <OnboardingSlider key={index} text1={item.text1} text2={item.text2} img={item.image} index={index} scrollX={scrollX} click={handleSwipe} />
                )}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                onMomentumScrollEnd={(e) => setIndex(Math.round(Math.floor(e.nativeEvent.contentOffset.x)/WIDTH))}
                onScroll={Animated.event(
                    [{ nativeEvent: {contentOffset: {x: scrollX } } }],
                    {useNativeDriver:true}
                )}
                scrollEventThrottle={16}
            />

            <View style={{width:WIDTH, height:HEIGHT*0.16}}>
                <Animated.View style={{height:'20%',alignItems:'center', paddingLeft:'9%', flexDirection:'row'}}>
                    {
                        onboardingData.map((item,i) => (
                            <View key={i} style={{width:(i === 0?50:7), height:7, borderWidth:1, borderColor:'white', borderRadius:10, marginRight:10, backgroundColor:((i) == index?'white':'transparent')}}></View>                            
                        ))
                    }
                </Animated.View>
                <CustomButtonOutlined style={{marginTop:10, position:'absolute', bottom:HEIGHT*0.03}} label={index === onboardingData.length-1?"GET STARTED":"NEXT"} index={index} click={handleSwipe}/>
            </View>
        </View>
        </>
    )
}

export default Onboarding;