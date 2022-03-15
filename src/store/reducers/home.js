const initialState = {
  loading: 'false',
  homeData: [],
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_HOME_DATA_REQUEST":
      return {
        ...state,
        loading: 'true'
      };
    case "FETCH_HOME_DATA_SUCCESS":
      return {
        error: false,
        errorMessage: '',
        homeData: action.payload,
        loading: 'done'
      };
    case "FETCH_HOME_DATA_FAILURE":
      return {
        ...state,
        loading: 'false',
        error: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
