const initialState = {
  loading: false,
  singleMarketData: { market: [] },
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SINGLE_MARKET_DATA_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "FETCH_SINGLE_MARKET_DATA_SUCCESS":
      return {
        error: false,
        errorMessage: '',
        singleMarketData: { market: action.payload },
        loading: false
      };
    case "FETCH_SINGLE_MARKET_DATA_AVAILABLE":
      return {
        error: false,
        errorMessage: '',
        singleMarketData: action.payload,
        loading: false
      };
    case "FETCH_SINGLE_MARKET_DATA_FAILURE":
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
