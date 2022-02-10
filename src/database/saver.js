import SQLite from 'react-native-sqlite-storage';
const DB = SQLite.openDatabase('antiXbuilds.markem.db');

export const DB_save_programme = (short_name, full_name) => new Promise((resolve, reject) => {
    console.log("SAVING");
    DB.transaction((tx) => {
        tx.executeSql('INSERT INTO [MARKEM_programmes] (short_name, full_name) VALUES(?, ?);',
        [short_name, full_name],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_save_batch = (programme_id, start_year, passout_year) => new Promise((resolve, reject) => {
    console.log(programme_id,start_year,passout_year);
    DB.transaction((tx) => {
        tx.executeSql(`INSERT INTO [MARKEM_batches] (programme_id, start_year, passout_year) VALUES(?, ?, ?);`,
        [programme_id, start_year, passout_year],
        (_, result) => {
            resolve(result);
            console.log('x =>',result);
        },
        (_, err) => {
            // reject(err);
            console.log('y =>',err);
        }
        )
    })
});
export const DB_save_department = (short_name, full_name, programme_id, batch_id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`INSERT INTO [MARKEM_departments] (short_name, full_name, programme_id, batch_id) VALUES(?, ?, ?, ?);`,
        [short_name, full_name, programme_id, batch_id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_save_course = (course_code, course_title, course_semester, programme_id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`INSERT INTO [MARKEM_courses] (course_code, course_title, course_semester, classes_taken, programme_id) VALUES(?, ?, ?, ?, ?);`,
        [course_code, course_title, course_semester, 0, programme_id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_save_student = (full_name, roll, email, programme_id, batch_id, department_id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`INSERT INTO [MARKEM_students] (full_name, roll, email, programme_id, batch_id, department_id) VALUES(?, ?, ?, ?, ?, ?);`,
        [full_name, roll, email, programme_id, batch_id, department_id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_save_class = (short_name, full_name) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`INSERT INTO [MARKEM_classes] (short_name, full_name) VALUES(?, ?);`,
        [short_name, full_name],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_create_attendance_table = (tableName, courseCode) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS [${tableName}] ([${courseCode}] TEXT NOT NULL);`,
        [],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_add_attendance_column = (tableName, courseCode) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`ALTER table [${tableName}] ADD COLUMN [${courseCode}] TEXT NOT NULL);`,
        [],
        (_, result) => {
            resolve(result);
        },
        (x, err) => {
            console.log(x);
            reject(err);
        }
        )
    })
});
export const DB_save_attendance = (courseCode, date, data) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`INSERT INTO [${courseCode}_Attendance] (date, attendance) VALUES(?, ?)`,
        [date, data],
        (x, result) => {
            console.log('qq...',x);
            resolve(result);
        },
        (x, err) => {
            console.log('pp...',x);
            reject(err);
        }
        )
    })
});
export const DB_check_attendance_table = (tableName) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`SELECT name FROM sqlite_master WHERE type='table' AND name = ${String(tableName)};`,
        [],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_get_attendance_table_columns = (tableName, columnName) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`PRAGMA table_info(${tableName});`,
        [],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});