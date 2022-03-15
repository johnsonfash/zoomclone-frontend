import axios from 'axios'

export const fetchMarketDataRequest = () => ({ type: "FETCH_MARKET_DATA_REQUEST" });
export const fetchMarketDataSuccess = (marketData) => ({ type: "FETCH_MARKET_DATA_SUCCESS", payload: marketData });
export const fetchMarketDataFailure = (error) => ({ type: "FETCH_MARKET_DATA_FAILURE", payload: error });

export const resetMarketData = () => async (dispatch) => {
  dispatch({ type: 'RESET_MARKET_DATA' });
}

export const marketAvailable = (data) => async (dispatch) => {
  dispatch(fetchMarketDataSuccess(data));
}

export const sendFetchMarketData = () => async (dispatch) => {
  dispatch(fetchMarketDataRequest());
  axios.get('https://api.tradersconnect.com.ng/tradersconnect/market').then(response => {
    const marketData = response.data;
    console.log(response.data);
    dispatch(fetchMarketDataSuccess(marketData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchMarketDataFailure(errorMessage));
    });
}
