import React, { Component } from 'react';
import '../App.css';
import ListFiles from '../components/listFiles.jsx';
import {
  getFilesGoogle,
  deleteFilesGoogle,
  uploadFilesGoogle,
  downloadFilesGoogle,
  saveToken,
  getNewToken,
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

  newAccessToken() {
      const general = store.getState();
      const refresh_token = general.tokenReducer.token.refresh_token;
      this.props.getNewToken(refresh_token);
  }

  componentWillMount(){
    const id = this.getTokenFromURL(window.location.hash).id_cliente;
    console.log(id);
    this.props.getAccessToken(id);
    
  }

  componentDidMount() {
    const general = store.getState();
    //this.props.getFilesGoogle(general.tokenReducer.token.access_token);
  }

  render() {
    console.log(this.props.tokens.access_token);
    const files = this.props.files;
    return (
      <div className="App">
        <h2>Files</h2>
        <div>
         
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
            onClick={this.newAccessToken.bind(this)}
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
    getNewToken,
    getAccessToken
  },
)(Google);










_----------------------------------------------------

import {
  GET_FILES,
  SAVE_TOKEN,
  UPLOAD_FILE,
  DELETE_FILES,
} from '../constants/constants';
import {
  googleSaveToken,
  googleGetToken,
  googleGet,
  googleDelete,
  googleUpload,
  googleDownload,
  googleNewToken,
  dropboxDelete,
  dropboxDownload,
} from '../libs/api';

const Dropbox = require('dropbox').Dropbox;
const getFiles = files => ({ type: GET_FILES, payload: files });
const uploadFiles = files => ({ type: UPLOAD_FILE, payload: files });
const deleteFiles = file => ({
  type: DELETE_FILES,
  payload: {
    id: file.id,
  },
});
const save = token => ({
  type: SAVE_TOKEN,
  payload: {
    access_token: token.access_token,
    refresh_token: token.refresh_token,
  },
});

export const saveToken = token => {
  return dispatch => {
    googleSaveToken(token)
     .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
      })
      .catch(function(error) {
        console.error(error);
      });
  };
};

export const getAccessToken = (id) => {
  return dispatch => {
    googleGetToken(id)
       .then(function(response) {
        return response;
      })
       .then(res => {
        console.log(res);
        //dispatch(save(token));
      })
      .catch(function(error) {
        console.error(error);
      });
  };
};

export const getNewToken = refreshToken => {
  return dispatch => {
    googleNewToken(refreshToken)
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse;
      })
      .then(res => {
        const access_token = res.access_token;
        const token = { access_token, refreshToken };
        dispatch(save(token));
      })
      .catch(function(error) {
        console.error(error);
      });
  };
};

export const getFilesGoogle = token => {
  return dispatch => {
    googleGet(token)
      .then(res => {
        dispatch(getFiles(res.files));
      })
      .catch(res => {});
  };
};

export const deleteFilesGoogle = id => {
  return dispatch => {
    googleDelete(id)
      .then(function(response) {
        console.log(response);
      })
      .then(res => {
        dispatch(deleteFiles(id));
      })
      .catch(res => {
        console.log(res);
      });
  };
};

export const uploadFilesGoogle = content => {
  return dispatch => {
    googleUpload(content)
      .then(function(response) {
        console.log(response);
        return response;
      })
      .then(res => {
        dispatch(uploadFiles(res));
      })
      .catch(res => {
        console.log(res);
      });
  };
};

export const downloadFilesGoogle = id => {
  return dispatch => {
    googleDownload(id)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${id.id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        console.log(link);
      })
      .catch(res => {
        console.log(res);
      });
  };
};

export const getFilesDropbox = token => {
  return dispatch => {
    var dbx = new Dropbox({ accessToken: token });
    dbx
      .filesListFolder({ path: '/Imagenes' })
      .then(res => {
        dispatch(getFiles(res.entries));
      })
      .catch(res => {
        console.log(res);
      });
  };
};

export const deleteFilesDropbox = id => {
  return dispatch => {
    dropboxDelete(id)
      .then(function(response) {
        console.log(response);
      })
      .then(res => {
        dispatch(deleteFiles(id));
      })

      .catch(res => {
        console.log(res);
      });
  };
};

export const downloadFilesDropbox = id => {
  return dispatch => {
    dropboxDownload(id)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', id.name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        console.log(link);
      })
      .catch(res => {
        console.log(res);
      });
  };
};

export const uploadFileDropbox = data => {
  return dispatch => {
    const dbx = new Dropbox({ accessToken: data.token });
    dbx
      .filesUpload({ path: '/Imagenes/' + data.file.name, contents: data.file })
      .then(function(response) {
        return response;
      })
      .then(res => {
        dispatch(uploadFiles(res));
      })
      .catch(res => {
        console.log(res);
      });
  };
};
