import React, { Component } from 'react';
import '../App.css';
import ListFiles from '../components/listFilesGoogle.jsx';
import {
  getAccessToken,
  deleteFilesGoogle,
  uploadFilesGoogle,
  downloadFilesGoogle,
  getNewToken
} from '../actions/actions';
import store from '../redux/store';
import { connect } from 'react-redux';
import {
  Button,
} from 'reactstrap';

class Google extends Component {
  
   constructor(props) {
    super(props);
     this.state = {
      id: ''
    };
    //this.newToken = this.newToken.bind(this);
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

   uploadFile() {
    const general = store.getState();
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const token = general.tokenReducer.token.access_token;
    const refresh_token = general.tokenReducer.token.refresh_token;
    const _id = this.state.id;
    const data = { file, token, _id, refresh_token };
    this.props.uploadFilesGoogle(data);
  }

  componentWillMount() {
    const client_id = this.getTokenFromURL(window.location.hash).id_cliente;
    this.props.getAccessToken(client_id);
     this.setState(prevState => ({
      id: client_id
    }));
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
              {...file}
              token={this.props.tokens.access_token}
              idclient={this.state.id}
              refresh_token = {this.props.tokens.refresh_token}
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
    tokens: state.tokenReducer.token,
  }),
  {
    getAccessToken,
    deleteFilesGoogle,
    uploadFilesGoogle,
    downloadFilesGoogle,
    getNewToken
  }
)(Google);
