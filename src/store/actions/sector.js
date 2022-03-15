import axios from 'axios'

export const fetchSectorDataRequest = () => ({ type: "FETCH_SECTOR_DATA_REQUEST" });
export const fetchSectorDataSuccess = (sectorData) => ({ type: "FETCH_SECTOR_DATA_SUCCESS", payload: sectorData });
export const fetchSectorDataFailure = (error) => ({ type: "FETCH_SECTOR_DATA_FAILURE", payload: error });

export const resetSectorData = () => async (dispatch) => {
  dispatch({ type: 'RESET_SECTOR_DATA' });
}

export const sectorAvailable = (data) => async (dispatch) => {
  dispatch(fetchSectorDataSuccess(data));
}

export const sendFetchSectorData = () => async (dispatch) => {
  dispatch(fetchSectorDataRequest());
  axios.get('https://api.tradersconnect.com.ng/tradersconnect/sector').then(response => {
    const sectorData = response.data;
    dispatch(fetchSectorDataSuccess(sectorData));
  })
    .catch(error => {
      const errorMessage = error.message;
      dispatch(fetchSectorDataFailure(errorMessage));
    });
}
