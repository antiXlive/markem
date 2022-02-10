import SQLite from 'react-native-sqlite-storage';
const DB = SQLite.openDatabase('antiXbuilds.markem.db');

export const DB_update_programme = (short_name, full_name, id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`UPDATE [MARKEM_programmes] SET short_name = ?, full_name = ? WHERE id = ?`,
        [short_name, full_name, id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_update_batch = (start_year, passout_year, batch_id, programme_id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`UPDATE [MARKEM_batches] SET start_year = ?, passout_year = ? WHERE id = ? AND  programme_id = ?`,
        [start_year, passout_year, batch_id, programme_id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_update_department = (short_name, full_name, ID, programme_id, batch_id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`UPDATE [MARKEM_departments] SET short_name = ?, full_name = ? WHERE id = ? AND programme_id = ? AND batch_id = ?`,
        [short_name, full_name, ID, programme_id, batch_id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_update_course = (course_code, course_title, course_semester, ID, programme_id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`UPDATE [MARKEM_courses] SET course_code = ?, course_title = ?, course_semester = ? WHERE id= ? AND programme_id = ?;`,
        [course_code, course_title, course_semester, ID, programme_id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_update_student = (full_name, roll, email, ID, programme_id, batch_id, department_id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`UPDATE [MARKEM_students] SET full_name = ?, roll = ?, email = ? WHERE id = ? AND programme_id = ? AND batch_id = ? AND department_id = ?;`,
        [full_name, roll, email, ID, programme_id, batch_id, department_id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_update_class = (short_name, full_name) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`UPDATE [MARKEM_classes] (short_name, full_name) VALUES(?, ?);`,
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
export const DB_update_attendance = (code, data, id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`UPDATE [${code}_Attendance] SET attendance = ? where id = ?;`,
        [data, id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});


export const DB_register_student = (students, ID, programme_id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql(`UPDATE [MARKEM_courses] SET registered_students = ? WHERE id = ? AND programme_id = ?;`,
        [students, ID, programme_id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});