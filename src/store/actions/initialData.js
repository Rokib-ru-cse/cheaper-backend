import axios from "../../helpers/axios";
import { categoryConstants, orderConstants, productConstants } from "./actionConstants";

const getInitialData = ()=>{
    return async (dispatch)=>{
        
        const res = await axios.post('/initialdata')
        const {products,categories,orders} = res.data
        if(res.status==200){
            dispatch({
                type:categoryConstants.GET_CATEGORY_SUCCESS,
                payload:{categories}
            })
            dispatch({
                type:productConstants.GET_PRODUCT_SUCCESS,
                payload:[...products]
                
            })
            dispatch({
                type:orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload:{orders}
                
            })
        }
    }    
}
export {
    getInitialData
}