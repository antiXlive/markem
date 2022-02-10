import SQLite from 'react-native-sqlite-storage';
const DB = SQLite.openDatabase('antiXbuilds.markem.db');

export const DB_fetch_programmes = () => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_programmes;',
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
export const DB_fetch_batches = (id) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_batches WHERE programme_id = ?;',
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
export const DB_fetch_departments = (PROGRAMME_ID, BATCH_ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_departments WHERE programme_id = ? AND batch_id = ?;',
        [PROGRAMME_ID, BATCH_ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_fetch_courses = (PROGRAMME_ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_courses WHERE programme_id = ?;',
        [PROGRAMME_ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_fetch_course_students = (PROGRAMME_ID,COURSE_ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT registered_students FROM MARKEM_courses WHERE id = ? AND programme_id = ?;',
        [COURSE_ID, PROGRAMME_ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_fetch_students = (PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_students WHERE programme_id = ? AND batch_id = ? AND department_id = ?;',
        [PROGRAMME_ID, BATCH_ID, DEPARTMENT_ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_fetch_classes = () => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_classes;',
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
export const DB_fetch_all_attendance = (code) => new Promise((resolve, reject) => {
    code = code.replace(/ /g,'');
    DB.transaction((tx) => {
        tx.executeSql(`SELECT * FROM [${code}_Attendance];`,
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
export const DB_fetch_attendance = (code, date) => new Promise((resolve, reject) => {
    code = code.replace(/ /g,'');
    DB.transaction((tx) => {
        tx.executeSql(`SELECT * FROM [${code}_Attendance] WHERE date = ?;`,
        [date],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            // reject(err);
            resolve(null)
        }
        )
    })
});




export const DB_fetch_program_course = (ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_courses WHERE programme_id = ?;',
        [ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_fetch_batch_students = (PROGRAMME_ID, BATCH_ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_students WHERE programme_id = ? AND batch_id = ?;',
        [PROGRAMME_ID, BATCH_ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});

export const DB_fetch_department_students = (PROGRAMME_ID, DEPARTMENT_ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_students WHERE programme_id = ? AND department_id = ?;',
        [PROGRAMME_ID, DEPARTMENT_ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_fetch_id_students = (PROGRAMME_ID, STUDENT_ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT * FROM MARKEM_students WHERE programme_id = ? AND id = ?;',
        [PROGRAMME_ID, STUDENT_ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_fetch_batch_years = (PROGRAMME_ID, BATCH_ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT start_year,passout_year FROM MARKEM_batches WHERE programme_id = ? AND id = ?;',
        [PROGRAMME_ID, BATCH_ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
export const DB_fetch_department_data = (PROGRAMME_ID, DEPARTMENT_ID) => new Promise((resolve, reject) => {
    DB.transaction((tx) => {
        tx.executeSql('SELECT id, short_name, batch_id  FROM MARKEM_departments WHERE programme_id = ? AND id = ?;',
        [PROGRAMME_ID, DEPARTMENT_ID],
        (_, result) => {
            resolve(result);
        },
        (_, err) => {
            reject(err);
        }
        )
    })
});
