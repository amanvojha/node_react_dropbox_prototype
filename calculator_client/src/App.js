import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
//import { add, subtract, divide, multiply, set1, set2 } from "./actions/userActions";
import { set1, set2, calculate } from "./actions/userActions";

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {value: ''};
  }
  
 /* setValueNum1(event){

    this.setState({num1: event.target.value});
    console.log('TEST ' + event.target.value);
    console.log('num1 : ' + this.state.num1);

  }*/
  setValueNum2(event){

    this.setState({num2: event.target.value});

  }
  

  render() {

    var num1 = this.props.num1;
    var num2 = this.props.num2;
    var result = this.props.result;
    /*console.log('Number 1 : ' + this.props.num1);
    console.log('Number 2 : ' + this.props.num2);
    console.log('Result : ' + this.props.result);*/

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Calculator</h2>

        </div>
        

        <div className="col-sm-12 form-horizontal form">
          
            <div className="form-group row">
              <div className="col-sm-4">
                <label>Number 1</label>
              </div>  
              <div class="col-sm-4">
                  <input type="text" className="form-control" id="num1"  onChange={() =>this.props.dispatch(this.props.set1(document.getElementById('num1').value))}></input> 
               </div>  
            </div>
        </div>


        <div className="col-sm-12 form-horizontal">
          
            <div className="form-group row">
              <div className="col-sm-4">
                <label>Number 2</label>
              </div>
              <div class="col-sm-4">  
                <input type="text" className="form-control" id="num2" onChange={() =>this.props.dispatch(this.props.set2(document.getElementById('num2').value))}></input> 
              </div>
            </div>
        </div>

        <div className="col-sm-12 form-horizontal">
          
            <div className="form-group row">
              <div className="col-sm-4">
                <label>Output</label>
              </div>
              <div class="col-sm-4"> 
                <input type="text" className="form-control" id="output" value={this.props.result}></input>
              </div>   
            </div>
        </div>


        <div className="form-horizontal ">
          
            <div className="col-sm-12 form-group row">
                <button type="submit" onClick={() =>this.props.calculate(this.props.num1, this.props.num2, 'add')} className="btn btn-success btn-margin" >Addition</button>
                <button type="submit" onClick={() =>this.props.calculate(this.props.num1, this.props.num2, 'subtract')} className="btn btn-success btn-margin" >Subtraction</button>
                <button type="submit" onClick={() =>this.props.calculate(this.props.num1, this.props.num2, 'divide')} className="btn btn-success btn-margin" >Division</button>
                <button type="submit" onClick={() =>this.props.calculate(this.props.num1, this.props.num2, 'multiply')} className="btn btn-success btn-margin" >Multiplication</button> 
            </div>
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    let actions = {set1, set2};
    return {
        calculate : (num1,num2,operation) => dispatch(calculate(num1,num2,operation)),
        ...actions,dispatch
    };
}

const mapStateToProps = (state) => { 
  return { num1: state.reducer.num1,
           num2: state.reducer.num2,
           result: state.reducer.result
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

