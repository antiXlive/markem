import { DB_create_attendance_table } from '@db/db';
import { DB_save_programme, DB_save_batch, DB_save_department, DB_save_course, DB_save_student, DB_check_attendance_table, DB_get_attendance_table_columns, DB_get_attendance_data,DB_save_attendance, DB_add_attendance_column } from '@db/saver';
import { DB_update_programme, DB_update_batch, DB_update_department, DB_update_course, DB_update_student, DB_register_student, DB_update_class, DB_update_attendance} from '@db/updater';
import { verifySingleProgramme, verifySingleBatch, verifySingleDepartment, verifySingleCourse, verifySingleStudent } from '@helpers/functions.js';
import {
    DB_fetch_programmes,DB_fetch_program_course, DB_fetch_batches, DB_fetch_departments, DB_fetch_batch_students, DB_fetch_attendance, DB_fetch_all_attendance, DB_fetch_department_students, DB_fetch_id_students
} from '@db/fetcher';


export const INITIALIZE_PROGRAMMES = async( shortName, fullName ) => {
    if(shortName && fullName){
        const result = await DB_fetch_programmes();
        const ALL_PROGRAMMES = [];
        let i = 0;
        while(i < result.rows.length){
            ALL_PROGRAMMES.push(result.rows.item(i));
            i++;
        }
        const response = verifySingleProgramme([shortName, fullName], ALL_PROGRAMMES);
        if(response.x === 'valid' && response.y === 'valid'){
            await DB_save_programme(shortName, fullName);
            return 'SAVED';
        }
    }
}
export const SAVE_HANDLER_PG = async( pgShortName, pgFullName, ALL_PROGRAMMES, empty ) => {
    if(pgShortName && pgFullName){
        const response = verifySingleProgramme([pgShortName, pgFullName], ALL_PROGRAMMES);
        if(response.x === 'valid' && response.y === 'valid'){
            await DB_save_programme(pgShortName, pgFullName);
            return 'SAVED';
        }
        else{
            let empty1 = [...empty];
            if(response.x === 'invalid'){
                empty1[0] = {status:1, msg:'Programme with this value already exist!'}
            }
            else{
                empty1[0] = {status:0, msg:''}
            }
            if(response.y === 'invalid'){
                empty1[1] = {status:1, msg:'Programme with this value already exist!'}
            }
            else{
                empty1[1] = {status:0, msg:''}
            }
            return empty1;
        }
    }
    else{
        let empty1 = [...empty];
        if(!pgShortName){
            empty1[0] = {status:1, msg:'Short Name is required'}
        }
        if(!pgFullName){
            empty1[1] = {status:1, msg:'Full Name is required'}
        }
        return empty1;
    }
}

export const UPDATE_HANDLER_PG = async( pgShortName, pgFullName, ALL_PROGRAMMES, empty, ID, index ) => {
    let sn = pgShortName.toLowerCase();
    let fn = pgFullName.toLowerCase();
    let sn1 = ALL_PROGRAMMES[index].short_name.toLowerCase();
    let fn1 = ALL_PROGRAMMES[index].full_name.toLowerCase();
    
    if(pgShortName && pgFullName){
        if(pgShortName === ALL_PROGRAMMES[index].short_name && pgFullName === ALL_PROGRAMMES[index].full_name){
            return {edited:'no'};
        }
        else{
            const response = verifySingleProgramme([pgShortName, pgFullName], ALL_PROGRAMMES);
            if(response.x === 'valid' && response.y === 'valid'){
                const result = await DB_update_programme(pgShortName, pgFullName, ID);
                return {updated:true}
            }
            else{
                let flag1 = 0, flag2 = 0;
                let empty1 = [...empty];
                if(response.x === 'invalid' && sn !== sn1){
                    empty1[0] = {status:1, msg:'Programme with this value already exist!'}``
                }
                else{
                    empty1[0] = {status:0, msg:''}
                    flag1 = 1;
                }
                if(response.y === 'invalid' && fn !== fn1){
                    empty1[1] = {status:1, msg:'Programme with this value already exist!'}
                }
                else{
                    empty1[1] = {status:0, msg:''}
                    flag2 = 1;
                }
                if(flag1 && flag2){
                    const result = await DB_update_programme(pgShortName, pgFullName, ID);
                    return {updated:true}
                }
                else{
                    return {error:empty1};
                }
            }
        }
    }
    else{
        let empty1 = [...empty];
        empty1[0] = {status:1, msg:'Short Name is required'}
        empty1[1] = {status:1, msg:'Full Name is required'}
        return {error:empty1};
    }
}






