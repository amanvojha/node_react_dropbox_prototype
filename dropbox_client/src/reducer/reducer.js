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
	message:null,
	isSignup:null,
	bio:null,
	mobile:null,
	education:null,
	work:null,
	interest:null,
	result:null,
	operation:null,
	isValid:false,
	isLogout:null,
	isShared:null,
	profile_updated:null,
	file_list:[],
	shared_list: [],
	file_list_recent:[],
	file_stared:[],
	activity:[],
	user_profile:[]	
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

		case "SIGNUP":{
			
			return Object.assign({}, state, {
						isSignup: action.payload
					})
			break;
		}

		case "HOME":{
			
			return Object.assign({}, state, {
						username: action.payload.username,
						isValid: action.payload.isValid
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
			if(action.payload===true)
			{
				return Object.assign({}, state, {
							isValid: action.payload,
							message:""
						})
			}
			else
			{
				console.log('REDUCER ISVALID' + action.payload);
				return Object.assign({}, state, {
							isValid: action.payload,
							message:"Wrong Username or Password"
						})	
			}	
			break;
		}

		case "UPLOADED_FILES":{
			
			console.log('UPLOADED_FILES' + action.payload);
			return Object.assign({}, state, {
						file_list:action.payload
					})
					
			break;
		}

		case "UPLOADED_HOME_FILES":{
			
			console.log('UPLOADED_HOME_FILES' + action.payload);
			return Object.assign({}, state, {
						file_list_recent:action.payload
					})
					
			break;
		}

		case "SET_FILES":{
			
			console.log('SET_FILES' + action.payload);
			return Object.assign({}, state, {
						file_list:action.payload
					})
					
			break;
		}

		case "SET_HOME_FILES":{
			
			console.log('SET_HOME_FILES' + action.payload);
			return Object.assign({}, state, {
						file_list_recent:action.payload
					})
					
			break;
		}

		case "STAR_FILES":{
			
			console.log('STAR_FILES' + action.payload);
			return Object.assign({}, state, {
						file_stared:action.payload
					})
					
			break;
		}

		case "SET_STAR_FILES":{
			
			console.log('SET_STAR_FILES' + action.payload);
			return Object.assign({}, state, {
						file_stared:action.payload
					})
					
			break;
		}

		case "DELETE_FILES":{
			
			console.log('DELETE_FILES' + action.payload);
			return Object.assign({}, state, {
						file_list:action.payload.full_list,
						file_list_recent: action.payload.recent_list
					})
					
			break;
		}

		case "LOGOUT" : {

			return Object.assign({}, state, {

				isValid: action.payload
			})
			break;
		}

		case "ACTIVITY" : {

			return Object.assign({}, state, {

				activity: action.payload
			})
			break;
		}

		case "EDIT_PROFILE" : {

			return Object.assign({}, state, {

				profile_updated: action.payload
			})
			break;
		}

		case "GET_PROFILE" : {

			return Object.assign({}, state, {

				first_name:action.payload.first_name,
				last_name: action.payload.last_name,
				bio: action.payload.bio,
				mobile: action.payload.mobile,
				education: action.payload.education,
				work: action.payload.work,
				interest: action.payload.interests

			})
			break;
		}
		
		case "SHARE" : {

			return Object.assign({}, state, {

				isShared: action.payload
			})
			break;
		}

		case "GET_SHARE" : {

			return Object.assign({}, state, {

				shared_list: action.payload
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