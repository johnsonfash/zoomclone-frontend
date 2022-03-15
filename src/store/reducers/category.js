const initialState = {
  loading: 'false',
  categoryData: [],
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORY_DATA_REQUEST":
      return {
        ...state,
        loading: 'true'
      };
    case "FETCH_CATEGORY_DATA_SUCCESS":
      return {
        error: false,
        errorMessage: '',
        categoryData: action.payload,
        loading: 'done'
      };
    case "FETCH_CATEGORY_DATA_FAILURE":
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
