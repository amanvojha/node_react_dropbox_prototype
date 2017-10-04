import React, { Component } from 'react';
import logo from '../public/dropbox_logo_panel.svg';
import '../App.css';
import { setFirstName, setLastName, setUsername, setPassword, login, signup } from "../actions/userActions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';



class SignUp extends Component {

   /*var first_name = this.props.first_name;
   var last_name = this.props.last_name;
   var username = this.props.username;
   var password = this.props.password;
   var result = this.props.result;*/

  render() {
    
   	console.log('SignUp');
    return (
      <div>
        <header className="App-header App">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        
        <div className="container "> 

          <div className="panel-heading divStyle">
            <div className="panel-title ">Create an Account</div>                        
          </div>

          <div >
            
            <div className="form-group row">
                <Link to="/" href="#">Sign In</Link>
            </div>
            
            <div className="form-group row">
                
                <div className="col-sm-4">
                  <input type="text" className="form-control" name="first_name" id="first_name" placeholder="First Name" onChange={() =>this.props.dispatch(this.props.setFirstName(document.getElementById('first_name').value))}></input>
                </div>
            </div>

            <div className="form-group row">
                
                <div className="col-sm-4">
                  <input type="text" className="form-control" name="last_name" id="last_name" placeholder="Last Name" onChange={() =>this.props.dispatch(this.props.setLastName(document.getElementById('last_name').value))}></input>
                </div>
            </div>

            <div className="form-group row">
                
                <div className="col-sm-4">
                  <input type="email" className="form-control" name="username" id="username" placeholder="Email" onChange={() =>this.props.dispatch(this.props.setUsername(document.getElementById('username').value))}></input>
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-4">
                  <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={() =>this.props.dispatch(this.props.setPassword(document.getElementById('password').value))}></input>
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-7">
                  <button type="submit" onClick={() =>this.props.signup(this.props.first_name,this.props.last_name,this.props.username, this.props.password,)} className="btn btn-primary" >Create an account</button>
                </div> 
            </div>

          
          </div>

        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
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

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);