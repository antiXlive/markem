const initialState = {
    loading:true,
    uploadedProgrammes:null,
    courseStudents_LOADING : true,
    courseStudentsData : [],
    courseStudents : [],
    registered_NEW: [],
    registered_BACKLOG: [],
};

const markemReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_LOADING":
            return{
                ...state,
                loading:action.payload,
            };
        case "UPLOADED_PROGRAMMES":
            return{
                ...state,
                uploadedProgrammes:action.payload,
            };
        case "SET_COURSE_STUDENTS":
            return{
                ...state,
                courseStudents:action.payload,
                courseStudents_LOADING:false,
            };
        case "SET_COURSE_STUDENTS_COLLECTIVE":
            return{
                ...state,
                courseStudentsData:action.payload,
            };
        case "SET_COURSE_DATA":
            return{
                ...state,
                registered_NEW:action.payload1,
                registered_BACKLOG:action.payload2,
                loading:false

            };
        default:
            return state;
    }
};
export default markemReducer;


