const initialState = {
  loading: false,
  sectorData: [],
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SECTOR_DATA_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "FETCH_SECTOR_DATA_SUCCESS":
      return {
        error: false,
        errorMessage: '',
        sectorData: action.payload,
        loading: false
      };
    case "FETCH_SECTOR_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
