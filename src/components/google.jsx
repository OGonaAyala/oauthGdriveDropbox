import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import ListFiles from '../components/listFiles';
import {
  getAccessToken,
  deleteFilesGoogle,
  uploadFilesGoogle,
  downloadFilesGoogle,
} from '../actions/actionsGoogle';
import store from '../redux/store';
import { getTokenFromURL } from '../libs/api';

class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: '',
    };
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentWillMount() {
    const client_id = getTokenFromURL(window.location.hash).id_cliente;
    this.props.getAccessToken(client_id);
    this.setState({
      id: client_id,
    });
  }

  uploadFile() {
    const general = store.getState();
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const token = general.tokenReducer.token.access_token;
    const refresh_token = general.tokenReducer.token.refresh_token;
    const id = this.state.id;
    const data = { file, token, id, refresh_token };
    if (data.file) {
      this.props.uploadFilesGoogle(data);
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
              {...file}
              token={this.props.tokens.access_token}
              idclient={this.state.id}
              refresh_token={this.props.tokens.refresh_token}
              delete={this.props.deleteFilesGoogle}
              download={this.props.downloadFilesGoogle}
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
    getAccessToken,
    deleteFilesGoogle,
    uploadFilesGoogle,
    downloadFilesGoogle,
  },
)(Google);
