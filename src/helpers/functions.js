import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

export class NetworkUtils {
    static async isNetworkAvailable() {
        const response = await NetInfo.fetch();
        return response.isConnected && response.isInternetReachable;
    }
    // static async isServerReachable() {
    //     // let status;
    //     axios.get("http://192.168.43.96:3000/ping")
	// 	.then((res) => {
    //         // console.log(res);
    //         // console.log(true);
    //         return res;
    //         // status =  await true;
	// 	})
	// 	.catch((err) => {
    //         // console.log(false);
    //         // return false;
    //         // status = await false;
    //     })
    //     // return status;
    // }
}

// export const isServerReachable = async() => {
//     let status;
//     axios.get("http://192.168.43.96:3000/ping",)
// 		.then((res) => {
//             // console.log(true);
//             status = true;
// 		})
// 		.catch((err) => {
//             // console.log(false);
//             // return false
//             status = false;
//         })
//     return status;
// }




// ******************** UPLOAD FILE SCREEN ********************
export const validateFileExtension = (fileName) => {
    const splittedFileName = fileName.split('.');
    const fileExtension = splittedFileName[splittedFileName.length - 1];
    if(fileExtension === "xlsx" || fileExtension === "xls" || fileExtension === "ods"){
      return true
    }
    return false;
}
export const validateFileData = (file, category, _Error) => {
    const columns = file[0];
    switch(category){
      case "programme":
        if(columns.length === 2){
          if(columns[0].toLowerCase() === "programme short name" && columns[1].toLowerCase() === "programme full name"){
            return true;
          }
          else{
            _Error();
            return false;
          }

        }
        else{
            _Error();
            return false;
        }
        break;
      case "batch":
        if(columns.length === 2){
          if(columns[0].toLowerCase() === "batch start year" && columns[1].toLowerCase() === "batch passout year"){
            return true;
          }
          else{
            _Error()
            return false;
          }

        }
        else{
            _Error()
            return false;
        }
        break;
      case "department":
        if(columns.length === 2){
          if(columns[0].toLowerCase() === "department short name" && columns[1].toLowerCase() === "department full name"){
            return true;
          }
          else{
            _Error()
            return false;
          }

        }
        else{
            _Error()
            return false;
        }
        break;
      case "course":
        if(columns.length === 3){
          if(columns[0].toLowerCase() === "course code" && columns[1].toLowerCase() === "course name" && columns[2].toLowerCase() === "course semester"){
            return true;
          }
          else{
            _Error()
            return false;
          }

        }
        else{
            _Error()
            return false;
        }
        break;
      case "student":
        if(columns.length === 3){
          if(columns[0].toLowerCase() === "roll no" || columns[0].toLowerCase() === "roll no." || columns[0].toLowerCase() === "roll number" && columns[1].toLowerCase() === "full name" && columns[1].toLowerCase() === "email" || columns[1].toLowerCase() === "e-mail"){
            return true;
          }
          else{
            _Error()
            return false;
          }

        }
        else{
            _Error()
            return false;
        }
        break;
      default:
        break;

    }
}

