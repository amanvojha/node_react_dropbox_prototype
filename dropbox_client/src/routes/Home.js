import React, { Component } from 'react';
import logo from '../public/dropbox_logo_panel.svg';
import star from '../public/star.png';
import '../App.css';
import { setFirstName, setLastName, setUsername, setPassword, login, signup, logout, upload, setFiles } from "../actions/userActions";
import { setStar } from "../actions/userActions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';



class Home extends Component {

   /*var first_name = this.props.first_name;
   var last_name = this.props.last_name;
   var username = this.props.username;
   var password = this.props.password;
   var result = this.props.result;*/

  componentWillMount() {

      if(!this.props.isValid){
        console.log('Pushing to the page ')
        this.props.history.push('/');
      }

      //Bringing Uploaded files
      this.props.setFiles(this.props.username);

   }

  componentDidUpdate(prevProps, prevState) {

      console.log('Component DID UPDATE!')
      console.log(this.props.isValid)
      if(!this.props.isValid){
        console.log('Pushing to the page ')
        this.props.history.push('/');
      }

   }

  
  render() {

    var username = this.props.username;
    console.log('NAME : ' + username);
    var hide = {
      display : "none"
    }

    var file_list = this.props.file_list.map((item,key) =>
      {
          return(
              <div key={key} >
                  <label htmlFor="fileName" className="home-file-row">{item.file_name}
                    <img src={star} className="home-row-objects" onClick={() => this.props.setStar(this.props.username,item.file_id)}/>
                  </label>
              </div> 
          )
      }
    );

    var file_stared = this.props.file_stared.map((item,key) =>
      {
          return(
              <div key={key}>
                  <label htmlFor="fileStared" className="home-file-row">{item.file_name}</label>
              </div> 
          )
      }
    );


    return (
          <div>
              <div className="col-lg-12 row home-body">
                
                      <div className="col-lg-2 home-left-panel">
                          <label>Home</label>
                          <label>Files</label>
                      </div>
                      
                      <div className="col-lg-8 home-content">
                        
                          <div>
                              <h4>Home</h4>
                          </div> 

                          <div>

                              <h6 className="home-file-row">Starred</h6>
                              <div>
                                {file_stared}
                              </div>
                              
                              <div className="home-gap">
                                <label></label>
                              </div>
                              
                              <h6 className="home-file-row">Recent</h6>
                              <div>
                                {file_list}
                              </div> 

                          </div>    
                      </div>
                      
                      
                      <div className="col-lg-2 home-right-panel">
                            <div>
                                  <button className="btn btn-danger" onClick={() => this.props.logout()}>Logout</button>
                            </div>
                              
                            <div>
                                 <label htmlFor="upload" className="btn btn-primary">Upload files</label>
                                   <input type="file" name="upload" id="upload" style={hide} 
                                          onChange={(e) =>this.props.upload(this.props.username,e.target.files[0])}></input>
                            </div>
                      </div>

              </div>
          </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
    
    return {
        logout : () => dispatch(logout()),
        upload : (username,file) => dispatch(upload(username,file)),
        setFiles: (username) => dispatch(setFiles(username)),
        setStar: (username,file) => dispatch(setStar(username,file))
        
    };
}

const mapStateToProps = (state) => { 
  return { username: state.reducer.username,
           password: state.reducer.password,
           first_name: state.reducer.first_name,
           last_name: state.reducer.last_name,
           result: state.reducer.result,
           isValid: state.reducer.isValid,
           file_list: state.reducer.file_list,
           file_stared: state.reducer.file_stared
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);

