import axios from 'axios';
export const fetchRequest = () => ({ type: "FETCH_REQUEST" });
export const fetchSuccess = (data) => ({ type: "FETCH_SUCCESS", payload: data });
export const fetchFailure = (error) => ({ type: "FETCH_FAILURE", payload: error });


export const clearSearch = () => async (dispatch) => {
  dispatch({ type: 'RESET_DATA' });
}

/** url = "table(i.e user)/query(i.e micheal)/where (i.e role='admin'&status='active')" */
export const searchData = (url) => async (dispatch) => {
  try {
    dispatch(fetchRequest());
    axios.get('https://api.tradersconnect.com.ng/tradersconnect/search/' + url).then(response => {
      const data = response.data;
      console.log(data)
      dispatch(fetchSuccess(data));
    })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchFailure(errorMessage));
      })

  } catch (error) {
  }
}