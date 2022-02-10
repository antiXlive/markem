import SQLite from 'react-native-sqlite-storage';
import { resolve } from 'path';
const DB = SQLite.openDatabase('antiXbuilds.markem.db');


export const initializeDatabase = () => {
    const promise = new Promise((resolve, reject) => {
        console.log("CREATING DATABASE");
        DB.transaction((tx) => {
            tx.executeSql("PRAGMA foreign_keys = ON");
            tx.executeSql('CREATE TABLE IF NOT EXISTS [MARKEM_tutor] ([id] INTEGER PRIMARY KEY NOT NULL, [fullname] TEXT NOT NULL, [email] TEXT NOT NULL, designation TEXT NOT NULL, usertype TEXT NOT NULL);',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
                console.log("DATABASE CREATION FAILED MARKEM_tutor");
            }
            );
            tx.executeSql('CREATE TABLE IF NOT EXISTS [MARKEM_programmes] ([id] INTEGER PRIMARY KEY NOT NULL, [short_name] TEXT NOT NULL, [full_name] TEXT NOT NULL);',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
                console.log("DATABASE CREATION FAILED MARKEM_programmes");
            }
            );
            tx.executeSql('CREATE TABLE IF NOT EXISTS [MARKEM_batches] ([id] INTEGER PRIMARY KEY NOT NULL, [start_year] TEXT NOT NULL, [passout_year] TEXT NOT NULL,[programme_id] INTEGER NOT NULL, FOREIGN KEY(programme_id) REFERENCES MARKEM_programmes(id));',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
                console.log("DATABASE CREATION FAILED MARKEM_batches");
            }
            );
            tx.executeSql('CREATE TABLE IF NOT EXISTS [MARKEM_departments] ([id] INTEGER PRIMARY KEY NOT NULL, [short_name] TEXT NOT NULL, [full_name] TEXT NOT NULL, [programme_id] INTEGER NOT NULL, [batch_id] INTEGER NOT NULL, FOREIGN KEY(programme_id) REFERENCES MARKEM_programmes(id), FOREIGN KEY(batch_id) REFERENCES MARKEM_batches(id));',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
                console.log("DATABASE CREATION FAILED MARKEM_departments");
            }
            );
            tx.executeSql('CREATE TABLE IF NOT EXISTS [MARKEM_courses] ([id] INTEGER PRIMARY KEY NOT NULL, [course_code] TEXT NOT NULL, [course_title] TEXT NOT NULL, [course_semester] TEXT NOT NULL, [classes_taken] INTEGER DEFAULT 0, [registered_students] TEXT, [deregistered_students] TEXT, [programme_id] INTEGER NOT NULL, FOREIGN KEY(programme_id) REFERENCES MARKEM_programmes(id));',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
                console.log("DATABASE CREATION FAILED MARKEM_courses");
            }
            );
            tx.executeSql('CREATE TABLE IF NOT EXISTS MARKEM_students (id INTEGER PRIMARY KEY NOT NULL, full_name TEXT NOT NULL, roll TEXT NOT NULL, email TEXT NOT NULL, [programme_id] INTEGER NOT NULL, [batch_id] INTEGER NOT NULL, [department_id] INTEGER NOT NULL, FOREIGN KEY(programme_id) REFERENCES MARKEM_programmes(id), FOREIGN KEY(batch_id) REFERENCES MARKEM_batches(id), FOREIGN KEY(department_id) REFERENCES MARKEM_departments(id));',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
                console.log("DATABASE CREATION FAILED MARKEM_students");
            }
            );
        });
    });
    return promise;
}

export const DB_create_attendance_table = (code) => {
    const promise = new Promise((resolve, reject) => {
        let course_code = code.replace(/ /g,'');
        DB.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS [${course_code}_Attendance] (id INTEGER PRIMARY KEY NOT NULL, date TEXT NOT NULL UNIQUE, attendance TEXT NOT NULL);`,
            [],
            () => {
                resolve();
            },
            (e, err) => {
                console.log(e);
                reject(err);
            }
            );
        });
    });
    return promise;
} 
