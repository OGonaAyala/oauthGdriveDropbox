import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Google from './components/google';
import Dropbox from './components/dropbox';
import Success from './components/oauthSuccess';
import App from './App';
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