export const filterExistingData = (NEW_DATA, category, EXISTING_DATA) => {
  let actualData = [];
  let duplicateData = [];
  let newData = [];
  // let x=false, y=false, z=false;

  if(category === 'batch'){
    if(NEW_DATA.length > 1){
      actualData = NEW_DATA.splice(1, NEW_DATA.length-1);
      for(let i in actualData){
        for(let j in EXISTING_DATA){
          if(actualData[i][0] == EXISTING_DATA[j].start_year || actualData[i][1] == EXISTING_DATA[j].passout_year){
            duplicateData.push(actualData[i]);
          }
        }
      }
      newData = actualData.filter((el) => !duplicateData.includes(el));
    }
    return({duplicate:duplicateData, new:newData});
  }

  else if(category === 'department'){
    if(NEW_DATA.length > 1){
      actualData = NEW_DATA.splice(1, NEW_DATA.length-1);
      for(let i in actualData){
        for(let j in EXISTING_DATA){
          if(actualData[i][0].toLowerCase() == EXISTING_DATA[j].short_name.toLowerCase() || actualData[i][1].toLowerCase() == EXISTING_DATA[j].full_name.toLowerCase()){
            duplicateData.push(actualData[i]);
          }
        }
      }
      newData = actualData.filter((el) => !duplicateData.includes(el));
    }
    return({duplicate:duplicateData, new:newData});
  }

  else if(category === 'student'){
    if(NEW_DATA.length > 1){
      actualData = NEW_DATA.splice(1, NEW_DATA.length-1);
      for(let i in actualData){
        for(let j in EXISTING_DATA){
          if(actualData[i][0] == EXISTING_DATA[j].roll || actualData[i][1].toLowerCase() == EXISTING_DATA[j].full_name.toLowerCase() ||  actualData[i][2].toLowerCase() == EXISTING_DATA[j].email.toLowerCase()){
            duplicateData.push(actualData[i]);
          }
        }
      }
      newData = actualData.filter((el) => !duplicateData.includes(el));
    }
    return({duplicate:duplicateData, new:newData});
  }
}

 
  // else if(category === 'student'){

  // }
  

  // switch(category){
  //   case 'batch':
  //     if(NEW_DATA.length > 1){
  //       actualData = NEW_DATA.splice(1, NEW_DATA.length-1);
  //     }
  //     else{
  //       actualData = NEW_DATA;
  //     }
  //     for(let i in actualData){
  //       for(let j in EXISTING_DATA){
  //         if(actualData[i][0] == EXISTING_DATA[j].start_year || actualData[i][1] == EXISTING_DATA[j].passout_year){
  //           console.log(actualData[i])
  //           // if(actualData[i][0] == EXISTING_DATA[j].start_year){x = true};
  //           // if(actualData[i][1] == EXISTING_DATA[j].passout_year){y = true};
  //           // duplicateData.push(actualData[i], {x:x, y:y});
  //           // actualData.splice(i,1);
  //         }
  //       }
  //     }
  //     // return ({duplicate:duplicateData, new:actualData});
  //     break;

  //   case 'department':
  //     if(NEW_DATA.length > 1){
  //       actualData = NEW_DATA.splice(1, NEW_DATA.length-1);
  //     }
  //     else{
  //       actualData = NEW_DATA;
  //     }
  //     for(let i in actualData){
  //       for(let j in EXISTING_DATA){
  //         if(actualData[i][0] == EXISTING_DATA[j].short_name || actualData[i][1] == EXISTING_DATA[j].full_name){
  //           if(actualData[i][0] == EXISTING_DATA[j].short_name){x = true};
  //           if(actualData[i][1] == EXISTING_DATA[j].full_name){y = true};
  //           duplicateData.push(actualData[i], {x:x, y:y});
  //           actualData.splice(i,1);
  //         }
  //       }
  //     }
  //     return ({duplicate:duplicateData, new:actualData});
  //   break;

  //   case 'student':
  //     if(NEW_DATA.length > 1){
  //       actualData = NEW_DATA.splice(1, NEW_DATA.length-1);
  //     }
  //     else{
  //       actualData = NEW_DATA;
  //     }
  //     for(let i in actualData){
  //       for(let j in EXISTING_DATA){
  //         if(actualData[i][0] == EXISTING_DATA[j].roll || actualData[i][1].toLowerCase() == EXISTING_DATA[j].full_name.toLowerCase() ||  actualData[i][2].toLowerCase() == EXISTING_DATA[j].email.toLowerCase()){
  //           if(actualData[i][0] == EXISTING_DATA[j].roll){x = true};
  //           if(actualData[i][1].toLowerCase() == EXISTING_DATA[j].full_name.toLowerCase()){y = true};
  //           if(actualData[i][2].toLowerCase() == EXISTING_DATA[j].email.toLowerCase()){z = true};
  //           duplicateData.push(actualData[i], {x:x, y:y,z:z});
  //           actualData.splice(i,1);
  //         }
  //       }
  //     }
  //     return ({duplicate:duplicateData, new:actualData});
  //   break;

  // }
  // let actualData = [];
  // let x = false;
  // let y = false;
  // if(data.length>1){
  //   actualData = data.splice(1,data.length-1);
  // }
  // else{
  //   actualData = data;
  // }
  // let duplicateData = [];
  // let newData = [];
  // for(let i in actualData){
  //   for(let j in ALL_PROGRAMMES){
  //     // console.log(actualData[i][0].toLowerCase() +' === '+ ALL_PROGRAMMES[j].short_name.toLowerCase() +' && '+ actualData[i][1].toLowerCase() +' === '+ ALL_PROGRAMMES[j].full_name.toLowerCase())
  //     if(actualData[i][0].toLowerCase() === ALL_PROGRAMMES[j].short_name.toLowerCase() || actualData[i][1].toLowerCase() === ALL_PROGRAMMES[j].full_name.toLowerCase()){
  //       if(actualData[i][0].toLowerCase() === ALL_PROGRAMMES[j].short_name.toLowerCase()){x = true}
  //       if(actualData[i][1].toLowerCase() === ALL_PROGRAMMES[j].full_name.toLowerCase()){y = true}
  //       duplicateData.push(actualData[i],{x:x, y:y});
  //       break;
  //     }
  //   }
  // }
  // // console.log('****************************');

  // for(let i in actualData){
  //   let flag = 0
  //   for(let j in duplicateData){
  //     // console.log(actualData[i][0].toLowerCase() +' === '+ duplicateData[j][0].toLowerCase() +' && '+ actualData[i][1].toLowerCase() +' === '+ duplicateData[j][1].toLowerCase())
  //     if(actualData[i][0].toLowerCase() === duplicateData[j][0].toLowerCase() && actualData[i][1].toLowerCase() === duplicateData[j][1].toLowerCase()){
  //       flag = 0;
  //       break;
  //     }
  //     else{
  //       flag = 1;
  //     }
  //   }
  //   // console.log(flag);
  //   if(flag === 1){
  //     newData.push(actualData[i]);
  //   }
  // }
  // return false
