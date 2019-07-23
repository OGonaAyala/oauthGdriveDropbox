import React, { Component } from 'react';
import '../App.css';
import ListFiles from '../components/listFiles.jsx';
import { connect } from 'react-redux';
import {
  getFilesDropbox,
  deleteFilesDropbox,
  downloadFilesDropbox,
  uploadFileDropbox,
  shareLinkDropbox,
  getAccessTokenDropbox,
} from '../actions/actions';
import store from '../redux/store';

class Dropbox extends Component {
 
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
    const client_id = this.getTokenFromURL(window.location.hash).id_cliente;
    this.props.getAccessTokenDropbox(client_id);
  }

  uploadFile() {
    const general = store.getState();
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const token = general.tokenReducer.token.access_token;
    const data = { file, token };
    this.props.uploadFileDropbox(data);
  }

  render() {
    const files = this.props.files;
    return (
      <div className="App">
        <h2>Files</h2>
        <div>
          {files.map(file => (
            <ListFiles
              key={file.id}
              token={this.props.tokens.access_token}
              {...file}
              delete={this.props.deleteFilesDropbox}
              download={this.props.downloadFilesDropbox}
              share={this.props.shareLinkDropbox}
              url={window.location.pathname}
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
    tokens: state.tokenReducer.token,
  }),
  {
    getFilesDropbox,
    deleteFilesDropbox,
    downloadFilesDropbox,
    uploadFileDropbox,
    shareLinkDropbox,
    getAccessTokenDropbox,
  },
)(Dropbox);
