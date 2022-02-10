const initialState = {
    loading:true,
    selectedProgramme:'',
    selectedBatch:'',
    selectedDepartment:'',
    all_programmes:null,
    batches:null,
    departments:null,
    courses:null,
    courseStudents:null,
    students:null,
    class:null,
    attendance:null,
};

const markemReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_LOADING":
            return{
                loading:action.payload,
            }
        case "SET_SELECTED_PROGRAMME":
            return{
                ...state,
                selectedProgramme:action.payload,
            };
        case "SET_SELECTED_BATCH":
            return{
                ...state,
                selectedBatch:false
            }
        case "SET_SELECTED_DEPARTMENT":
            return{
                ...state,
                selectedDepartment:action.payload,
            };
        case "SET_PROGRAMMES":
            return{
                ...state,
                all_programmes:action.payload,
            };
        case "SET_BATCHES":
            return{
                ...state,
                batches:action.payload,
                loading:false,
            };
        case "SET_DEPARTMENTS":
            return{
                ...state,
                departments:action.payload,
                loading:false,
            };
        case "SET_COURSES":
            return{
                ...state,
                courses:action.payload,
            };
        case "SET_COURSE_STUDENTS":
            return{
                ...state,
                courseStudents:action.payload,
            };
        case "SET_STUDENTS":
            return{
                ...state,
                students:action.payload,
                loading:false,
            };
        default:
            return state;
    }
};
export default markemReducer;