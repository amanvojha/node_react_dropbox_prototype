import React, { Component } from 'react';
import logo from '../public/dropbox_logo_panel.svg';
import '../App.css';
import { setFirstName, setLastName, setUsername, setPassword, login, signup } from "../actions/userActions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';



class Home extends Component {

   /*var first_name = this.props.first_name;
   var last_name = this.props.last_name;
   var username = this.props.username;
   var password = this.props.password;
   var result = this.props.result;*/

  render() {
    
   	console.log('Home');
    console.log(this);
    return (
      <div>
        <header className="App-header App">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1 className="text-right">Home</h1>
        
      </div>
    );
  }
}

/*function mapDispatchToProps(dispatch) {
    let actions = {setUsername, setPassword, setFirstName, setLastName};
    return {
        signup : (first_name, last_name, username,password) => dispatch(signup(first_name, last_name, username,password)),
        ...actions,dispatch
    };
}

const mapStateToProps = (state) => { 
  return { username: state.reducer.username,
           password: state.reducer.password,
           first_name: state.reducer.first_name,
           last_name: state.reducer.last_name,
           result: state.reducer.result
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);*/

export default Home;