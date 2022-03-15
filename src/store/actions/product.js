import axios from 'axios'

export const fetchProductDataRequest = () => ({ type: "FETCH_PRODDUCT_DATA_REQUEST" });
export const fetchProductDataSuccess = (productData) => ({ type: "FETCH_PRODUCT_DATA_SUCCESS", payload: productData });
export const fetchProductDataFailure = (error) => ({ type: "FETCH_PRODUCT_DATA_FAILURE", payload: error });

export const resetProductData = () => async (dispatch) => {
  dispatch({ type: 'RESET_PRODUCT_DATA' });
}

export const sendFetchProductData = (product, email) => async (dispatch) => {
  email = email || 'none';
  dispatch(fetchProductDataRequest());
  axios.get('https://api.tradersconnect.com.ng/tradersconnect/product/' + product + '/' + email).then(response => {
    const productData = response.data;
    console.log(productData)
    dispatch(fetchProductDataSuccess(productData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchProductDataFailure(errorMessage));
    });
}
