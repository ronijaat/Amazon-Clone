export const getProducts = ()=>async(dispatch)=>{
    try{
        const data = await fetch("/getproducts",{
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        const res = await data.json();
        console.log('actionnn',res);
        dispatch({type: "SUCCESS_GET_PRODUCTS", payload: res});
    }catch(err){
        dispatch({type: "FAIL_GET_PRODUCTS", payload: err.response});
    }
}