export const SAVE_HANDLER_BT = async( ID, startYear, passoutYear, BATCHES, empty ) => {
    if(startYear && passoutYear){
        if(String(startYear).length > 3 && String(passoutYear).length > 3){
            const response = verifySingleBatch([startYear, passoutYear], BATCHES);
            if(response.x === 'valid' && response.y === 'valid'){
                await DB_save_batch(ID, startYear, passoutYear);
                return 'SAVED';
            }
            else{
                let empty1 = [...empty];
                if(response.x === 'invalid'){
                    empty1[0] = {status:1, msg:'Programme with this value already exist!'}
                }
                else{
                    empty1[0] = {status:0, msg:''}
                }
                if(response.y === 'invalid'){
                    empty1[1] = {status:1, msg:'Programme with this value already exist!'}
                }
                else{
                    empty1[1] = {status:0, msg:''}
                }
                return {error:empty1};
            }
        }
        else{
            let empty1 = [...empty];
            if(startYear.length < 4){
                empty1[0] = {status:1, msg:'Enter a valid Year'}
            }
            if(passoutYear.length < 4){
                empty1[1] = {status:1, msg:'Enter a valid Year'}
            }
            return {error:empty1};
        }
    }
    else{
        let empty1 = [...empty];
        if(!startYear){
            empty1[0] = {status:1, msg:'Start Year is required'}
        }
        else if(startYear.length < 4){
            empty1[0] = {status:1, msg:'Enter a valid Start Year'}
        }
        if(!passoutYear){
            empty1[1] = {status:1, msg:'Passout Year is required'}
        }
        else if(passoutYear.length < 4){
            empty1[1] = {status:1, msg:'Enter a valid Passout Year'}
        }
        return {error:empty1};
    }
}

export const UPDATE_HANDLER_BT = async( startYear, passoutYear, BATCHES, empty, ID, index, PgID ) => {
    let se1 = BATCHES[index].start_year;
    let pe1 = BATCHES[index].passout_year;
    
    if(startYear && passoutYear){
        if(startYear === BATCHES[index].start_year && passoutYear === BATCHES[index].passout_year){
            return {edited:'no'};
        }
        else{
            const response = verifySingleBatch([startYear, passoutYear], BATCHES);
            console.log(response);
            if(response.x === 'valid' && response.y === 'valid'){
                const result = await DB_update_batch(startYear, passoutYear, ID, PgID);
                return {updated:true}
            }
            else{
                let flag1 = 0, flag2 = 0;
                let empty1 = [...empty];
                console.log(response);
                if(response.x === 'invalid' && startYear !== se1){
                    empty1[0] = {status:1, msg:'Batch with this start year already exist!'}
                }
                else{
                    empty1[0] = {status:0, msg:''}
                    flag1 = 1;
                }
                if(response.y === 'invalid' && passoutYear !== pe1){
                    empty1[1] = {status:1, msg:'Batch with this passout year already exist!'}
                }
                else{
                    empty1[1] = {status:0, msg:''}
                    flag2 = 1;
                }
                if(flag1 && flag2){
                    const result = await DB_update_batch(startYear, passoutYear, ID, PgID);
                    return {updated:true}
                }
                else{
                    return {error:empty1};
                }
            }
        }
    }
}






export const SAVE_HANDLER_DEPARTMENT = async( shortName, fullName, DEPARTMENTS, empty, BATCH_ID, PROGRAMME_ID ) => {   
    if(shortName && fullName){
        const response = verifySingleDepartment([shortName, fullName], DEPARTMENTS);
        if(response.x === 'valid' && response.y === 'valid'){
            await DB_save_department(shortName, fullName, PROGRAMME_ID, BATCH_ID);
            return 'SAVED';
        }
        else{
            let empty1 = [...empty];
            if(response.x === 'invalid'){
                empty1[0] = {status:1, msg:'Department with this value already exist!'}
            }
            else{
                empty1[0] = {status:0, msg:''}
            }
            if(response.y === 'invalid'){
                empty1[1] = {status:1, msg:'Department with this value already exist!'}
            }
            else{
                empty1[1] = {status:0, msg:''}
            }
            return {error:empty1};
        }
    }
    else{
        let empty1 = [...empty];
        if(!shortName){
            empty1[0] = {status:1, msg:'Short Name is required'}
        }
        if(!fullName){
            empty1[1] = {status:1, msg:'Full Name is required'}
        }
        return {error:empty1};
    }
}

