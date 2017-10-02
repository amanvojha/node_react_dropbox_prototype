import React, { Component } from 'react';
import logo from './public/dropbox_logo_panel.svg';
import './App.css';
import { connect } from "react-redux";
import { setUsername, setPassword, login } from "./actions/userActions";


class SignIn extends Component {


  render() {
    
   var username = this.props.username;
   var password = this.props.password;
   var result = this.props.result;

    return (
      <div>
        <header className="App-header App">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        
        <div className="container "> 

          <div className="panel-heading divStyle">
            <div className="panel-title ">Sign In</div>                        
          </div>

          <div >
            
            <div className="form-group row">
                <a href="/signUp">Sign Up</a>
            </div>
            <div className="form-group row">
                
                <div className="col-sm-4">
                  <input type="text" className="form-control" name="username" id="username" placeholder="Username" onChange={() =>this.props.dispatch(this.props.setUsername(document.getElementById('username').value))}></input>
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-4">
                  <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={() =>this.props.dispatch(this.props.setPassword(document.getElementById('password').value))}></input>
                </div>
            </div>

            <div className="form-group row">
                <div className="col-sm-7">
                  <button type="submit" onClick={() =>this.props.login(this.props.username, this.props.password, 'login')} className="btn btn-primary" >Sign In</button>
                </div> 
            </div>

          
          </div>

        </div>

      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
    let actions = {setUsername, setPassword};
    return {
        login : (username,password) => dispatch(login(username,password)),
        ...actions,dispatch
    };
}

const mapStateToProps = (state) => { 
  return { username: state.reducer.username,
           password: state.reducer.password,
           result: state.reducer.result
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);

