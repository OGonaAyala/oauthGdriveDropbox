import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Google from "./oauthSuccess/google"
//import Dropbox from "./oauthSucces/dropbox"
import App from "./App.js";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store = { store }>
   <BrowserRouter>
    <Switch>
     <Route path="/" component={App} exact/>
     <Route path="/googleSucces" component={Google}/>
    </Switch>
   </BrowserRouter>
  </Provider>,
 document.getElementById("root")
);
serviceWorker.unregister();
