import axios from 'axios'

export const fetchShopDataRequest = () => ({ type: "FETCH_SHOP_DATA_REQUEST" });
export const fetchShopDataSuccess = (shopData) => ({ type: "FETCH_SHOP_DATA_SUCCESS", payload: shopData });
export const fetchShopDataFailure = (error) => ({ type: "FETCH_SHOP_DATA_FAILURE", payload: error });

export const resetShopData = () => async (dispatch) => {
  dispatch({ type: 'RESET_SHOP_DATA' });
}

export const shopAvailable = (data) => async (dispatch) => {
  dispatch(fetchShopDataSuccess(data));
}

export const sendFetchShopData = () => async (dispatch) => {
  dispatch(fetchShopDataRequest());
  axios.get('https://api.tradersconnect.com.ng/tradersconnect/shop').then(response => {
    const shopData = response.data;
    dispatch(fetchShopDataSuccess(shopData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchShopDataFailure(errorMessage));
    });
}
