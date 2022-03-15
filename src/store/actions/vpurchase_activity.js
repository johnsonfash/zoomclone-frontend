import axios from 'axios'

export const fetchVpurchaseActivityDataRequest = () => ({ type: "FETCH_VPURCHASE_ACTIVITY_DATA_REQUEST" });
export const fetchVpurchaseActivityDataSuccess = (vendorActivityData) => ({ type: "FETCH_VPURCHASE_ACTIVITY_DATA_SUCCESS", payload: vendorActivityData });
export const fetchVpurchaseActivityDataFailure = (error) => ({ type: "FETCH_VPURCHASE_ACTIVITY_DATA_FAILURE", payload: error });

export const resetVpurchaseData = () => async (dispatch) => {
  dispatch({ type: 'RESET_VPURCHASE_DATA' });
}

export const PurchaseActivityAvailable = (data) => async (dispatch) => {
  dispatch(fetchVpurchaseActivityDataSuccess(data));
}

export const sendFetchActivityData = (data) => async (dispatch) => {
  dispatch(fetchVpurchaseActivityDataRequest());
  axios.post('https://api.tradersconnect.com.ng/tradersconnect/vendor-purchase', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then(response => {
    const vOrderActivityData = response.data;
    dispatch(fetchVpurchaseActivityDataSuccess(vOrderActivityData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchVpurchaseActivityDataFailure(errorMessage));
    });
}
