import Loading from "../../components/UI/Loading";
import { categoryConstants } from "../actions/actionConstants";

const initState = {
  categories: [],
  loading: false,
  error: null
};

const buildNewCategories =(parentId,categories,category)=>{

  let myCategory = []

  if(parentId==undefined){
    return [
      ...categories,
      {
        _id:category._id,
        name:category.name,
        slug:category.slug,
        type:category.type,
        children:[]
      }
    ]
  }

  for(let cat of categories){
    if(cat._id == parentId){

      const newCategory = {
        _id: category._id,
        name:category.name,
        slug:category.slug,
        type:category.type,
        parentId:category.parentId,
        children:[]
      }

      myCategory.push({
        ...cat,
        children:cat.children.length>0 ? [...cat.children,newCategory]:[newCategory]
      }) 
    }else{
    myCategory.push({
      ...cat,
      children:cat.children ? buildNewCategories(parentId,cat.children,category) : []
    })
  } 
}

  return myCategory
}

const categoryReducers = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };

    case categoryConstants.GET_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case categoryConstants.ADD_CATEGORY_REQUEST:
      return{
        ...state,
        loading:true
      }
    case categoryConstants.ADD_CATEGORY_SUCCESS:
      const category = action.payload.category
      return{
        ...state,
        categories : buildNewCategories(category.parentId,state.categories,category),
        loading:false
      }
    case categoryConstants.ADD_CATEGORY_FAILURE:
      return{
        ...initState,
        loading:false
      }
    case categoryConstants.UPDATE_CATEGORIES_REQUEST:
      return{
        ...initState,
        loading:true
      }
    case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
      return{
        ...initState,
        loading:false
      }
    case categoryConstants.UPDATE_CATEGORIES_FAILURE:
      return {
        ...initState,
        loading:false,
        error:action.payload.error
      }
      case categoryConstants.DELETE_CATEGORIES_REQUEST:
        return{
          ...initState,
          loading:true
        }
      case categoryConstants.DELETE_CATEGORIES_SUCCESS:
        return{
          ...initState,
          loading:false
        }
      case categoryConstants.DELETE_CATEGORIES_FAILURE:
        return {
          ...initState,
          loading:false,
          error:action.payload.error
        }

    default:
      return state;
  }
};

export default categoryReducers;
