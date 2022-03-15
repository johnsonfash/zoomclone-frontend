const initialState = {
  loading: 'false',
  vPurchaseActivityData: [],
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_VPURCHASE_ACTIVITY_DATA_REQUEST":
      return {
        ...state,
        loading: 'true'
      };
    case "FETCH_VPURCHASE_ACTIVITY_DATA_SUCCESS":
      return {
        error: false,
        errorMessage: '',
        vPurchaseActivityData: action.payload,
        loading: 'done'
      };
    case "FETCH_VPURCHASE_ACTIVITY_DATA_FAILURE":
      return {
        ...state,
        loading: 'done',
        error: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
