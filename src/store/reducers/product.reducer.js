import { productConstants } from "../actions/actionConstants";

const initState = {
  loading: false,
  product: [],
  error: "",
};

const productReducers = (state = initState, action) => {
  switch (action.type) {
    case productConstants.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case productConstants.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
    //    product:action.payload.,
      };
    case productConstants.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducers;
