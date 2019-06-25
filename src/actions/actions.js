import { GET_FILES } from '../constants/constants';
import { googleGet, googleDelete, googleUpload, googleDownload } from '../libs/api';

const getFiles = (files) => ({type: GET_FILES, payload: files});

export const getFilesGoogle = (token) => {
  return (dispatch) => {
    googleGet(token)
      .then(res => {
        dispatch(getFiles(res.files));
      })
      .catch(res => {
      })
  }
};

export const deleteFilesGoogle = (id) => {
    return (dispatch) => {
        googleDelete(id)
          .then(function(response) {
      console.log(response);
            })
            .catch(res => {
                console.log(res);
            })
    }
};

export const uploadFilesGoogle = (content) => {
    return (dispatch) => {
        googleUpload(content)
           .then(function(response) {
      console.log(response);
            })
            .catch(res => {
                console.log(res);
            })
    }
};

export const downloadFilesGoogle = (id) =>{
  return (dispatch) => {
    googleDownload(id)
      .then((response) => response.blob())
      .then((blob) => {
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
      })
  }
};