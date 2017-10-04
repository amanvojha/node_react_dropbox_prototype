import axios from "axios"
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setFirstName(first_name) {
  
  return {
    type: "FNAME",
    payload: first_name
  }
}

export function setLastName(last_name) {
  
  return {
    type: "LNAME",
    payload: last_name
  }
}

export function setUsername(username) {
  
  return {
    type: "USER",
    payload: username
  }
}

export function setPassword(password) {
  
  return {
    type: "PASS",
    payload: password
  }
}

export function login(username,password) {
  
  return function(dispatch){
      axios.post('http://localhost:3002/api/login', {
            
                  username,password
            
            })
            .then(function (response) {
                 
               console.log('TOKEN : ' + response.data.token)
               const token = response.data.token;
               localStorage.setItem('jwtToken', token);
               setAuthorizationToken(token);
                                
               dispatch({
                   type: "CHECK_PASSWORD",
                   payload: response.data.status
              })
             
            })
            .catch(function (error) {
              console.log(error);
              });
  }
}

export function signup(first_name, last_name, username, password) {
  
  console.log('SIGN UP' + first_name + last_name + username+password)
  return function(dispatch){
      axios.post('http://localhost:3002/api/signup', {
            
                  first_name,last_name,username,password
            
            })
            .then(function (response) {
                                
               dispatch({
                   type: "ASSIGN",
                   payload: response.data.output
              })
             
            })
            .catch(function (error) {
              console.log(error);
              });
  }
}