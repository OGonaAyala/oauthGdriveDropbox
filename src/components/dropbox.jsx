import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import ListFiles from '../components/listFiles';
import {
  getFilesDropbox,
  deleteFilesDropbox,
  uploadFileDropbox,
  shareLinkDropbox,
  getAccessTokenDropbox,
} from '../actions/actionsDropbox';
import { getTokenFromURL } from '../libs/api';
import store from '../redux/store';

class Dropbox extends Component {
  constructor() {
    super();
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentWillMount() {
    const client_id = getTokenFromURL(window.location.hash).id_cliente;
    this.props.getAccessTokenDropbox(client_id);
  }

  uploadFile() {
    const general = store.getState();
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const token = general.tokenReducer.token.access_token;
    const data = { file, token };
    if (data.file) {
      this.props.uploadFileDropbox(data);
    }
    return false;
  }

  render() {
    const files = this.props.files;
    return (
      <div className="App">
        <h2>Archivos</h2>
        <div>
          {files.map(file => (
            <ListFiles
              key={file.id}
              token={this.props.tokens.access_token}
              {...file}
              delete={this.props.deleteFilesDropbox}
              share={this.props.shareLinkDropbox}
              url={window.location.pathname}
            />
          ))}
        </div>
        <div>
          <h2>Subir archivo</h2>
          <form onSubmit={this.uploadFile}>
            <input type="file" id="file-upload" />
            <button type="submit">Subir</button>
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
    uploadFileDropbox,
    shareLinkDropbox,
    getAccessTokenDropbox,
  },
)(Dropbox);
