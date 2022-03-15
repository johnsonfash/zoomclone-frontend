import axios from 'axios'

export const fetchVorderActivityDataRequest = () => ({ type: "FETCH_VORDER_ACTIVITY_DATA_REQUEST" });
export const fetchVorderActivityDataSuccess = (vendorActivityData) => ({ type: "FETCH_VORDER_ACTIVITY_DATA_SUCCESS", payload: vendorActivityData });
export const fetchVorderActivityDataFailure = (error) => ({ type: "FETCH_VORDER_ACTIVITY_DATA_FAILURE", payload: error });

export const resetOrderData = () => async (dispatch) => {
  dispatch({ type: 'RESET_VORDER_DATA' });
}

export const OrderActivityAvailable = (data) => async (dispatch) => {
  dispatch(fetchVorderActivityDataSuccess(data));
}

export const sendFetchActivityData = (data) => async (dispatch) => {
  dispatch(fetchVorderActivityDataRequest());
  axios.post('https://api.tradersconnect.com.ng/tradersconnect/vendor-activity', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then(response => {
    const vOrderActivityData = response.data;
    dispatch(fetchVorderActivityDataSuccess(vOrderActivityData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchVorderActivityDataFailure(errorMessage));
    });
}