export const UPDATE_HANDLER_DEPARTMENT = async( shortName, fullName, DEPARTMENTS, empty, departmentID, BATCH_ID, PROGRAMME_ID, index ) => {
    let sn = shortName.toLowerCase();
    let fn = fullName.toLowerCase();
    let sn1 = DEPARTMENTS[index].short_name.toLowerCase();
    let fn1 = DEPARTMENTS[index].full_name.toLowerCase();
    
    if(sn && fn){
        if(sn === sn1 && fn === fn1){
            return {edited:'no'};
        }
        else{
            const response = verifySingleDepartment([shortName, fullName], DEPARTMENTS);
            console.log(response);
            if(response.x === 'valid' && response.y === 'valid'){
                const result = await DB_update_department(shortName, fullName, departmentID, PROGRAMME_ID, BATCH_ID);
                return {updated:true}
            }
            else{
                let flag1 = 0, flag2 = 0;
                let empty1 = [...empty];
                console.log(response);
                if(response.x === 'invalid' && sn !== sn1){
                    empty1[0] = {status:1, msg:'Department with this short name already exist!'}
                }
                else{
                    empty1[0] = {status:0, msg:''}
                    flag1 = 1;
                }
                if(response.y === 'invalid' && fn !== fn1){
                    empty1[1] = {status:1, msg:'Department with this full name already exist!'}
                }
                else{
                    empty1[1] = {status:0, msg:''}
                    flag2 = 1;
                }
                if(flag1 && flag2){
                    const result = await DB_update_department(shortName, fullName, departmentID, PROGRAMME_ID, BATCH_ID);
                    return {updated:true}
                }
                else{
                    return {error:empty1};
                }
            }
        }
    }
}






export const SAVE_HANDLER_COURSE = async( code, title, semester, PROGRAMME_ID, empty, COURSES ) => {    
    if(code && title && semester){
        const response = verifySingleCourse([code, title, semester], COURSES);
        if(response.x === 'valid' && response.y === 'valid'){
            await DB_save_course(code, title, semester, PROGRAMME_ID);
            await DB_create_attendance_table(code);
            return 'SAVED';
        }
        else{
            let empty1 = [...empty];
            if(response.x === 'invalid'){
                empty1[0] = {status:1, msg:'Course with this code already exist!'}
            }
            else{
                empty1[0] = {status:0, msg:''}
            }
            if(response.y === 'invalid'){
                empty1[1] = {status:1, msg:'Course with this title already exist!'}
            }
            else{
                empty1[1] = {status:0, msg:''}
            }
            // if(response.z === 'invalid'){
            //     empty1[2] = {status:1, msg:'Course with this semester already exist!'}
            // }
            // else{
            //     empty1[2] = {status:0, msg:''}
            // }
            return {error:empty1};
        }
    }
    else{
        let empty1 = [...empty];
        if(!code){
            empty1[0] = {status:1, msg:'Course code is required'}
        }
        if(!title){
            empty1[1] = {status:1, msg:'Course title is required'}
        }
        if(!semester){
            empty1[2] = {status:1, msg:'Course semester is required'}
        }
        return {error:empty1};
    }
}

