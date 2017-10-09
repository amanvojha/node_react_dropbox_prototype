import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './App';
import SignUp from './routes/SignUp';
import Home from './routes/Home';
import Files from './routes/Files';
import Shared from './routes/Shared';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux"
import store from "./reducer/reducer"
import {BrowserRouter , Route, Switch } from 'react-router-dom';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { setUsername, setHome } from "./actions/userActions";

const Pages = () => (

	<Switch>
		<Route path="/" exact component={SignIn} />
		<Route path="/SignUp" exact component={SignUp} />
		<Route path="/Home" exact component={Home} />
		<Route path="/Files" exact component={Files} />
		<Route path="/Shared" exact component={Shared} />
		<Route path="/Files" exact component={Files} />
		<Route path="/Files" exact component={Files} />
	</Switch>
);

if(localStorage.jwtToken){
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(setHome(jwt.decode(localStorage.jwtToken).username,true));	
}

ReactDOM.render(
            <Provider store={store}>
            	<BrowserRouter>
            		<Pages />
            	</BrowserRouter>
            </Provider>
            , document.getElementById('root'));
registerServiceWorker();