const initialState = {
  loading: 'false',
  productData: [],
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODDUCT_DATA_REQUEST":
      return {
        ...state,
        loading: 'true'
      };
    case "FETCH_PRODUCT_DATA_SUCCESS":
      return {
        error: false,
        errorMessage: '',
        productData: action.payload,
        loading: 'done'
      };
    // case RESET_ORDER_DATA:
    //   return {
    //     orderLoading: 'done',
    //     orderData: [],
    //     images: [],
    //     error: false,
    //     errorMessage: ''
    //   };
    case "FETCH_PRODUCT_DATA_FAILURE":
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