export const UPDATE_HANDLER_COURSE = async( code, title, semester, PROGRAMME_ID, empty, index, COURSES, ID ) => {
    let c = code.toLowerCase();
    let t = title.toLowerCase();
    let s = semester
    let c1 = COURSES[index].course_code.toLowerCase();
    let t1 = COURSES[index].course_title.toLowerCase();
    let s1 = COURSES[index].course_semester;
    
    if(c && t && s){
        if(c === c1 && t === t1 && s === s1){
            return {edited:'no'};
        }
        else{
            const response = verifySingleCourse([code, title, semester], COURSES);
            if(response.x === 'valid' && response.y === 'valid'){
                const result = await DB_update_course(code, title, semester, ID, PROGRAMME_ID);
                return {updated:true}
            }
            else{
                let flag1 = 0, flag2 = 0, flag3 =0;
                let empty1 = [...empty];
                if(response.x === 'invalid' && c !== c1){
                    empty1[0] = {status:1, msg:'Course with this code already exist!'}
                }
                else{
                    empty1[0] = {status:0, msg:''}
                    flag1 = 1;
                }
                if(response.y === 'invalid' && t !== t1){
                    empty1[1] = {status:1, msg:'Course with this title already exist!'}
                }
                else{
                    empty1[1] = {status:0, msg:''}
                    flag2 = 1;
                }
                if(response.z === 'invalid'){
                    // empty1[2] = {status:1, msg:'Course with this semester already exist!'}
                    empty1[2] = {status:0, msg:''}
                    flag3 = 1;
                }
                else{
                    empty1[2] = {status:0, msg:''}
                    flag3 = 1;
                }
                if(flag1 && flag2 && flag3){
                    const result = await DB_update_course(code, title, semester, ID, PROGRAMME_ID);
                    return {updated:true}
                }
                else{
                    return {error:empty1};
                }
            }
        }
    }
}






export const SAVE_HANDLER_STUDENT = async( name, roll, email, PROGRAMME_ID,  BATCH_ID, DEPARTMENT_ID, empty, STUDENTS) => {    
    if(name && roll && email){
        const response = verifySingleStudent([name, roll, email], STUDENTS);
        if(response.x === 'valid' && response.y === 'valid' && response.z === 'valid'){
            await DB_save_student(name, roll, email, PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID);
            return 'SAVED';
        }
        else{
            let empty1 = [...empty];
            if(response.x === 'invalid'){
                empty1[3] = {status:1, msg:'Student with this name already exist!'}
            }
            else{
                empty1[3] = {status:0, msg:''}
            }
            if(response.y === 'invalid'){
                empty1[4] = {status:1, msg:'Student with this roll already exist!'}
            }
            else{
                empty1[4] = {status:0, msg:''}
            }
            if(response.z === 'invalid'){
                empty1[5] = {status:1, msg:'Student with this email already exist!'}
            }
            else{
                empty1[5] = {status:0, msg:''}
            }
            return {error:empty1};
        }
    }
    else{
        let empty1 = [...empty];
        if(!name){
            empty1[3] = {status:1, msg:'Full Name is required'}
        }
        if(!roll){
            empty1[4] = {status:1, msg:'Roll no. is required'}
        }
        if(!email){
            empty1[5] = {status:1, msg:'Email Address is required'}
        }
        return {error:empty1};
    }
}

export const UPDATE_HANDLER_STUDENT = async( name, roll, email, PROGRAMME_ID,  BATCH_ID, DEPARTMENT_ID, empty, STUDENTS, index, ID ) => {
    let n = name.toLowerCase();
    let r = roll.toLowerCase();
    let e = email.toLowerCase();
    let n1 = STUDENTS[index].full_name.toLowerCase();
    let r1 = STUDENTS[index].roll.toLowerCase();
    let e1 = STUDENTS[index].email.toLowerCase();
    
    if(n && r && e){
        if(n === n1 && r === r1 && e === e1){
            return {edited:'no'};
        }
        else{
            const response = verifySingleStudent([name, roll, email], STUDENTS);
            if(response.x === 'valid' && response.y === 'valid' && z === 'valid'){
                const result = await DB_update_student(name, roll, email, ID, PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID);
                return {updated:true}
            }
            else{
                let flag1 = 0, flag2 = 0, flag3 = 0;
                let empty1 = [...empty];
                if(response.x === 'invalid'){
                    // empty1[3] = {status:1, msg:'Student with this name already exist!'}
                    empty1[3] = {status:0, msg:''}
                    flag1 = 1;
                }
                else{
                    empty1[3] = {status:0, msg:''}
                    flag1 = 1;
                }
                if(response.y === 'invalid' && r !== r1){
                    empty1[4] = {status:1, msg:'Student with this roll already exist!'}
                }
                else{
                    empty1[4] = {status:0, msg:''}
                    flag2 = 1;
                }
                if(response.y === 'invalid' && e !== e1){
                    empty1[5] = {status:1, msg:'Student with this email already exist!'}
                }
                else{
                    empty1[5] = {status:0, msg:''}
                    flag3 = 1;
                }
                if(flag1 && flag2 && flag3){
                    const result = await DB_update_student(name, roll, email, ID, PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID);
                    return {updated:true}
                }
                else{
                    return {error:empty1};
                }
            }
        }
    }
}



