import axios from 'axios'

export const fetchAccountDataRequest = () => ({ type: "FETCH_ACCOUNT_DATA_REQUEST" });
export const fetchAccountDataSuccess = (accountData) => ({ type: "FETCH_ACCOUNT_DATA_SUCCESS", payload: accountData });
export const fetchAccountDataFailure = (error) => ({ type: "FETCH_ACCOUNT_DATA_FAILURE", payload: error });

export const resetAccountData = () => async (dispatch) => {
  dispatch({ type: 'RESET_ACCOUNT_DATA' });
}

export const accountAvailable = (data) => async (dispatch) => {
  dispatch(fetchAccountDataSuccess(data));
}

export const sendFetchAccountData = (data) => async (dispatch) => {
  try {
    dispatch(fetchAccountDataRequest());
    axios.post('https://api.tradersconnect.com.ng/tradersconnect/customer', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      const accountData = response.data;
      console.log(accountData)
      dispatch(fetchAccountDataSuccess(accountData));
    })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchAccountDataFailure(errorMessage));
      });
  } catch (error) {
    console.log(error)
  }
}
