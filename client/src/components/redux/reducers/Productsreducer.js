const products = []

export const getProductsreducer = (state={products},action)=>{
    const {type, payload} = action;
    switch (type) {
        case "SUCCESS_GET_PRODUCTS":
            return {products: payload}
        case "FAIL_GET_PRODUCTS":
            return {products:payload}
        default:
            return state
    }
}