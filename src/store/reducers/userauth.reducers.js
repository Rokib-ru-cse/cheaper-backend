import { authConstants } from "../actions/actionConstants";

const initState = {
    error: null,
    message: '',
    loading: false
};

const userauthReducers = (state = initState, action) => {
    switch (action.type) {
        case authConstants.SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            };
            break;
        case authConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
            }
            break;
        case authConstants.SIGNUP_FAILURE:
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

export default userauthReducers;