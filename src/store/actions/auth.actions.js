import axios from "../../helpers/axios";
// import { API } from "../../urlConfig";
import { authConstants } from "./actionConstants";
import { getAllCategory } from "./category.action";
import { getInitialData } from "./initialData";

export const login = (user) => {
    return async(dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST,
        });
        const res = await axios.post(`/admin/signin/`, {
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
            dispatch(getAllCategory())
            dispatch(getInitialData())
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
            dispatch(getAllCategory())
            dispatch(getInitialData())
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
    return async(dispatch) => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST,
        });

        const res = await axios.post(`/admin/signout`);
        if (res.status == 200) {
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS,
            });
        } 
        else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: {
                    error: res.data.error
                }
            });
        }
    };
}; 

export const signup = (user) => {
    return async(dispatch) => {
        dispatch({
            type: authConstants.SIGNUP_REQUEST,
        });
        const res = await axios.post(`/admin/signup/`, {
            ...user,
        });
        if (res.status === 201) {
            const { message } = res.data.user;

            dispatch({
                type: authConstants.SIGNUP_SUCCESS,
                payload: {
                    message,
                },
            });
        } else {
            dispatch({
                type: authConstants.SIGNUP_FAILURE,
                payload: {
                    error: res.data.error,
                },
            });
        }
    };
};