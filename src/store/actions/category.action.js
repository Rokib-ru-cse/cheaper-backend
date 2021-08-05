import axios from "../../helpers/axios";
import { categoryConstants } from "./actionConstants";

const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.GET_CATEGORY_REQUEST,
    });
    const res = await axios.get("/categories");
    if (res.status == 200) {
      dispatch({
        type: categoryConstants.GET_CATEGORY_SUCCESS,
        payload: {
          categories: res.data.categories,
        },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_CATEGORY_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.ADD_CATEGORY_REQUEST,
    });
    try {
      const res = await axios.post("/categories", form);
      if (res.status == 201) {
        dispatch({
          type: categoryConstants.ADD_CATEGORY_SUCCESS,
          payload: {
            category: res.data.category
          }
        });
      } else {
        dispatch({
          type: categoryConstants.ADD_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      
      console.log('category action page',error.response);
    }

  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({type:categoryConstants.UPDATE_CATEGORIES_REQUEST})
    const res = await axios.post("/categories/update", form);
    if (res.status == 201) {
      dispatch({type:categoryConstants.UPDATE_CATEGORIES_SUCCESS})
      dispatch(getAllCategory())
    } else {
      const {error} = res.data
      dispatch({
        type:categoryConstants.UPDATE_CATEGORIES_FAILURE,
        payload:{error}
      })
    }
  };
};

export const deleteCategories = (idsArray) => {
  return async (dispatch) => {
    dispatch({type:categoryConstants.DELETE_CATEGORIES_REQUEST})
    const res = await axios.post("/categories/delete", {
      payload: {
        idsArray
      }
    });
    if (res.status == 200) {
      dispatch({type:categoryConstants.DELETE_CATEGORIES_SUCCESS})
      dispatch(getAllCategory())
    } else {
      const {error} = res.data
      dispatch({
        type:categoryConstants.DELETE_CATEGORIES_FAILURE,
        payload:{error}
      })
    }
  };
};

export {
  getAllCategory
}