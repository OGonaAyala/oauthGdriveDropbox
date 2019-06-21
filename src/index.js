import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Google from "./oauthSuccess/google"
//import Dropbox from "./oauthSucces/dropbox"
import App from "./App.js";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
   <BrowserRouter>
    <Switch>
     <Route path="/" component={App} exact/>
     <Route path="/googleSucces" component={Google}/>
   
    </Switch>
   </BrowserRouter>,
 document.getElementById("root")
);
serviceWorker.unregister();
