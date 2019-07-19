import React, { Component } from 'react';
import '../App.css';
import ListFiles from '../components/listFilesGoogle.jsx';
import {
  getFilesGoogle,
  deleteFilesGoogle,
  uploadFilesGoogle,
  downloadFilesGoogle,
  saveToken,
  getAccessToken
} from '../actions/actions';
import store from '../redux/store';
import { connect } from 'react-redux';

class Google extends Component {
  
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

  uploadFile() {
    const general = store.getState();
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const token = general.tokenReducer.token.access_token;
    const data = { file, token };
    this.props.uploadFilesGoogle(data);
  }

   componentWillMount() {
    const access_token = this.getTokenFromURL(window.location.hash).token;
    const refresh_token = this.getTokenFromURL(window.location.hash).refreshToken;
    const token = { access_token, refresh_token };
    console.log(token)
    this.props.saveToken(token);
  }

  componentDidMount() {
    const general = store.getState();
    console.log(general.tokenReducer.token.access_token)
    this.props.getFilesGoogle(general.tokenReducer.token.access_token);
  }

  render() {
    //console.log(this.props.tokens);
    const files = this.props.files;
    return (
      <div className="App">
        <h2>Files</h2>
        <div>
          {files.map(file => (
            <ListFiles
              key={file.id}
              {...file}
              token={this.props.tokens.access_token}
              delete={this.props.deleteFilesGoogle}
              download={this.props.downloadFilesGoogle}
            />
          ))}
        </div>
        <div>
          <h2>Subir archivo</h2>
          <form onSubmit={this.uploadFile.bind(this)}>
            <input type="file" id="file-upload" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    files: state.filesReducer.files,
    tokens: state.tokenReducer.token
  }),
  {
    getFilesGoogle,
    deleteFilesGoogle,
    uploadFilesGoogle,
    downloadFilesGoogle,
    saveToken,
    getAccessToken
  },
)(Google);
