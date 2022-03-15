import axios from 'axios'

export const fetchSingleMarketDataRequest = () => ({ type: "FETCH_SINGLE_MARKET_DATA_REQUEST" });
export const fetchSingleMarketDataSuccess = (singleMarketData) => ({ type: "FETCH_SINGLE_MARKET_DATA_SUCCESS", payload: singleMarketData });
export const fetchSingleMarketDataAvailable = (singleMarketData) => ({ type: "FETCH_SINGLE_MARKET_DATA_AVAILABLE", payload: singleMarketData });
export const fetchSingleMarketDataFailure = (error) => ({ type: "FETCH_SINGLE_MARKET_DATA_FAILURE", payload: error });

export const resetSingleMarketData = () => async (dispatch) => {
  dispatch({ type: 'RESET_SINGLE_MARKET_DATA' });
}

export const marketAvailable = (data) => async (dispatch) => {
  dispatch(fetchSingleMarketDataSuccess(data));
}

export const sendFetchSingleMarketData = (slug) => async (dispatch) => {
  dispatch(fetchSingleMarketDataRequest());
  axios.get('https://api.tradersconnect.com.ng/tradersconnect/market/' + slug).then(response => {
    const singleMarketData = response.data;
    // console.log(response.data);
    dispatch(fetchSingleMarketDataSuccess(singleMarketData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchSingleMarketDataFailure(errorMessage));
    });
}
