import {createStore, compose, applyMiddleware} from 'redux';
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate, purge} from 'redux-persist';
import reducer from '../reducer';
import {enableUI} from '../actions';
import {createBlacklistFilter} from 'redux-persist-transform-filter';

//REMOVE
import logger from 'redux-logger'


var defaultState = {};

exports.configureStore = (initialState=defaultState) => {
  var store = createStore(reducer, initialState,
  		 compose(applyMiddleware(thunk/*, logger*/),
  		 	autoRehydrate()
  		 	));
  persistStore(store, {storage: AsyncStorage, blacklist:['events','form','nav']},()=>{
  	store.dispatch(enableUI());
  }).purge();
  return store;
}