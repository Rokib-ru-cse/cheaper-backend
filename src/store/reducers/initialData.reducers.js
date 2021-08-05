import { productConstants } from "../actions/actionConstants";

const initState = {
  products: [],
};

const initialDataReducers = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_SUCCESS:
    return {
        ...state,
           products:action.payload,
      };

    default:
      return state;
  }
};

export default initialDataReducers;
