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

class Google2 extends Component {
  
  constructor(props) {
    super(props);
  }


  uploadFile() {
    const general = store.getState();
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const token = general.tokenReducer.token.access_token;
    const data = { file, token };
    this.props.uploadFilesGoogle(data);
  }

 
   

  render() {
    //console.log(this.props.tokens);
    //console.log(this.props.access_token)
    const files = this.props.files;
    return (
      <div className="App">
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
)(Google2);
