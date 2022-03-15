import axios from 'axios';
export const fetchVendorDataRequest = () => ({ type: "FETCH_VENDOR_DATA_REQUEST" });
export const fetchVendorDataSuccess = (data) => ({ type: "FETCH_VENDOR_DATA_SUCCESS", payload: data });
export const fetchVendorDataFailure = (error) => ({ type: "FETCH_VENDOR_DATA_FAILURE", payload: error });

export const resetVendorData = () => async (dispatch) => {
  dispatch({type: 'RESET_USER_DATA'});
}

export const sendVendorData = (data) => async (dispatch) => {
  try {
    dispatch(fetchVendorDataRequest());
    axios.post('https://api.tradersconnect.com.ng/tradersconnect/vendor', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      const vendorData = response.data;
      // console.log(vendorData)
      dispatch(fetchVendorDataSuccess(vendorData));
    })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchVendorDataFailure(errorMessage));
      })

  } catch (error) {
  }
}