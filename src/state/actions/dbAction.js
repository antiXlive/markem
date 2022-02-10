import { useSelector, useDispatch } from 'react-redux';
import {
    DB_fetch_programmes, DB_fetch_batches, DB_fetch_departments, DB_fetch_courses, DB_fetch_students, DB_fetch_course_students, DB_fetch_classes, DB_fetch_attendance,
} from '@db/fetcher';
import { DB_register_student } from '@db/updater';
import { DB_delete_programme, DB_delete_batch, DB_delete_department, DB_delete_course, DB_delete_course_attendance, DB_delete_student} from '@db/deleter';
import { commaRemover } from '@helpers/functions';




// ******************************SETTER******************************
export const setSelectedProgramme = (programme) => ({
    type:'SET_SELECTED_PROGRAMME',
    payload:programme
});
export const setSelectedBatch = (batch) => ({
    type:'SET_SELECTED_BATCH',
    payload:batch
});
export const setSelectedDepartment = (department) => ({
    type:'SET_SELECTED_DEPARTMENT',
    payload:department
});
// ******************************SETTER******************************






// ******************************LOADER******************************
export const LOAD_PROGRAMMES = () => {
    return async dispatch => {
        const result = await DB_fetch_programmes();
        const ALL_PROGRAMMES = [];
        let i = 0;
        while(i < result.rows.length){
            ALL_PROGRAMMES.push(result.rows.item(i));
            i++;
        }
        dispatch({type:'SET_PROGRAMMES', payload:ALL_PROGRAMMES});
    }
};
export const LOAD_BATCHES = (ID) => {
    return async dispatch => {
        dispatch({type:'SET_LOADING', payload:true});
        const result = await DB_fetch_batches(ID);
        const BATCHES = [];
        let i = 0;
        while(i < result.rows.length){
            BATCHES.push(result.rows.item(i));
            i++;
        }
        dispatch({type:'SET_BATCHES', payload:BATCHES});
    }
};
export const LOAD_DEPARTMENTS = (PROGRAMME_ID, BATCH_ID) => {
    return async dispatch => {
        dispatch({type:'SET_LOADING', payload:true});
        const result = await DB_fetch_departments(PROGRAMME_ID, BATCH_ID);
        const DEPARTMENTS = [];
        let i = 0;
        while(i < result.rows.length){
            DEPARTMENTS.push(result.rows.item(i));
            i++;
        }
        dispatch({type:'SET_DEPARTMENTS', payload:DEPARTMENTS});
    }
};
export const LOAD_COURSES = ( PROGRAMME_ID ) => {
    return async dispatch => {
        let btech = [];
        let mtech = [];
        let phd = [];
        for(let i=1 ;i<=3;i++){
            const result = await DB_fetch_courses(i);
            let j = 0;
            while(j < result.rows.length){
                if(i==1){btech.push(result.rows.item(j));}
                if(i==2){mtech.push(result.rows.item(j));}
                if(i==3){phd.push(result.rows.item(j));}
                j++;
            }
        }
        let data = {b:btech,m:mtech,p:phd};
        dispatch({type:'SET_COURSES', payload:data});
    }
};
export const LOAD_STUDENTS = ( PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID ) => {
    return async dispatch => {
        dispatch({type:'SET_LOADING', payload:true});
        const result = await DB_fetch_students(PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID);
        const STUDENTS = [];
        let i = 0;
        while(i < result.rows.length){
            STUDENTS.push(result.rows.item(i));
            i++;
        }
        dispatch({type:'SET_STUDENTS', payload:STUDENTS});
    }
};
export const LOAD_COURSE_STUDENTS = ( PROGRAMME_ID,COURSE_ID ) => {
    return async dispatch => {
        const result = await DB_fetch_course_students(PROGRAMME_ID, COURSE_ID);
        let x = result.rows.item(0);
        x = x.registered_students;
        let parsed = JSON.parse(x);
        dispatch({type:'SET_COURSE_STUDENTS', payload:parsed});
    }
};
// export const loadClass = () => {
//     return async dispatch => {
//         const result = await fetchProgrammes();
//         const ALL_PROGRAMMES = [];
//         let i = 0;
//         while(i < result.rows.length){
//             ALL_PROGRAMMES.push(result.rows.item(i));
//             i++;
//         }
//         dispatch({type:'SET_PROGRAMMES', payload:ALL_PROGRAMMES});
//     }
// };
// export const loadAttendance = () => {
//     return async dispatch => {
//         const result = await fetchProgrammes();
//         const ALL_PROGRAMMES = [];
//         let i = 0;
//         while(i < result.rows.length){
//             ALL_PROGRAMMES.push(result.rows.item(i));
//             i++;
//         }
//         dispatch({type:'SET_PROGRAMMES', payload:ALL_PROGRAMMES});
//     }
// };
// ******************************LOADER******************************


// ******************************UPDATER******************************
export const UPDATE_PROGRAMME = (short_name, full_name, id) => {
    return async dispatch => {
        const result = await updateProgramme(short_name, full_name, (id-1));
    }
};




// ******************************UPDATER******************************



