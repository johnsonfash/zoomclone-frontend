import axios from 'axios'

export const fetchCategoryDataRequest = () => ({ type: "FETCH_CATEGORY_DATA_REQUEST" });
export const fetchCategoryDataSuccess = (categoryData) => ({ type: "FETCH_CATEGORY_DATA_SUCCESS", payload: categoryData });
export const fetchCategoryDataFailure = (error) => ({ type: "FETCH_CATEGORY_DATA_FAILURE", payload: error });

export const resetCategoryData = () => async (dispatch) => {
  dispatch({ type: 'RESET_CATEGORY_DATA' });
}

export const categoryAvailable = (data) => async (dispatch) => {
  dispatch(fetchCategoryDataSuccess(data));
}

export const sendFetchCategoryData = () => async (dispatch) => {
  dispatch(fetchCategoryDataRequest());
  axios.get('https://api.tradersconnect.com.ng/tradersconnect/category').then(response => {
    const categoryData = response.data;
    console.log(response.data);
    dispatch(fetchCategoryDataSuccess(categoryData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchCategoryDataFailure(errorMessage));
    });
}
