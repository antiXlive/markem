import React, {useState} from 'react';
import {
    View,
    Text,
    Modal,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Animated,
    StyleSheet

} from 'react-native';

import { CourseBar } from '@components/CourseBar.component';
import StudentBar from '@components/StudentBar.component';
import { CustomButtonFilled } from '@components/CustomButton.component';
import CardButton from '@components/CardButton.component';
import TopTabBar from '@components/TopTabBar.component';



import constants from '@helpers/constants'

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const ClassStudents = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [x, setX] = useState(0);
    const [translateActive, setTranslateActive] = useState(new Animated.Value(0));
    const [showModal, setShowModal] = useState(false);

const handleSlide = (tab) => {
    let move = 0;
    if(tab === 0){
        setActiveTab(0);
        move = 0;
    }
    else if(tab == 1){
        setActiveTab(1);
        move = x;
    }
    Animated.spring(translateActive, {
        toValue: move,
        duration: 100,
        useNativeDriver:false
    }).start();
}

const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
}
const handlePress = () => {

}
const handleSwitch = (tabIndex) => {
    setActiveTab(tabIndex);
}

const tabs = ['Registered Students', 'Backlog Students'];
    return(
        <>
        <StatusBar backgroundColor={showModal?'#7E7E7E':'#FFF'} barStyle="dark-content"/>
        <View style={{width:WIDTH,alignItems:'center',paddingTop:HEIGHT*0.1,backgroundColor:'#FFF',height:HEIGHT}}>
            {/* <BorderedBar/> */}
            <View style={{marginTop:HEIGHT*0.01, marginTop:HEIGHT*0.025}}>
                <TopTabBar tabs={tabs} click={handleSwitch}/>
            </View>
            <ScrollView style={{maxHeight:'69%',marginTop:HEIGHT*0.04,marginBottom:HEIGHT*0.05,paddingTop:HEIGHT*0.01,width:WIDTH}} showsVerticalScrollIndicator={false}>
                {
                    activeTab === 0
                    ?
                    <View style={{paddingBottom:HEIGHT*0.03}}>
                        <StudentBar count={1}/>
                        <StudentBar count={2}/>
                        <StudentBar count={3}/>
                        <StudentBar count={5}/>
                        <StudentBar count={6}/>
                        <StudentBar count={7}/>
                        <StudentBar count={8}/>
                        <StudentBar count={9}/>
                    </View>
                    :
                    <View style={{paddingBottom:HEIGHT*0.03}}>
                        <StudentBar count={1}/>
                        <StudentBar count={2}/>
                        <StudentBar count={3}/>
                    </View>
                }
            </ScrollView>
            <CustomButtonFilled label="ADD NEW STUDENT" click={handleClick} style={{width: WIDTH*0.6}}/>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={{paddingTop:20, paddingHorizontal:30,height:HEIGHT*0.5, position:'absolute', bottom:0, width:WIDTH, backgroundColor:'#FFF', borderTopLeftRadius:35, borderTopRightRadius:35}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <Text style={{width:'90%', fontSize:18, opacity:0.8}}>Add New</Text>
                            <Text style={{width:'10%',fontSize:25,textAlign:'center'}} onPress={() => setShowModal(false)}>X</Text>
                        </View>
                        <View style={{height:'60%',paddingTop:'10%',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
                            <CardButton label="Student" iconParent="Ionicons" icon="newspaper-outline" action={handlePress}/>
                            <CardButton label="Back Logger" iconParent="Ionicons" icon="newspaper-outline" action={handlePress}/>
                        </View>
                        <CustomButtonFilled label="CONTINUE" style={{width:WIDTH*0.5, height:40}}/>
                    </View>
                </View>
               
            </Modal>
        </View>
        </>
    )
}

const styles = new StyleSheet.create({
    tab: {
        width:WIDTH*0.9/2,
        alignItems:'center',
        justifyContent:'center',
        height:HEIGHT*0.06,
    },
    tab_Text: {
        fontSize:WIDTH*0.04,
        opacity:0.6
    },
})

export default ClassStudents;