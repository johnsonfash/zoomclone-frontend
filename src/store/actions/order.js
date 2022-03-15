import axios from 'axios'

export const fetchOrderDataRequest = () => ({ type: "FETCH_ORDER_DATA_REQUEST" });
export const fetchOrderDataSuccess = (orderData) => ({ type: "FETCH_ORDER_DATA_SUCCESS", payload: orderData });
export const fetchOrderDataFailure = (error) => ({ type: "FETCH_ORDER_DATA_FAILURE", payload: error });

export const resetOrderData = () => async (dispatch) => {
  dispatch({ type: 'RESET_ORDER_DATA' });
}

export const sendFetchOrderData = (data) => async (dispatch) => {
  dispatch(fetchOrderDataRequest());
  axios.post('https://api.tradersconnect.com.ng/tradersconnect/order', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then(response => {
    // console.log(response.data)
    const orderData = response.data;
    dispatch(fetchOrderDataSuccess(orderData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchOrderDataFailure(errorMessage));
    });
}
