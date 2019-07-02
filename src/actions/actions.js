import {
  GET_FILES,
  SAVE_TOKEN,
  UPLOAD_FILE,
  DELETE_FILES,
} from '../constants/constants';
import {
  googleGet,
  googleDelete,
  googleUpload,
  googleDownload,
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
    dispatch(save(token));
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
