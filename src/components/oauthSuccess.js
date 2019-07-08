import React, { Component } from 'react';
import Google from './google.jsx';
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
    const access_token = this.getTokenFromURL(window.location.hash).token;
    const refresh_token = this.getTokenFromURL(window.location.hash).refreshToken;
    const _id = Math.floor(Math.random() * 10000);
    const token = { _id, access_token, refresh_token };
    this.props.saveToken(token);
    this.setState({
      readyToRedirect: true,
      key: _id,
    });
  }

  render() {
    console.log(this.state.readyToRedirect);
    const url = `/google#id_cliente=${this.state.key}`;
    if (this.state.readyToRedirect) return <Redirect to={url} />;
  }
}

export default connect(
  state => ({
    tokens: state.tokenReducer.token,
  }),
  {
    saveToken,
  },
)(Success);