// ******************************DELETER******************************
export const DELETE_PROGRAMME = (id) => {
    return async dispatch => {
        const result = await DB_delete_programme(id);
    }
};
export const DELETE_BATCH = (id) => {
    return async dispatch => {
        const result = await DB_delete_batch(id);
    }
};
export const DELETE_DEPARTMENT = (id) => {
    return async dispatch => {
        const result = await DB_delete_department(id);

    }
};
export const DELETE_COURSE = (id) => {
    return async dispatch => {
        const result = await DB_delete_course(id);

    }
};
export const DELETE_COURSE_ATTENDANCE = (code) => {
    return async dispatch => {
        await DB_delete_course_attendance(code);

    }
};
export const DELETE_STUDENT = (id) => {
    return async dispatch => {
        const result = await DB_delete_student(id);
    }
};
// ******************************DELETER******************************

export const REGISTER_COURSE_STUDENTS = (type,Batches,Departments,Students, COURSE_ID, PROGRAMME_ID, COURSE_STUDENTS) => {
    return async dispatch => {
        console.log('------------------------------------------------------------------------------------------');
        let data;
        if(type == 'new'){
            data = {
                'new':{
                    batches:Batches,
                    departments:Departments,
                    students:Students,
                },
                'backloggers':COURSE_STUDENTS.backloggers
            }
        }
        if(type == 'backlog'){
            data = {
                'new':COURSE_STUDENTS.new,
                'backloggers':{
                    batches:Batches,
                    departments:Departments,
                    students:Students
                }
            }

        }

        data = JSON.stringify(data);
        // let data;
        // if(type == 'new'){
        //     if(COURSE_STUDENTS.length == 0){
        //         let nB = Batches.length > 0 ? Batches : '';
        //         let nD = Departments.length > 0 ? Departments : '';
        //         let nS = Students.length > 0 ? Students : '';
        //         data = {
        //             new:{
        //                 batches: nB,
        //                 departments: nD,
        //                 students: nS
        //             },
        //             backloggers:{}
        //         }
        //     }
        //     else{
        //         let eB = COURSE_STUDENTS.new.batches && COURSE_STUDENTS.new.batches.length > 0 ? COURSE_STUDENTS.new.batches : '';
        //         let nB = Batches.length > 0 ? Batches : '';
        //         let eD = COURSE_STUDENTS.new.departments && COURSE_STUDENTS.new.departments.length > 0 ? COURSE_STUDENTS.new.departments : '';
        //         let nD = Departments.length > 0 ? Departments : '';
        //         let eS = COURSE_STUDENTS.new.students && COURSE_STUDENTS.new.students.length > 0 ? COURSE_STUDENTS.new.students : '';
        //         let nS = Students.length > 0 ? Students : '';

        //         let fB = eB + ',' + nB;
        //         let fD = eD + ',' + nD;
        //         let fS = eS + ',' + nS;
        //         fB = commaRemover(fB);
        //         fD = commaRemover(fD);
        //         fS = commaRemover(fS);
        //         data = {
        //             new:{
        //                 batches: fB,
        //                 departments: fD,
        //                 students: fS
        //             },
        //             backloggers:COURSE_STUDENTS.backloggers
        //         }               
        //     }
        // }
        // if(type == 'backlog'){
        //     console.log('12',COURSE_STUDENTS)
        // //     if(COURSE_STUDENTS.length == 0){
        // //         let nB = Batches.length > 0 ? Batches : '';
        // //         let nD = Departments.length > 0 ? Departments : '';
        // //         let nS = Students.length > 0 ? Students : '';
        // //         data = {
        // //             new:{},
        // //             backloggers:{
        // //                 batches: nB,
        // //                 departments: nD,
        // //                 students: nS
        // //             }
        // //         }
        // //     }
        // //     else{
        // //         let eB = COURSE_STUDENTS.backloggers.batches && COURSE_STUDENTS.backloggers.batches.length > 0 ? COURSE_STUDENTS.backloggers.batches : '';
        // //         let nB = Batches.length > 0 ? Batches : '';
        // //         let eD = COURSE_STUDENTS.backloggers.departments && COURSE_STUDENTS.backloggers.departments.length > 0 ? COURSE_STUDENTS.backloggers.departments : '';
        // //         let nD = Departments.length > 0 ? Departments : '';
        // //         let eS = COURSE_STUDENTS.backloggers.students && COURSE_STUDENTS.backloggers.students.length > 0 ? COURSE_STUDENTS.backloggers.students : '';
        // //         let nS = Students.length > 0 ? Students : '';
        // //         let fB = eB + ',' + nB;
        // //         let fD = eD + ',' + nD;
        // //         let fS = eS + ',' + nS;
        // //         fB = commaRemover(fB);
        // //         fD = commaRemover(fD);
        // //         fS = commaRemover(fS);
        // //         data = {
        // //             new:COURSE_STUDENTS.new,
        // //             backloggers:{
        // //                 batches: fB,
        // //                 departments: fD,
        // //                 students: fS
        // //             }
        // //         }
        // //     }
        // }
        // let parsedData = JSON.stringify(data);
        // console.log(parsedData);
        // let p1 = JSON.parse(parsedData);
        // console.log(p1.backloggers.students, typeof(p1.backloggers.students));
        console.log(data, typeof(data));
        // const result = await DB_register_student(data, COURSE_ID, PROGRAMME_ID);
    }
};