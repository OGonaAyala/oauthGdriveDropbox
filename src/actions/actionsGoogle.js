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
  googleNewToken,
  shareGoogle,
  GetToken,
  googleUpdateToken,
} from '../libs/api';

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

let _id, token, access_token, param, refresh_token, id;

export const getAccessToken = content => dispatch =>
  GetToken(content)
    .then(res => {
      if (res.status !== 200) {
        GetToken(content)
          .then(res1 => {
            console.log(res1.status);
            return res1;
          })
          .then(res1 => res1.json())
          .then(res1 => {
            dispatch(save(res1));
            return res1;
          })
          .then(response => {
            googleGet(response.access_token)
              .then(res1 => res1)
              .then(res1 => res1.json())
              .then(res1 => {
                dispatch(getFiles(res1.files));
              })
              .catch(res1 => {
                console.log(res1);
              });
          })
          .catch(response => {
            console.log(response);
          });
      } else {
        return res;
      }
      return false;
    })
    .then(response1 => response1.json())
    .then(response1 => {
      dispatch(save(response1));
      return response1;
    })
    .then(response1 => {
      googleGet(response1.access_token)
        .then(res => {
          if (res.status === 401) {
            googleNewToken(response1.refresh_token)
              .then(res1 => res1)
              .then(res1 => {
                access_token = res1.access_token;
                refresh_token = response1.refresh_token;
                _id = content;
                token = { _id, access_token, refresh_token };
                googleUpdateToken(token)
                  .then(() => {
                    param = { access_token, refresh_token };
                    dispatch(save(param));
                  })
                  .then(() => {
                    googleGet(access_token)
                      .then(res3 => {
                        console.log(res3.status);
                        return res3;
                      })
                      .then(res3 => res3.json())
                      .then(res3 => {
                        dispatch(getFiles(res3.files));
                      })
                      .catch(res3 => {
                        console.log(res3);
                      });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
              .catch(res1 => {
                console.log(res1);
              });
          } else {
            return res;
          }
          return false;
        })
        .then(res => res.json())
        .then(res => {
          dispatch(getFiles(res.files));
        })
        .catch(res => {
          console.log(res);
        });
    })
    .catch(res => {
      console.log(res);
    });

export const deleteFilesGoogle = content => dispatch =>
  googleDelete(content)
    .then(response => {
      if (response.status === 401) {
        googleNewToken(content.refresh_token)
          .then(res1 => res1)
          .then(res1 => {
            access_token = res1.access_token;
            refresh_token = content.refresh_token;
            _id = content.idclient;
            token = { _id, access_token, refresh_token };
            googleUpdateToken(token)
              .then(() => {
                param = { access_token, refresh_token };
                dispatch(save(param));
              })
              .then(() => {
                id = content.id;
                token = access_token;
                param = { token, id };
                googleDelete(param)
                  .then(res3 => res3)
                  .then(res3 => res3.json())
                  .then(() => {
                    dispatch(deleteFiles(content));
                  })
                  .catch(res3 => {
                    console.log(res3);
                  });
              })
              .catch(error => {
                console.error(error);
              });
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        return response;
      }
      return false;
    })
    .then(() => {
      dispatch(deleteFiles(content));
    })
    .catch(res => {
      console.log(res);
    });

export const uploadFilesGoogle = content => dispatch =>
  googleUpload(content)
    .then(response => {
      console.log(response.status);
      if (response.status !== 200) {
        googleNewToken(content.refresh_token)
          .then(res => res)
          .then(res => {
            access_token = res.access_token;
            refresh_token = content.refresh_token;
            _id = content.id;
            token = { _id, access_token, refresh_token };
            googleUpdateToken(token)
              .then(() => {
                param = { access_token, refresh_token };
                dispatch(save(param));
              })
              .then(() => {
                const file = content.file;
                token = access_token;
                param = { token, file };
                googleUpload(param)
                  .then(res2 => {
                    console.log(res2.status);
                    return res2;
                  })
                  .then(res2 => res2.json())
                  .then(res2 => {
                    dispatch(uploadFiles(res2));
                  })
                  .catch(res2 => {
                    console.log(res2);
                  });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        return response;
      }
      return false;
    })
    .then(res => res.json())
    .then(res => {
      dispatch(uploadFiles(res));
    })
    .catch(res => {
      console.log(res);
    });

export const downloadFilesGoogle = content => dispatch =>
  googleDownload(content)
    .then(response => {
      if (response.status === 401) {
        googleNewToken(content.refresh_token)
          .then(res => res)
          .then(res => {
            access_token = res.access_token;
            refresh_token = content.refresh_token;
            _id = content.idclient;
            token = { _id, access_token, refresh_token };
            googleUpdateToken(token)
              .then(() => {
                param = { access_token, refresh_token };
                dispatch(save(param));
              })
              .then(() => {
                id = content.id;
                token = access_token;
                param = { token, id };
                googleDownload(param)
                  .then(res3 => {
                    console.log(res3.status);
                    return res3;
                  })
                  .then(res3 => res3.blob())
                  .then(blob => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${content.id}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                  })
                  .catch(res3 => {
                    console.log(res3);
                  });
              })
              .catch(error => {
                console.error(error);
              });
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        return response;
      }
      return false;
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${content.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(res => {
      console.log(res);
    });

export const shareFileGoogle = params => dispatch => {
  refresh_token = params.refresh_token;
  _id = params.idclient;
  id = params.id;
  const email = params.email;
  shareGoogle(params)
    .then(response => {
      if (response.status === 401) {
        googleNewToken(refresh_token)
          .then(res => res)
          .then(res => {
            access_token = res.access_token;
            token = { _id, access_token, refresh_token };
            googleUpdateToken(token)
              .then(() => {
                param = { access_token, refresh_token };
                dispatch(save(param));
              })
              .then(() => {
                token = access_token;
                param = { token, id, email };
                shareGoogle(param)
                  .then(res3 => {
                    console.log(res3.status);
                    return res3;
                  })
                  .then(res3 => res3.json())
                  .catch(res3 => {
                    console.log(res3);
                  });
              })
              .catch(error => {
                console.error(error);
              });
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        return alert('Se compartio correctamente');
      }
      return false;
    })
    .catch(res => {
      console.error(res);
    });
};
