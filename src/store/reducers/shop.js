const initialState = {
  loading: false,
  shopData: [],
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SHOP_DATA_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "FETCH_SHOP_DATA_SUCCESS":
      return {
        error: false,
        errorMessage: '',
        shopData: action.payload,
        loading: false
      };
    case "FETCH_SHOP_DATA_FAILURE":
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
