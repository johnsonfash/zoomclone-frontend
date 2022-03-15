const initialState = {
  loading: 'false',
  searchData: [],
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {
        ...state,
        loading: 'true'
      }
    case "FETCH_SUCCESS":
      return {
        ...state,
        searchData: action.payload,
        loading: 'done',
      }
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: 'done',
        error: true,
        errorMessage: action.payload
      }
    case "RESET_DATA":
      return {
        loading: 'false',
        searchData: [],
        error: false,
        errorMessage: ''
      }
    default:
      return state;
  }
};