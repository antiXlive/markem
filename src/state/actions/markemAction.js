import { DB_fetch_course_students, DB_fetch_batch_students, DB_fetch_department_students, DB_fetch_id_students, DB_fetch_batch_years, DB_fetch_department_data } from '@db/fetcher';

export const SET_UPLOADED_PROGRAMME = (programmes) => ({
    type:'UPLOADED_PROGRAMMES',
    payload:programmes
});


export const LOAD_COURSE_STUDENTS = ( PROGRAMME_ID,COURSE_ID, MODE) => {
    return async dispatch => {
        const result = await DB_fetch_course_students(PROGRAMME_ID, COURSE_ID);
        let x = result.rows.item(0);
        x = x.registered_students;
        if(x){
            let parsedData = JSON.parse(x);

            dispatch({type:'SET_COURSE_STUDENTS', payload:[]});
            dispatch({type:'SET_LOADING', payload:true});
            dispatch({type:'SET_COURSE_STUDENTS_COLLECTIVE', payload:parsedData});

            
            let NEW = [];
            let BACKLOG = [];
            let BATCHES_ID = [];
            let DEPARTMENTS_ID = [];
            let STUDENTS_ID = [];



            //---------------------NEW STUDENTS--------------------- 
            let ndata = parsedData.new;
            if(ndata){
                let nb = ndata.batches;
                let nd = ndata.departments;
                let ns = ndata.students;
                if(nb){
                    if(typeof(nb) != 'object'){
                        nb = JSON.parse(nb);
                    }
                    nb.map((batch) => {
                        BATCHES_ID.push(batch);
                    })
                }
                if(nd){
                    if(typeof(nd) != 'object'){
                        nd = JSON.parse(nd);
                    }
                    nd.map((department) => {
                        DEPARTMENTS_ID.push(department);
                    })
                }
                if(ns){
                    if(typeof(ns) != 'object'){
                        ns = JSON.parse(ns);
                    }
                    ns.map((student) => {
                        STUDENTS_ID.push(student);
                    })
                }
                if(BATCHES_ID.length > 0){
                    let i = 0;
                    while(i < BATCHES_ID.length){
                        let result = await DB_fetch_batch_students(PROGRAMME_ID, BATCHES_ID[i]);
                        let j = 0;
                        while(j < result.rows.length){
                            let newStudent = result.rows.item(j);
                            NEW.push(newStudent);
                            j++;
                        }
                        i++;
                    }
                }
                if(DEPARTMENTS_ID.length > 0){
                    let i = 0;
                    while(i < DEPARTMENTS_ID.length){
                        let result = await DB_fetch_department_students(PROGRAMME_ID, DEPARTMENTS_ID[i]);
                        let j = 0;
                        while(j < result.rows.length){
                            let newStudent = result.rows.item(j);
                            NEW.push(newStudent);
                            j++;
                        }
                        i++;
                    }
                }
                if(STUDENTS_ID.length > 0){
                    let i = 0;
                    while(i < STUDENTS_ID.length){
                        let result = await DB_fetch_id_students(PROGRAMME_ID, STUDENTS_ID[i]);
                        let j = 0;
                        while(j < result.rows.length){
                            let newStudent = result.rows.item(j);
                            NEW.push(newStudent);
                            j++;
                        }
                        i++;
                    }
                }
            }


            //---------------------BACKLOG STUDENTS---------------------
            let bdata = parsedData.backloggers;
            BATCHES_ID = [];
            DEPARTMENTS_ID = [];
            STUDENTS_ID = [];
            if(bdata){
                let bb = bdata.batches;
                let bd = bdata.departments;
                let bs = bdata.students;
                if(bb){
                    if(typeof(bb) != 'object'){
                        bb = JSON.parse(bb);
                    }
                    bb.map((batch) => {
                        BATCHES_ID.push(batch);
                    })
                }
                if(bd){
                    if(typeof(bd) != 'object'){
                        bd = JSON.parse(bd);
                    }
                    bd.map((department) => {
                        DEPARTMENTS_ID.push(department);
                    })
                }
                if(bs){
                    if(typeof(bs) != 'object'){
                        bs = JSON.parse(bs);
                    }
                    bs.map((student) => {
                        STUDENTS_ID.push(student);
                    })
                }
            }
            if(BATCHES_ID.length > 0){
                let i = 0;
                while(i < BATCHES_ID.length){
                    let result = await DB_fetch_batch_students(PROGRAMME_ID, BATCHES_ID[i]);
                    let j = 0;
                    while(j < result.rows.length){
                        let newStudent = result.rows.item(j);
                        BACKLOG.push(newStudent);
                        j++;
                    }
                    i++;
                }
            }
            if(DEPARTMENTS_ID.length > 0){
                let i = 0;
                while(i < DEPARTMENTS_ID.length){
                    let result = await DB_fetch_department_students(PROGRAMME_ID, DEPARTMENTS_ID[i]);
                    let j = 0;
                    while(j < result.rows.length){
                        let newStudent = result.rows.item(j);
                        BACKLOG.push(newStudent);
                        j++;
                    }
                    i++;
                }
            }
            if(STUDENTS_ID.length > 0){
                let i = 0;
                while(i < STUDENTS_ID.length){
                    let result = await DB_fetch_id_students(PROGRAMME_ID, STUDENTS_ID[i]);
                    let j = 0;
                    while(j < result.rows.length){
                        let newStudent = result.rows.item(j);
                        BACKLOG.push(newStudent);
                        j++;
                    }
                    i++;
                }
            }

            let DATA;
            NEW.sort(function(a,b){
                return  a.roll - b.roll;
            })
            BACKLOG.sort(function(a,b){
                return  a.roll - b.roll;
            })
            if(MODE){
                if(MODE == 'separate'){
                    DATA = {new:NEW,backlog:BACKLOG};
                }
                else if(MODE == 'together'){
                    DATA = [...NEW, ...BACKLOG];
                }
            }
            else{
                DATA = {new:NEW,backlog:BACKLOG};
            }
            dispatch({type:'SET_COURSE_STUDENTS', payload:DATA});
            dispatch({type:'SET_LOADING', payload:false});
        }
        else{
            dispatch({type:'SET_COURSE_STUDENTS', payload:[]});
            dispatch({type:'SET_LOADING', payload:false});
        }
    }
};
export const LOAD_REGISTERED_COURSE_STUDENTS = ( PROGRAMME_ID,COURSE_ID, ENTRY ) => {
    return async dispatch => {
        dispatch({type:'SET_LOADING', payload:true});
        const result = await DB_fetch_course_students(PROGRAMME_ID, COURSE_ID);
        let x = result.rows.item(0);
        x = x.registered_students;
        if(x){
            let parsedData = JSON.parse(x);
            let N_REGISTERED_BATCHES = [];
            let N_REGISTERED_DEPARTMENTS = [];
            let N_REGISTERED_STUDENTS = [];
            let B_REGISTERED_BATCHES = [];
            let B_REGISTERED_DEPARTMENTS = [];
            let B_REGISTERED_STUDENTS = [];
            
            //---------------------NEW STUDENTS--------------------- 
            let ndata = parsedData.new;
            if(ndata){
                if(ndata.batches.length > 0){
                    let BATCHES;
                    if(typeof(ndata.batches) == 'object'){
                        BATCHES = ndata.batches;
                    }
                    else{
                        BATCHES = ndata.batches.split(',');
                    }
                    let i = 0;
                    while(i < BATCHES.length){
                        if(BATCHES[i]){
                            let result = await DB_fetch_batch_years(PROGRAMME_ID, BATCHES[i]);
                            let data = result.rows.item(0);
                            N_REGISTERED_BATCHES.push({ID:BATCHES[i], startYear:data.start_year, passoutYear:data.passout_year})    
                        }
                        i++;
                    }          
                }
                if(ndata.departments.length > 0){
                    let DEPARTMENTS;
                    if(typeof(ndata.departments) == 'object'){
                        DEPARTMENTS = ndata.departments;
                    }
                    else{
                        DEPARTMENTS = ndata.departments.split(',');
                    }
                    let i = 0;
                    while(i < DEPARTMENTS.length){
                        if(DEPARTMENTS[i]){
                            let result = await DB_fetch_department_data(PROGRAMME_ID, DEPARTMENTS[i]);
                            let department = result.rows.item(0);
                            let result1 = await DB_fetch_batch_years(PROGRAMME_ID, department.batch_id);
                            let batch = result1.rows.item(0);
                            N_REGISTERED_DEPARTMENTS.push({ID:department.id, batchID:department.batch_id, shortName:department.short_name, startYear:batch.start_year, passoutYear:batch.passout_year})    
                        }
                        i++;
                    }
                } 
                if(ndata.students.length > 0){
                    let STUDENTS;
                    if(typeof(ndata.students) == 'object'){
                        STUDENTS = ndata.students;
                    }
                    else{
                        STUDENTS = ndata.students.split(',');
                    }
                    let i = 0;
                    while(i < STUDENTS.length){
                        if(STUDENTS[i]){
                            let result = await DB_fetch_id_students(PROGRAMME_ID, STUDENTS[i]);
                            let student = result.rows.item(0);
                            let result1 = await DB_fetch_batch_years(PROGRAMME_ID, student.batch_id);
                            result1 = result1.rows.item(0);
                            let result2 = await DB_fetch_department_data(PROGRAMME_ID, student.department_id);
                            result2 = result2.rows.item(0);
                            N_REGISTERED_STUDENTS.push({ID:student.id, batchID:student.batch_id, departmentID:student.department_id, fullName:student.full_name, roll:student.roll, department:result2.short_name, startYear:result1.start_year, passoutYear:result1.passout_year})    
                        }
                        i++;
                    }                
                } 
            }

            //---------------------BACKLOG STUDENTS---------------------
            let bdata = parsedData.backloggers;
            if(bdata){
                if(bdata.batches.length > 0){
                    let BATCHES;
                    if(typeof(bdata.batches) == 'object'){
                        BATCHES = bdata.batches;
                    }
                    else{
                        BATCHES = bdata.batches.split(',');
                    }
                    let i = 0;
                    while(i < BATCHES.length){
                        if(BATCHES[i]){
                            let result = await DB_fetch_batch_years(PROGRAMME_ID, BATCHES[i]);
                            let data = result.rows.item(0);
                            B_REGISTERED_BATCHES.push({ID:BATCHES[i], startYear:data.start_year, passoutYear:data.passout_year})    
                        }
                        i++;
                    }          
                }
                if(bdata.departments.length > 0){
                    let DEPARTMENTS;
                    if(typeof(bdata.departments) == 'object'){
                        DEPARTMENTS = bdata.departments;
                    }
                    else{
                        DEPARTMENTS = bdata.departments.split(',');
                    }
                    let i = 0;
                    while(i < DEPARTMENTS.length){
                        if(DEPARTMENTS[i]){
                            let result = await DB_fetch_department_data(PROGRAMME_ID, DEPARTMENTS[i]);
                            let department = result.rows.item(0);
                            let result1 = await DB_fetch_batch_years(PROGRAMME_ID, department.batch_id);
                            let batch = result1.rows.item(0);
                            B_REGISTERED_DEPARTMENTS.push({ID:department.id, batchID:department.batch_id, shortName:department.short_name, startYear:batch.start_year, passoutYear:batch.passout_year})    
                        }
                        i++;
                    }
                } 
                if(bdata.students.length > 0){
                    let STUDENTS;
                    if(typeof(bdata.students) == 'object'){
                        STUDENTS = bdata.students;
                    }
                    else{
                        STUDENTS = bdata.students.split(',');
                    }
                    let i = 0;
                    while(i < STUDENTS.length){
                        if(STUDENTS[i]){
                            let result = await DB_fetch_id_students(PROGRAMME_ID, STUDENTS[i]);
                            let student = result.rows.item(0);
                            let result1 = await DB_fetch_batch_years(PROGRAMME_ID, student.batch_id);
                            result1 = result1.rows.item(0);
                            let result2 = await DB_fetch_department_data(PROGRAMME_ID, student.department_id);
                            result2 = result2.rows.item(0);
                            B_REGISTERED_STUDENTS.push({ID:student.id, batchID:student.batch_id, departmentID:student.department_id, fullName:student.full_name, roll:student.roll, department:result2.short_name, startYear:result1.start_year, passoutYear:result1.passout_year})    
                        }
                        i++;
                    }                
                } 
            }
            // console.log('-------------NEW-------------');
            // console.log(N_REGISTERED_BATCHES);
            // console.log(N_REGISTERED_DEPARTMENTS);
            // console.log(N_REGISTERED_STUDENTS);
            // console.log('-------------BACKLOG-------------');
            // console.log(B_REGISTERED_BATCHES);
            // console.log(B_REGISTERED_DEPARTMENTS);
            // console.log(B_REGISTERED_STUDENTS);

            let NEW = {'b':N_REGISTERED_BATCHES,'d':N_REGISTERED_DEPARTMENTS,'s':N_REGISTERED_STUDENTS}
            let BACKLOG = {'b':B_REGISTERED_BATCHES,'d':B_REGISTERED_DEPARTMENTS,'s':B_REGISTERED_STUDENTS}
            // console.log('//////////////////',BACKLOG);


            // console.log('pppppppppppp',N_REGISTERED_BATCHES,'---',N_REGISTERED_DEPARTMENTS,'---',N_REGISTERED_STUDENTS)
            // dispatch({type:'SET_LOADING', payload:false});
            dispatch({type:'SET_COURSE_DATA', payload1:NEW , payload2:BACKLOG});            
        }
        else{
            // dispatch({type:'SET_LOADING', payload:false});
            dispatch({type:'SET_COURSE_DATA', payload1:[] , payload2:[]});            
        }
    }
};



export const FETCH_ALL_STUDENTS = ( PROGRAMME_ID,COURSE_ID ) => {
    return async dispatch => {
        const res = await DB_fetch_course_students(PROGRAMME_ID, COURSE_ID);
        let x = res.rows.item(0);
        x = x.registered_students;
    
    }
};
