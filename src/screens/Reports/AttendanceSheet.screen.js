import React,{ useEffect, useState } from 'react';
import {
    Text,
    View,
    PermissionsAndroid,
    TouchableOpacity,
} from 'react-native';
import * as RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_COURSE_STUDENTS} from '@actions/markemAction';
import { DB_fetch_all_attendance } from '@db/fetcher';

import constants from '@helpers/constants'
const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;


const AttendanceSheet = () => {

    const dispatch = useDispatch();

    const [allStudents, setAllStudents] = useState();
    useEffect(() => {
        dispatch(LOAD_COURSE_STUDENTS(1, 1, 'together'));
    },[])
    let COURSE_STUDENTS = useSelector((state) => state.markemReducer.courseStudents);
    // console.log(COURSE_STUDENTS)

    // if(COURSE_STUDENTS.length > 0){
    //     let data = [];
    //     for(let i in COURSE_STUDENTS){
    //         console.log(i);
    //     }
    //     // COURSE_STUDENTS.map((student) => {
    //     //     console.log(student);
    //     //     data.push({'Student':student.name});
    //     // })
    //     // console.log(data);
    //     // setAllStudents(data);
    // }
    // console.log(allStudents.length>0?allStudents:'')

   
    let data1 = [
        {"Student":"John"},
        {"Student":"Mike"},
        {"Student":"Zach"}
    ];
    const handleSave = async() => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: "Permission",
                message: "MARKEM needs Storage Permission"
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                let attendances = [];
                let data = [];

                code = 'CS 330'
                code = code.replace(/ /g,'');
                let result = await DB_fetch_all_attendance(code);
                let i = 0;
                while(i < result.rows.length){
                    let attendance = result.rows.item(i); 
                    attendances.push(
                        {
                            'attendance':JSON.parse(attendance.attendance), 
                            'date':attendance.date
                        }
                    )
                    i++;
                }
                // console.log(attendances)

                
                for(let i in COURSE_STUDENTS){
                    let exists = attendances[0].attendance.includes(COURSE_STUDENTS[i].roll)
                    if(exists){
                        data.push(
                            {
                                'Student':COURSE_STUDENTS[i].roll,
                                'Attendance':'A'
                            }
                        );
                    }
                    else{
                        data.push(
                            {
                                'Student':COURSE_STUDENTS[i].roll,
                                'Attendance':'P'
                            }
                        );
                    }
                }

                let ws = XLSX.utils.json_to_sheet(data);
                let wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "PIYUSH");
                const piyush = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

                var folder = RNFS.ExternalStorageDirectoryPath + '/markem';
                RNFS.mkdir(folder);
                var path = RNFS.ExternalStorageDirectoryPath + '/markem/piyush.xlsx';
                RNFS.writeFile(path, piyush, 'ascii')
                    .then((r) => console.log(r))
                    .catch((e) => console.log(e));
            }
        }catch (err) {
            console.log(err);
        }


    }
    return(
        <View style={{width:WIDTH,height:HEIGHT,backgroundColor:'#FFF'}}>
            <Text onPress={handleSave}>{JSON.stringify(data1)}</Text>
        </View>
    )
}

export default AttendanceSheet;