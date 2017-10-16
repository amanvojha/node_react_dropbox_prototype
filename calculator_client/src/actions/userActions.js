import axios from "axios"

export function set1(num1) {
  
  return {
    type: "SET1",
    payload: num1
  }
}

export function set2(num2) {
  
  return {
    type: "SET2",
    payload: num2
  }
}

export function calculate(num1,num2,operation) {
  

  return function(dispatch){
      axios.get('http://localhost:3002/api/' + operation, {
            params: {
                  num1,num2
            }
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