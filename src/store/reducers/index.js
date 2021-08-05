import authReducers from "./auth.reducers"
import { combineReducers } from 'redux'
import userauthReducers from './userauth.reducers'
import productReducers from './product.reducer'
import orderReducers from './order.reducer'
import categoryReducers from './category.reducer'
import initialDataReducers from './initialData.reducers'
import pageReducers from './page.reducer'

const rootReducers = combineReducers({
    authReducers: authReducers,
    userauthReducers: userauthReducers,
    productReducers : productReducers,
    orderReducer : orderReducers,
    categoryReducers : categoryReducers,
    initialDataReducers:initialDataReducers,
    pageReducers:pageReducers
})

export default rootReducers