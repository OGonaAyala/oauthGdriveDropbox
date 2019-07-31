import {
  GET_FILES,
  SAVE_TOKEN,
  UPLOAD_FILE,
  DELETE_FILES,
  SHARE_LINK,
} from '../constants/constants';
import { dropboxDelete, shareDropbox, GetToken } from '../libs/api';

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

export const getAccessTokenDropbox = id => dispatch =>
  GetToken(id)
    .then(res => {
      if (res.status !== 200) {
        GetToken(id)
          .then(response => response)
          .then(response => response.json())
          .then(response => {
            dispatch(save(response));
            return response;
          })
          .then(response => {
            const dbx = new Dropbox({ accessToken: response.access_token });
            dbx
              .filesListFolder({ path: '/Imagenes' })
              .then(result => {
                dispatch(getFiles(result.entries));
              })
              .catch(result => {
                console.log(result);
              });
          })
          .catch(response => {
            console.log(response);
          });
      }
      return res;
    })
    .then(res => res.json())
    .then(res => {
      dispatch(save(res));
      return res;
    })
    .then(res => {
      const dbx = new Dropbox({ accessToken: res.access_token });
      dbx
        .filesListFolder({ path: '/Imagenes' })
        .then(response => {
          dispatch(getFiles(response.entries));
        })
        .catch(response => {
          console.log(response);
        });
    })
    .catch(res => {
      console.log(res);
    });

export const getFilesDropbox = token => dispatch => {
  const dbx = new Dropbox({ accessToken: token });
  dbx
    .filesListFolder({ path: '/Imagenes' })
    .then(res => {
      dispatch(getFiles(res.entries));
    })
    .catch(res => {
      console.log(res);
    });
};

export const deleteFilesDropbox = content => dispatch =>
  dropboxDelete(content)
    .then(response => response)
    .then(res => res.json())
    .then(res => {
      const id = res.metadata;
      dispatch(deleteFiles(id));
    })
    .catch(res => {
      console.log(res);
    });

export const uploadFileDropbox = data => dispatch => {
  const dbx = new Dropbox({ accessToken: data.token });
  const path = `/Imagenes/${data.file.name}`;
  dbx
    .filesUpload({ path, contents: data.file })
    .then(response => response)
    .then(res => {
      dispatch(uploadFiles(res));
    })
    .catch(res => {
      console.log(res);
    });
};

export const shareLinkDropbox = params => dispatch =>
  shareDropbox(params)
    .then(response => {
      if (!response.error) {
        return response.url;
      }
      return response.error.shared_link_already_exists.metadata.url;
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