// }
// ******************** UPLOAD FILE SCREEN ********************




export const verifySingleProgramme = (data, ALL_PROGRAMMES) => {
  let x = 'valid';
  let y = 'valid';
  for(let i in ALL_PROGRAMMES){
    // console.log(data[0].toLowerCase() === ALL_PROGRAMMES[i].short_name.toLowerCase())
    if(data[0].toLowerCase() === ALL_PROGRAMMES[i].short_name.toLowerCase()){
      x = 'invalid'
    }
    // console.log(data[1].toLowerCase() === ALL_PROGRAMMES[i].full_name.toLowerCase());
    if(data[1].toLowerCase() === ALL_PROGRAMMES[i].full_name.toLowerCase()){
      y = 'invalid'
    }
  }
  return {x:x, y:y};
}
export const verifySingleBatch = (data, BATCHES) => {
  let x = 'valid';
  let y = 'valid';
  for(let i in BATCHES){
    if(data[0] === BATCHES[i].start_year){
      x = 'invalid'
    }
    if(data[1] === BATCHES[i].passout_year){
      y = 'invalid'
    }
  }
  return {x:x, y:y};
}
export const verifySingleBatch_BULK = (data, BATCHES, BATCHES1) => {
  let x = 'valid';
  let y = 'valid';
  console.log(BATCHES1);
  for(let i in BATCHES){
    if(data[0] == BATCHES[i].start_year){
      x = 'invalid'
    }
    if(data[1] == BATCHES[i].passout_year){
      y = 'invalid'
    }
  }
  for(let j in BATCHES1){
    if(data[0] == BATCHES1[j][0]){
      x = 'invalid'
    }
    if(data[1] == BATCHES1[j][1]){
      y = 'invalid'
    }
  }
  return {x:x, y:y};
}
export const verifySingleDepartment = (data, DEPARTMENTS) => {
  console.log('data....',data);
  let x = 'valid';
  let y = 'valid';
  for(let i in DEPARTMENTS){
    if(data[0].toLowerCase() === DEPARTMENTS[i].short_name.toLowerCase()){
      x = 'invalid'
    }
    if(data[1].toLowerCase() === DEPARTMENTS[i].full_name.toLowerCase()){
      y = 'invalid'
    }
  }
  return {x:x, y:y};
}
export const verifySingleDepartment_BULK = (data, DEPARTMENTS, DEPARTMENTS1) => {
  console.log('data....',data);
  let x = 'valid';
  let y = 'valid';
  console.log(DEPARTMENTS1);
  for(let i in DEPARTMENTS){
    if(data[0].toLowerCase() === DEPARTMENTS[i].short_name.toLowerCase()){
      x = 'invalid'
    }
    if(data[1].toLowerCase() === DEPARTMENTS[i].full_name.toLowerCase()){
      y = 'invalid'
    }
  }
  for(let j in DEPARTMENTS1){
    if(data[0].toLowerCase() === DEPARTMENTS1[j][0].toLowerCase()){
      x = 'invalid'
    }
    if(data[1].toLowerCase() === DEPARTMENTS1[j][1].toLowerCase()){
      y = 'invalid'
    }
  }
  return {x:x, y:y};
}
export const verifySingleCourse = (data, COURSES) => {
  let x = 'valid';
  let y = 'valid';
  let z = 'valid';
  for(let i in COURSES){
    if(data[0].toLowerCase() === COURSES[i].course_code.toLowerCase()){
      x = 'invalid'
    }
    if(data[1].toLowerCase() === COURSES[i].course_title.toLowerCase()){
      y = 'invalid'
    }
    if(data[2].toLowerCase() === COURSES[i].course_semester.toLowerCase()){
      z = 'invalid'
    }
  }
  return {x:x, y:y, z:z};
}
export const verifySingleStudent = (data, STUDENTS) => {
  let x = 'valid';
  let y = 'valid';
  let z = 'valid';
  for(let i in STUDENTS){
    if(String(data[0]).toLowerCase() === STUDENTS[i].full_name.toLowerCase()){
      x = 'invalid'
    }
    if(String(data[1]).toLowerCase() === STUDENTS[i].roll.toLowerCase()){
      y = 'invalid'
    }
    if(String(data[2]).toLowerCase() === STUDENTS[i].email.toLowerCase()){
      z = 'invalid'
    }
  }
  return {x:x, y:y, z:z};
}
export const verifySingleStudent_BULK = (data, STUDENTS, STUDENTS1) => {
  let x = 'valid';
  let y = 'valid';
  let z = 'valid';
  for(let i in STUDENTS){
    if(String(data[0]).toLowerCase() === STUDENTS[i].full_name.toLowerCase()){
      x = 'invalid'
    }
    if(String(data[1]).toLowerCase() === STUDENTS[i].roll.toLowerCase()){
      y = 'invalid'
    }
    if(String(data[2]).toLowerCase() === STUDENTS[i].email.toLowerCase()){
      z = 'invalid'
    }
  }
  for(let j in STUDENTS1){
    if(String(data[0]).toLowerCase() === String(STUDENTS1[j][1]).toLowerCase()){
      x = 'invalid'
    }
    if(String(data[1]).toLowerCase() === String(STUDENTS1[j][0]).toLowerCase()){
      y = 'invalid'
    }
    if(String(data[2]).toLowerCase() === String(STUDENTS1[j][2]).toLowerCase()){
      z = 'invalid'
    }
  }
  return {x:x, y:y, z:z};
}

export const semesterPrinter = (value) => {
  switch(value){
      case '1' || 1:
          return '1st Sem'
          break;
      case '2' || 2:
          return '2nd Sem'
          break;
      case '3' || 3:
          return '3rd Sem'
          break;
      case '4' || 4:
          return '4th Sem'
          break;
      case '5' || 5:
          return '5th Sem'
          break;
      case '6' || 6:
          return '6th Sem'
          break;
      case '7' || 7:
          return '7th Sem'
          break;
      case '8' || 8:
          return '8th Sem'
          break;
      default:
          return;
  }
}

export const commaRemover = (word) => {
  let newWord = word;
  if(word.charAt(0) == ','){
    newWord = newWord.substring(1);
  }
  if(word.charAt(word.length) == ','){
    newWord = newWord.substring(0, newWord.length - 1);
  }
  return newWord;
}