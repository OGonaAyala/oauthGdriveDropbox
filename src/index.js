import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Google from './components/google.jsx';
import Dropbox from './components/dropbox.jsx';
import Success from './components/oauthSuccess';
import App from './App.js';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/googleSucces" component={Success} />
        <Route path="/dropboxSucces" component={Success} />
        <Route path="/google" component={Google} />
        <Route path="/dropbox" component={Dropbox} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();
