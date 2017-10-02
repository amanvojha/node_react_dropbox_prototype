import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux"
import store from "./reducer/reducer"

ReactDOM.render(
            <Provider store={store}>
            	<SignIn />
            </Provider>
            , document.getElementById('root'));
registerServiceWorker();