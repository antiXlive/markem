import SQLite from 'react-native-sqlite-storage';
const DB = SQLite.openDatabase('antiXbuilds.markem.db');

export const DB_delete_programme = (id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('DELETE FROM [MARKEM_programmes] WHERE id = ?',
        [id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_delete_batch = (id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('DELETE FROM [MARKEM_batches] WHERE id = ?',
        [id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_delete_department = (id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('DELETE FROM [MARKEM_departments] WHERE id = ?',
        [id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_delete_course = (id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('DELETE FROM [MARKEM_courses] WHERE id = ?',
        [id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_delete_course_attendance = (code) => new Promise((resolve, reject) => {
    let course_code = code.replace(/ /g,'');
    DB.transaction((tx) => {
        tx.executeSql(`DROP TABLE [${course_code}_Attendance]`,
        [],
        (r, result) => {
            console.log(r);
            resolve(result);
        },
        (e, err) => {
            console.log(e);
            reject(err);
        }
        )
    })
});
export const DB_delete_classes = (id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('DELETE FROM [MARKEM_classes] WHERE id = ?',
        [id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_delete_student = (id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('DELETE FROM [MARKEM_students] WHERE id = ?',
        [id],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});