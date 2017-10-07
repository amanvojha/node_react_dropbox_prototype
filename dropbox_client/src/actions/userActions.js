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
  console.log('SETTING USER' + username)
  return {
    type: "USER",
    payload: username
  }
}

export function setHome(username,isValid) {
  console.log('SETTING HOME' + username + isValid)
  return {
    type: "HOME",
    payload: {username,isValid}
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
                 
               
               const token = response.data.token;
               localStorage.setItem('jwtToken', token);
               setAuthorizationToken(token);
              
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

export function upload(username,file) {

  console.log('UPLOAD USERNAME' + username);
  const data = new FormData();
  data.append('username' , username);
  data.append('file' , file);
  //data.append('test' : "TEST");

  return function(dispatch){

    axios.post('http://localhost:3002/api/upload', data )
         .then((response) => {

              console.log(response);
              dispatch({
                   type: "UPLOADED_FILES",
                   payload: response.data.list
              }) 

          }).catch((err) => {

             })

  }
}

export function setFiles(username) {

  console.log('SET FILES ' + username);

  return function(dispatch){

    axios.post('http://localhost:3002/api/setFiles', {username} )
         .then((response) => {

              console.log(response);
              dispatch({
                   type: "SET_FILES",
                   payload: response.data.list
              }) 

          }).catch((err) => {

             })

  }


}

export function setStar(username,file_id) {

  console.log('UPLOAD USERNAME ' + username);
  console.log('FILE ' + file_id);

  return function(dispatch){

    axios.post('http://localhost:3002/api/star', {
        
            username, file_id
          
          })
         .then((response) => {

              console.log('ACTION STAR ' + response.data.star_list);
              dispatch({
                   type: "STAR_FILES",
                   payload: response.data.star_list
              }) 

          }).catch((err) => {

             })

  }
}

