const initialState = {
  loading: 'false',
  accountData: [],
  error: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ACCOUNT_DATA_REQUEST":
      return {
        ...state,
        loading: 'true'
      };
    case "FETCH_ACCOUNT_DATA_SUCCESS":
      return {
        error: false,
        errorMessage: '',
        accountData: action.payload,
        loading: 'done'
      };
    case "FETCH_ACCOUNT_DATA_FAILURE":
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
