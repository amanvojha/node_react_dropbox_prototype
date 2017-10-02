import {createStore , applyMiddleware } from "redux";
import {combineReducers} from 'redux'
import {createLogger as logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import axios from "axios"

var data ={
	username:null,
	password:null,
	result:null,
	operation:null	
};
const reducer = (state=data, action) =>{

	
	switch(action.type){

		case "USER":{
			
			return Object.assign({}, state, {
						username: action.payload
					})
			break;
		}


		case "PASS":{
			
			return Object.assign({}, state, {
						password: action.payload
					})
			break;
		}


	}
		
	return state;
}

const middleware = applyMiddleware(promise() , thunk , logger());

var combine = combineReducers({reducer});

const store = createStore(combine, middleware);

export default store;