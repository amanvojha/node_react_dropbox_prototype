import axios from "axios"

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
  
  console.log('LOGIN' + username+password)
  return function(dispatch){
      axios.post('http://localhost:3002/api/login', {
            
                  username,password
            
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