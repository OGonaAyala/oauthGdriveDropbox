import {
  GET_FILES,
  SAVE_TOKEN,
  UPLOAD_FILE,
  DELETE_FILES,
  SHARE_LINK,
} from '../constants/constants';
import {
  dropboxDelete,
  dropboxDownload,
  shareDropbox,
  SaveAccessToken,
  GetToken,
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
const shareLink = link => ({
  type: SHARE_LINK,
  payload: {
    id: link.id,
    link: link.link,
  },
});

export const saveToken = token => {
  return dispatch => {
    SaveAccessToken(token);
  };
};

export const getAccessTokenDropbox = id => {
  return dispatch => {
    GetToken(id)
      .then(res => {
        console.log(res.status);
        if (res.status !== 200) {
          GetToken(id)
            .then(res => {
              console.log(res.status);
              return res;
            })
            .then(response => {
              return response.json();
            })
            .then(res => {
              dispatch(save(res));
              return res;
            })
            .then(response => {
              var dbx = new Dropbox({ accessToken: response.access_token });
              dbx
                .filesListFolder({ path: '/Imagenes' })
                .then(res => {
                  dispatch(getFiles(res.entries));
                })
                .catch(res => {
                  console.log(res);
                });
            })

            .catch(res => {});
        } else {
          return res;
        }
      })
      .then(response => {
        return response.json();
      })
      .then(res => {
        dispatch(save(res));
        return res;
      })
      .then(response => {
        var dbx = new Dropbox({ accessToken: response.access_token });
        dbx
          .filesListFolder({ path: '/Imagenes' })
          .then(res => {
            dispatch(getFiles(res.entries));
          })
          .catch(res => {
            console.log(res);
          });
      })
      .catch(res => {});
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

export const shareLinkDropbox = params => {
  return dispatch => {
    shareDropbox(params)
      .then(function(response) {
        if (response.error === undefined) {
          console.log(response.url);
          return response.url;
        } else {
          console.log(response.error.shared_link_already_exists.metadata.url);
          return response.error.shared_link_already_exists.metadata.url;
        }
      })
      .then(res => {
        const id = params.id;
        const link = res;
        const data = { id, link };
        dispatch(shareLink(data));
      })
      .catch(res => {
        console.log(res);
      });
  };
};
