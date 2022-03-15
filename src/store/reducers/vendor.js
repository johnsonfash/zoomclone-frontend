const initialState = {
  loading: 'false',
  vendorData: [],
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_VENDOR_DATA_REQUEST":
      return {
        ...state,
        loading: 'true'
      }
    case "FETCH_VENDOR_DATA_SUCCESS":
      return {
        ...state,
        vendorData: action.payload,
        loading: 'done',
      }
    case "FETCH_VENDOR_DATA_FAILURE":
      return {
        ...state,
        loading: 'done',
        error: true,
        errorMessage: action.payload
      }
    case "RESET_USER_DATA":
      return {
        loading: 'false',
        vendorData: [],
        error: false,
        errorMessage: ''
      }
    default:
      return state;
  }
};