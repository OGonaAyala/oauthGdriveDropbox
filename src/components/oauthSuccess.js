import React, { Component } from 'react';
import { saveToken } from '../actions/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Success extends Component {
  constructor() {
    super();
    this.state = {
      readyToRedirect: false,
      key: '',
    };
  }

  getTokenFromURL(str) {
    var ret = Object.create(null);
    if (typeof str !== 'string') {
      return ret;
    }
    str = str.trim().replace(/^(\?|#|&)/, '');
    if (!str) {
      return ret;
    }
    str.split('&').forEach(function(param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts.shift();
      var val = parts.length > 0 ? parts.join('=') : undefined;
      key = decodeURIComponent(key);
      val = val === undefined ? null : decodeURIComponent(val);
      if (ret[key] === undefined) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
    });
    return ret;
  }

  componentWillMount() {
    const _id = Math.floor(Math.random() * 10000);

    if (window.location.pathname === '/dropboxSucces') {
      const access_token = this.getTokenFromURL(window.location.hash)
        .access_token;
      const tokenDropbox = { _id, access_token };
      this.props.saveToken(tokenDropbox);
      this.setState({
        key: _id,
        readyToRedirect: true,
        pathName: window.location.pathname,
      });
    } else {
      const access_token = this.getTokenFromURL(window.location.hash).token;
      const refresh_token = this.getTokenFromURL(window.location.hash)
        .refreshToken;
      const token = { _id, access_token, refresh_token };
      this.props.saveToken(token);
      this.setState({
        key: _id,
        readyToRedirect: true,
        pathName: window.location.pathname,
      });
    }
    this.props.history.push('/oauthSucces');
  }

  render() {
    if (
      this.state.readyToRedirect === true &&
      this.state.pathName === '/dropboxSucces'
    ) {
      const url = `/dropbox#id_cliente=${this.state.key}`;
      return <Redirect to={url} />;
    } else {
      const url = `/pruebas#id_cliente=${this.state.key}`;
      return <Redirect to={url} />;
    }
  }
}

export default connect(
  null,
  {
    saveToken,
  },
)(Success);
