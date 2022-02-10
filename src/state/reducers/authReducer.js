const initialState = {
    email:null,
    loggedin: null,
    token:null,
    userType:null,
    userName:null,
    userDesignation:null,
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case "HANDLE_SIGNIN":
            return{
                ...state,
                loggedin:action.payload,
            };
        case "HANDLE_SIGNOUT":
            return{
                ...state,
                loggedin:false
            }
        case "SET_EMAIL":
            return{
                ...state,
                email:action.payload,
            };
        case "SET_TOKEN":
            return{
                ...state,
                token:action.payload,
            }
        case "SET_USER_TYPE":
            return{
                ...state,
                userType: action.payload
            }
        case "SET_USER_NAME":
            return{
                ...state,
                userName: action.payload
            }
        case "SET_USER_DESIGNATION":
            return{
                ...state,
                userDesignation: action.payload
            }
        default:
            return state;
    }
};
export default authReducer;