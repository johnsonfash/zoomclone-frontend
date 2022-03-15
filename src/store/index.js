import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import productData from './reducers/product';
import orderData from './reducers/order';
import homeData from './reducers/home';
import marketData from './reducers/market';
import accountData from './reducers/account';
import search from './reducers/search';
import searchList from './reducers/searchlist';
import shopData from './reducers/shop';
import sectorData from './reducers/sector';
import categoryData from './reducers/category';
import singleMarketData from './reducers/singlemarket';
import vendorData from './reducers/vendor';
import purchaseActivity from './reducers/vpurchase_activity';
import orderActivity from './reducers/vorder_activity';

const appReducer = combineReducers({
  homeData,
  categoryData,
  accountData,
  marketData,
  singleMarketData,
  sectorData,
  productData,
  search,
  searchList,
  orderData,
  shopData,
  vendorData,
  purchaseActivity,
  orderActivity
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return appReducer(state, action);
};

let composeEnhancers = compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  composeEnhancers = compose;
}

const middleware = composeEnhancers(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, middleware);

export default store;
