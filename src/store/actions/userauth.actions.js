import axios from "../../helpers/axios";
import { API } from "../../urlConfig";
import { authConstants } from "./actionConstants";

export const login = (user) => {
    return async(dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST,
        });
        const res = await axios.post(`${API}/admin/signin/`, {
            ...user,
        });
        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                },
            });
            
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: res.data.error,
                },
            });
        }
    };
};

export const isUserLoggedIn = () => {
    return async(dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                },
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: "failed to login",
                },
            });
        }
    };
};

export const userLogOut = () => {
    return async dispatch => {
        localStorage.clear()
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })
    }
};


export const sigup = (user) => {
    return async(dispatch) => {
        dispatch({
            type: authConstants.USER_SIGNUP_REQUEST,
        });
        const res = await axios.post(`${API}/signup/`, {
            ...user,
        });
        if (res.status === 200) {
            const { message } = res.data;

            dispatch({
                type: authConstants.USER_SIGNUP_SUCCESS,
                payload: {
                    message
                },
            });
        } else {
            dispatch({
                type: authConstants.USER_SIGNUP_FAILURE,
                payload: {
                    error: res.data.error,
                },
            });
        }
    };
};