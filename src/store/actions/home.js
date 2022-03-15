import axios from 'axios'
export const fetchHomeDataRequest = () => ({ type: "FETCH_HOME_DATA_REQUEST" });
export const fetchHomeDataSuccess = (homeData) => ({ type: "FETCH_HOME_DATA_SUCCESS", payload: homeData });
export const fetchHomeDataFailure = (error) => ({ type: "FETCH_HOME_DATA_FAILURE", payload: error });

export const resetHomeData = () => async (dispatch) => {
  dispatch({ type: 'RESET_HOME_DATA' });
}

export const homeAvailable = (data) => async (dispatch) => {
  dispatch(fetchHomeDataSuccess(data));
}

export const sendFetchHomeData = () => async (dispatch) => {
  dispatch(fetchHomeDataRequest());
  axios.get('https://api.tradersconnect.com.ng/tradersconnect/home').then(response => {
    const homeData = response.data;
    console.log(response.data);
    dispatch(fetchHomeDataSuccess(homeData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchHomeDataFailure(errorMessage));
    });
}