export const GET_PROGRAM_COURSE = async() => {
    let COUNTS = []
    const result = await(DB_fetch_programmes());
    let i = 0;
    while(i < result.rows.length){
        let c = await DB_fetch_program_course(result.rows.item(i).id)
        COUNTS.push(c.rows.length);
        i++;
    }
    return COUNTS
};
export const GET_BATCH_DEPARTMENTS = async(ID) => {
    let COUNTS = []
    const result = await(DB_fetch_batches(ID));
    let i = 0;
    while(i < result.rows.length){
        // console.log(result.rows.item(i).id);
        let c = await DB_fetch_departments(ID, result.rows.item(i).id)
        COUNTS.push(c.rows.length);
        i++;
    }
    return COUNTS
};
export const GET_BATCH_STUDENTS = async(ID) => {
    let COUNTS = []
    const result = await(DB_fetch_batches(ID));
    let i = 0;
    while(i < result.rows.length){
        // console.log(result.rows.item(i).id);
        let c = await DB_fetch_batch_students(ID, result.rows.item(i).id)
        COUNTS.push(c.rows.length);
        i++;
    }
    return COUNTS
};
// export const GET_BATCH_COURSE = async(ID) => {
//     let COUNTS = []
//     const result = await(DB_fetch_batches(ID));
//     let i = 0;
//     while(i < result.rows.length){
//         console.log(result.rows.item(i));
//         // let c = await DB_fetch_program_course(result.rows.item(i).id)
//         // COUNTS.push(c.rows.length);
//         i++;
//     }
//     return COUNTS
// };



export const SAVE_COURSE_ATTENDANCE = async( code, data ) => {
    let parsedData;
    let date = new Date().toLocaleDateString();
    code = code.replace(/ /g,'');
    // date = date.replace(/\//g, '');
    // if(data.length === 0){
    //     parsedData = 'ALL_PRESENT';
    // }
    // else{
    //     parsedData = JSON.stringify(data);
    // }
    // console.log('parsedData----------',parsedData);
    // let result = await DB_fetch_attendance(code, date);
    // console.log('result----------',result.rows.item(0));
    // if(result.rows.length > 0){
    //     await DB_update_attendance(code, parsedData, result.rows.item(0).id);
    // }
    // else{
    //     await DB_save_attendance(code, date, parsedData);
    // }
}

export const GET_STUDENT_ATTENDANCE_PERCENT = async(code, ROLL) => {
    let ABSENT_COUNT = 0;
    // console.log('XX--',ROLL);
    code = code.replace(/ /g,'');

    let result = await DB_fetch_all_attendance(code);
    const days = result.rows.length;
    if(days > 0){
        let i = 0;
        while(i<days){
            let absent = null;
            let atd = result.rows.item(i).attendance;
            atd = JSON.parse(atd);
            // console.log(atd);
            absent = atd.find(function(roll) {
                return roll == ROLL;
            })
            if(absent){
                ABSENT_COUNT++;
            }
            i++;
        }
        let absentPercent = (ABSENT_COUNT/days) * 100;
        return({absentPercent:Math.round(absentPercent), presentPercent:Math.round((100-absentPercent)), absentDays:ABSENT_COUNT, presentDays:days-ABSENT_COUNT})
    }
    else{
        return({absentPercent:0,presentPercent:0,absentDays:0,presentDays:0})
    }
}

