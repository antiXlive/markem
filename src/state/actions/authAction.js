import AsyncStorage from '@react-native-community/async-storage';


export const signin = (expiryDate) => (dispatch) => {
    expiryDate === 0?"":dispatch(startAuthTimer(expiryDate));
    dispatch({
        type:'HANDLE_SIGNIN',
        payload: true,
    })
};
export const SIGNOUT = () => (dispatch) => {
    dispatch({
        type:'HANDLE_SIGNOUT',
    });
    AsyncStorage.removeItem("MARKEM_USER_DATA");
    dispatch(setUserToken(null));
};

export const setUserEmail = (email) => ({
    type:"SET_EMAIL",
    payload: email,    
});
export const setUserToken = (token) => ({
    type:"SET_TOKEN",
    payload:token
});
export const setUserType = (userType) => ({
    type:"SET_USER_TYPE",
    payload:userType
});
export const setUserName = (userName) => ({
    type:"SET_USER_NAME",
    payload:userName
});
export const setUserDesignation = (designation) => ({
    type:"SET_USER_DESIGNATION",
    payload:designation
});

const startAuthTimer = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(SIGNOUT())
        }, expiresIn);
    }
}