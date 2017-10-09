import React, { Component } from 'react';
import logo from '../public/dropbox_logo_panel.svg';
import star from '../public/star.png';
import logo_small from '../public/logo_small.svg';
import smiley from '../public/smiley.png';
import '../App.css';
import { setFirstName, setLastName, setUsername, setPassword, login, signup, logout, upload, setFiles } from "../actions/userActions";
import { setStar, getStar, download } from "../actions/userActions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';



class Shared extends Component { 

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

    var pad = {
      paddingTop : "25px"
    }

    var file_list = this.props.file_list.map((item,key) =>
      {
          return(
              <div key={key} >
                  <label htmlFor="fileName" className="home-file-row" /*onClick={() => this.props.download(this.props.username,item.file_name)}*/>{item.file_name}
                    <img src={star} className="home-row-objects" onClick={() => this.props.setStar(this.props.username,item.file_id)}/>
                  </label>
              </div> 
          )
      }
    );



    return (
          <div>
              <div className="col-lg-12 row home-body">
                
                      <div className="col-lg-2 home-left-panel">
                          <div className="home-left-panel-elements">
                               <img src={logo_small} className="row " onClick={() => this.props.history.push('/Home')}/>
                               <Link to="/Home" className="row" style={pad}>Home</Link>
                               <Link to="/Files" className="row" style={pad}>My Files</Link>
                               <Link to="/Shared" className="row" style={pad}>Shared Files</Link>
                               <Link to="/Files" className="row" style={pad}>Activity Log</Link>
                               <Link to="/Files" className="row" style={pad}>Profile</Link>
                              
                          </div>  
                      </div>
                     
                      <div className="col-lg-8 home-content">
                        
                          <div>
                              <h4>Shared Files</h4>
                              
                          </div> 

                          <div>

                                                           
                              <div className="home-gap">
                                <label></label>
                              </div>
                              
                              <h6 className="home-file-row">All Shared Files</h6>
                              <div>
                                
                              </div> 

                          </div>    
                      </div>
                      
                      
                      <div className="col-lg-2 home-right-panel">

                            <div>
                                  <div className="dropdown">
                                      <a href="#" className="dropdown-toggle smiley-icon" data-toggle="dropdown" role="button"><img src={smiley}/></a>
                                        <ul className="dropdown-menu smiley-btn">
                                            <li className="smiley-content"><a href="#">Edit Profile</a></li>
                                            <li className="smiley-content"><a href="#" onClick={() => this.props.logout()}>Sign Out</a></li>
                                        </ul>
                                  </div>

                            </div>
                            
                              
                            <div>
                                 <label htmlFor="upload" className="btn btn-primary col-md-12 upload-btn">Upload files</label>
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
        setStar: (username,file_id) => dispatch(setStar(username,file_id)),
        getStar: (username) => dispatch(getStar(username)),
        download: (username,file_name) => dispatch(download(username,file_name))
        
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

export default connect(mapStateToProps,mapDispatchToProps)(Shared);