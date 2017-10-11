import React, { Component } from 'react';
import logo from '../public/dropbox_logo_panel.svg';
import star from '../public/star.png';
import unstar from '../public/unstar.png';
import logo_small from '../public/logo_small.svg';
import smiley from '../public/smiley.png';
import dots from '../public/dots.svg';
import '../App.css';
import { setFirstName, setLastName, setUsername, setPassword, login, signup, logout, uploadHome, setHomeFiles } from "../actions/userActions";
import { setStar,unsetStar, getStar, download, deleteFile } from "../actions/userActions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';




class Home extends Component {

  

  componentWillMount() {

      if(!this.props.isValid){
        console.log('Pushing to the page ')
        this.props.history.push('/');
      }

      //Bringing Uploaded files
      this.props.setHomeFiles(this.props.username);
      this.props.getStar(this.props.username);

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

    var file_list_recent = this.props.file_list_recent.map((item,key) =>
      {
          return(
              <div key={key}>
                  <label htmlFor="fileName" className="home-file-row" /*onClick={() => this.props.download(this.props.username,item.file_name)}*/>{item.file_name}
                    <div className="dropdown home-row-objects">
                                      <a href="#" className="" data-toggle="dropdown" role="button"><img src={dots} className="dots "/></a>
                                        <ul className="dropdown-menu smiley-btn">
                                            <li className="smiley-content" onClick={() => this.props.deleteFile(this.props.username,item.file_id,item.file_name)}>Delete File</li>
                                            <li className="smiley-content" >Download</li>

                                        </ul>
                    </div>

                    <img src={star} className="home-row-objects" onClick={() => this.props.setStar(this.props.username,item.file_id,item.file_name)}/>
                    
                    
                  
                  </label>
                  
              </div> 
          )
      }
    );

    var file_stared = this.props.file_stared.map((item,key) =>
      {
          return(
              <div key={key}>
                  <label htmlFor="fileStared" className="home-file-row">{item.file_name}
                      <img src={unstar} className="home-row-objects" onClick={() => this.props.unsetStar(this.props.username,item.file_id,item.file_name)}/>

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
                               <Link to="/Activity" className="row" style={pad}>Activity Log</Link>
                               <Link to="/Files" className="row" style={pad}>Profile</Link>

                              
                          </div>  
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
                                {file_list_recent}
                              </div> 

                          </div>    
                      </div>
                      
                      
                      <div className="col-lg-2 home-right-panel">

                            <div>
                                  <div className="dropdown">
                                      <a href="#" className=" smiley-icon" data-toggle="dropdown" role="button"><img src={smiley}/></a>
                                        <ul className="dropdown-menu smiley-btn">
                                            <li className="smiley-content"><a href="#">Edit Profile</a></li>
                                            <li className="smiley-content"><a href="#" onClick={() => this.props.logout()}>Sign Out</a></li>

                                        </ul>
                                  </div>

                            </div>
                            
                              
                            <div>
                                 <label htmlFor="upload" className="btn btn-primary col-md-12 upload-btn">Upload files</label>
                                   <input type="file" name="upload" id="upload" style={hide} 
                                          onChange={(e) =>this.props.uploadHome(this.props.username,e.target.files[0])}></input>
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
        uploadHome : (username,file) => dispatch(uploadHome(username,file)),
        setHomeFiles: (username) => dispatch(setHomeFiles(username)),
        setStar: (username,file_id,file_name) => dispatch(setStar(username,file_id,file_name)),
        unsetStar: (username,file_id,file_name) => dispatch(unsetStar(username,file_id,file_name)),
        getStar: (username) => dispatch(getStar(username)),
        download: (username,file_name) => dispatch(download(username,file_name)),
        deleteFile: (username,file_id,file_name) => dispatch(deleteFile(username,file_id,file_name))
        
    };
}

const mapStateToProps = (state) => { 
  return { username: state.reducer.username,
           password: state.reducer.password,
           first_name: state.reducer.first_name,
           last_name: state.reducer.last_name,
           result: state.reducer.result,
           isValid: state.reducer.isValid,
           file_list_recent: state.reducer.file_list_recent,
           file_stared: state.reducer.file_stared
         };
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);

