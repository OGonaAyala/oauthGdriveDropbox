import React, { Component } from 'react';
import '../App.css';
import ListFiles from '../components/listFiles.jsx';
import {
  getFilesGoogle,
  deleteFilesGoogle,
  uploadFilesGoogle,
  downloadFilesGoogle,
  saveToken,
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

  handleGetNew() {
    const general = store.getState();
    const refresh_token = general.tokenReducer.token.refresh_token;
    const client_id =
      '1011461723910-5l7nmlhno2me1ahd5jksfc4ti96n35ua.apps.googleusercontent.com';
    const client_secret = 'B88yPjs8m-sQeiapqnK-fWDz';
    const data = `client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}&grant_type=refresh_token`;

    fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
    })
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.access_token;
      })
      .then(files => {
        const access_token = files;
        const token = {access_token, refresh_token};
        this.props.saveToken(token);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  componentWillMount(){
    const access_token = this.getTokenFromURL(window.location.hash).token;
    const refresh_token = this.getTokenFromURL(window.location.hash).refreshToken;
    const token = {access_token, refresh_token};
    this.props.saveToken(token);
  }

  componentDidMount() {
    const general = store.getState();
    this.props.getFilesGoogle(general.tokenReducer.token.access_token);
  }

  render() {
    console.log(this.props.tokens.access_token)
    const files = this.props.files;
    return (
      <div>
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
        <div>
          <button
            className="btn btn-danger"
            onClick={this.handleGetNew.bind(this)}
          >
            Nuevo access_token
          </button>
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
    getFilesGoogle,
    deleteFilesGoogle,
    uploadFilesGoogle,
    downloadFilesGoogle,
    saveToken,
  },
)(Google);