export const GET_STUDENT_COURSES = async(student) => {
    let STUDENT_COURSES = [];
    let courses = await DB_fetch_program_course(student.programme_id);
    let i = 0;
    while(i<courses.rows.length){
        let course = courses.rows.item(i);
        let registeredStudents = course.registered_students; 
        registeredStudents = JSON.parse(registeredStudents);
        if(registeredStudents){
            if(Object.keys(registeredStudents.new).length){
                if(registeredStudents.new.batches.length){
                    if((registeredStudents.new.batches.indexOf(student.batch_id)) >= 0){
                        STUDENT_COURSES.push(course.course_code);
                    }
                }
                if(registeredStudents.new.departments.length){
                    if((registeredStudents.new.departments.indexOf(student.department_id)) >= 0){
                        STUDENT_COURSES.push(course.course_code);
                    }
                }
                if(registeredStudents.new.students.length){
                    if((registeredStudents.new.students.indexOf(student.id)) >= 0){
                        STUDENT_COURSES.push(course.course_code);
                    }
                }
            }
            if(Object.keys(registeredStudents.backloggers).length){
                if(registeredStudents.backloggers.batches.length){
                    if((registeredStudents.backloggers.batches.indexOf(student.batch_id)) >= 0){
                        STUDENT_COURSES.push(course.course_code);
                    }
                }
                if(registeredStudents.backloggers.departments.length){
                    if((registeredStudents.backloggers.departments.indexOf(student.department_id)) >= 0){
                        STUDENT_COURSES.push(course.course_code);
                    }
                }
                if(registeredStudents.backloggers.students.length){
                    if((registeredStudents.backloggers.students.indexOf(student.id)) >= 0){
                        STUDENT_COURSES.push(course.course_code);
                    }
                }            
            }
        }
        i++
    }
    return STUDENT_COURSES;
}


export const REGISTER_COURSE_STUDENTS = async(type,Batches,Departments,Students, COURSE_ID, PROGRAMME_ID, COURSE_STUDENTS, code) => {
    // console.log('-----------------------------------------------------------------------------------');
    let data, ALL_STUDENTS = [];
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
    await DB_register_student(data, COURSE_ID, PROGRAMME_ID);


    // ADD NEW STUDENT's ATTENDANCE

    code = code.replace(/ /g,'');
    let result = await DB_fetch_all_attendance(code);
    // console.log(result.rows.item(0));

    let z;
    if(type == 'new'){
        z = COURSE_STUDENTS.new
    }
    else{
        z = COURSE_STUDENTS.backloggers
    }
    let eb = z.batches;
    let ed = z.departments;
    let es = z.students;
    let filtered_batches = [];
    let filtered_departments = [];
    let filtered_students = [];

    filtered_batches = Batches.filter(batch => !eb.includes(batch));
    filtered_departments = Departments.filter(department => !ed.includes(department));
    filtered_students = Students.filter(student => !es.includes(student));

    
    if(filtered_batches.length > 0){
        let i = 0;
        while(i < filtered_batches.length){
            let result = await DB_fetch_batch_students(PROGRAMME_ID, filtered_batches[i]);
            let j = 0;
            while(j < result.rows.length){
                let newStudent = result.rows.item(j);
                ALL_STUDENTS.push(newStudent);
                j++;
            }
            i++;
        }         
    }
    if(filtered_departments.length > 0){
        let i = 0;
        while(i < filtered_departments.length){
            let result = await DB_fetch_department_students(PROGRAMME_ID, filtered_departments[i]);
            let j = 0;
            while(j < result.rows.length){
                let newStudent = result.rows.item(j);
                ALL_STUDENTS.push(newStudent);
                j++;
            }
            i++;
        }
    }
    if(filtered_students.length > 0){
        let i = 0;
        while(i < filtered_students.length){
            let result = await DB_fetch_id_students(PROGRAMME_ID, filtered_students[i]);
            let j = 0;
            while(j < result.rows.length){
                let newStudent = result.rows.item(j);
                ALL_STUDENTS.push(newStudent);
                j++;
            }
            i++;
        }
    }
    let i = 0;
    while(i < result.rows.length){
        let item = result.rows.item(i);
        let attendance = JSON.parse(item.attendance);
        let updated = [...attendance]
        for(let i in ALL_STUDENTS){
            let roll = ALL_STUDENTS[i].roll;
            if(!updated.find(item => item == roll)){
                updated.push(roll);
            }
        }
        updated = JSON.stringify(updated);
        let ID = String(item.id);
        await DB_update_attendance(code, updated, ID);
        i++;
    }
}