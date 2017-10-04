import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './App';
import SignUp from './routes/SignUp';
import Home from './routes/Home';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux"
import store from "./reducer/reducer"
import {BrowserRouter , Route, Switch } from 'react-router-dom';
import setAuthorizationToken from './utils/setAuthorizationToken';

const Pages = () => (

	<Switch>
		<Route path="/" exact component={SignIn} />
		<Route path="/SignUp" exact component={SignUp} />
		<Route path="/Home" exact component={Home} />
	</Switch>
);

setAuthorizationToken(localStorage.jwtToken);

ReactDOM.render(
            <Provider store={store}>
            	<BrowserRouter>
            		<Pages />
            	</BrowserRouter>
            </Provider>
            , document.getElementById('root'));
registerServiceWorker();