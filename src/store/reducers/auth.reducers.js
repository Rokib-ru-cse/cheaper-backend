import { authConstants } from "../actions/actionConstants";

const initState = {
    token: null,
    user: {
        firstName: "",
        lastName: "",
        email: "",
        picture: "",
        role: "",
    },
    authenticate: false,
    authenticating: false,
    error: null,
    loading: false,
    message: ''
};

const authReducers = (state = initState, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            };
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break

        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState,
                loading: false,
            }
            break
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break

        default:
            return state;
    }
    return state;
};

export default authReducers;