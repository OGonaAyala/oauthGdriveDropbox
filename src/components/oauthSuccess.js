import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { SaveAccessToken, getTokenFromURL } from '../libs/api';

class Success extends Component {
  constructor() {
    super();
    this.state = {
      readyToRedirect: false,
      key: '',
    };
  }

  componentWillMount() {
    const _id = Math.floor(Math.random() * 10000);

    if (window.location.pathname === '/dropboxSucces') {
      const access_token = getTokenFromURL(window.location.hash).access_token;
      const tokenDropbox = { _id, access_token };
      SaveAccessToken(tokenDropbox);
      this.setState({
        key: _id,
        readyToRedirect: true,
        pathName: window.location.pathname,
      });
    } else {
      const access_token = getTokenFromURL(window.location.hash).token;
      const refresh_token = getTokenFromURL(window.location.hash).refreshToken;
      const token = { _id, access_token, refresh_token };
      SaveAccessToken(token);
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
    }
    const url = `/google?#id_cliente=${this.state.key}`;
    return <Redirect to={url} />;
  }
}

export default Success;
