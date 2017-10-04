import {createStore , applyMiddleware } from "redux";
import {combineReducers} from 'redux'
import {createLogger as logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import axios from "axios"
import setAuthorizationToken from '../utils/setAuthorizationToken';

var data ={
	first_name:null,
	last_name:null,
	username:null,
	password:null,
	result:null,
	operation:null,
	isValid:null	
};
const reducer = (state=data, action) =>{

	
	switch(action.type){

		case "FNAME":{
			
			return Object.assign({}, state, {
						first_name: action.payload
					})
			break;
		}

		case "LNAME":{
			
			return Object.assign({}, state, {
						last_name: action.payload
					})
			break;
		}

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

		case "CHECK_PASSWORD":{
			
			console.log('REDUCER ISVALID' + action.payload);
			return Object.assign({}, state, {
						isValid: action.payload
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