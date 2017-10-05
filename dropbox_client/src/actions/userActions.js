import axios from "axios"
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

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
               console.log('DECODE' + jwt.decode(token));

               console.log('LENGTH ' + token.length);
               if(token.length>0){
                
                dispatch({
                   type: "CHECK_PASSWORD",
                   payload: true
                })

               }
               else{
                dispatch({
                   type: "CHECK_PASSWORD",
                   payload: false
                })
               }

            })
            .catch(function (error) {
              console.log(error);
              });
  }
}

export function logout() {

  return function(dispatch) {

    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({
        type: "LOGOUT",
        payload: false
    })
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