import {combineReducers} from "redux";

import { getProductsreducer } from "./reducers/Productsreducer";

const rootReducer = combineReducers({
    getproductsdata: getProductsreducer,
})

export default rootReducer;