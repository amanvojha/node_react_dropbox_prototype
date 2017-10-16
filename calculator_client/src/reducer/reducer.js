import {createStore , applyMiddleware } from "redux";
import {combineReducers} from 'redux'
import {createLogger as logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import axios from "axios"


var data ={
	num1:0,
	num2:0,
	result:0,
	operation:null	

};
const reducer = (state=data, action) =>{

	
	switch(action.type){
		
		case "SET1":{
			
			return Object.assign({}, state, {
						num1: action.payload
					})

			break;
		}

		case "SET2":{
			
			return Object.assign({}, state, {
						num2: action.payload
					})


			break;
		}

		case "ASSIGN":{

			
			return Object.assign({}, state, {
						result: action.payload
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