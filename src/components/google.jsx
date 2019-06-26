import React, { Component } from 'react';
import '../App.css';
import ListFiles from '../components/listFiles.jsx';
import {
  getFilesGoogle,
  deleteFilesGoogle,
  uploadFilesGoogle,
  downloadFilesGoogle,
} from '../actions/actions';
import { connect } from 'react-redux';

class Google extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
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

  uploadFile() {
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const token = this.state.token;
    const data = { file, token };
    this.props.uploadFilesGoogle(data);
  }

  componentWillMount() {
    var query = this.getTokenFromURL(window.location.hash).token;
    this.setState({
      token: query,
    });
  }

  componentDidMount() {
    this.props.getFilesGoogle(this.state.token);
  }

  render() {
    const files = this.props.files;

    return (
      <div>
        <div>
          {files.map(file => (
            <ListFiles
              key={file.id}
              {...file}
              token={this.state.token}
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
    files: state.google.files,
  }),
  {
    getFilesGoogle,
    deleteFilesGoogle,
    uploadFilesGoogle,
    downloadFilesGoogle,
  },
)(Google);
