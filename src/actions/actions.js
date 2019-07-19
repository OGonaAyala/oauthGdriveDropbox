import {
  GET_FILES,
  SAVE_TOKEN,
  UPLOAD_FILE,
  DELETE_FILES,
  SHARE_LINK,
} from '../constants/constants';
import {
  googleGet,
  googleDelete,
  googleUpload,
  googleDownload,
  googleNewToken,
  dropboxDelete,
  dropboxDownload,
  shareDropbox,
  shareGoogle,
  googleSaveToken,
  googleGetToken,
  googleUpdateToken,
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
    googleSaveToken(token);
  };
};

export const getNewToken = token => {
  return dispatch => {
    googleNewToken(token.refresh_token)
      .then(res => {
        return res;
      })
      .then(res => {
        console.log(res);
        const access_token = res.access_token;
        const _id = token.id;
        const refresh_token = token.refresh_token;
        const params = { access_token, _id, refresh_token };
        googleUpdateToken(params)
          .then(res => {
            console.log(res);
          })
          .catch(function(error) {
            console.error(error);
          });
      })
      .catch(function(error) {
        console.error(error);
      });
  };
};

export const getAccessToken = id => {
  return dispatch => {
    googleGetToken(id)
      .then(res => {
        console.log(res.status);
        if (res.status !== 200) {
          googleGetToken(id)
            .then(res => {
              console.log(res.status);
              return res;
            })
            .then(response => {
              return response.json();
            })
            .then(res => {
              dispatch(save(res));
              return res.access_token;
            })
            .then(res => {
              googleGet(res)
                .then(res => {
                  console.log(res.status);
                  return res;
                })
                .then(response => {
                  return response.json();
                })
                .then(res => {
                  dispatch(getFiles(res.files));
                })
                .catch(res => {});
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
        googleGet(response.access_token)
          .then(res => {
            console.log(res.status);
            if (res.status === 401) {
              googleNewToken(response.refresh_token)
                .then(res => {
                  return res;
                })
                .then(res => {
                  const access_token = res.access_token;
                  const refresh_token = response.refresh_token;
                  const _id = id;
                  const token = { _id, access_token, refresh_token };
                  googleUpdateToken(token)
                    .then(res => {
                      console.log(res);
                      alert('Hubo un error de token, recarga la pagina');
                    })
                    .catch(function(error) {
                      console.error(error);
                    });
                })
                .catch(function(error) {
                  console.error(error);
                });
            } else {
              return res;
            }
          })
          .then(response => {
            return response.json();
          })
          .then(res => {
            dispatch(getFiles(res.files));
          })
          .catch(res => {});
      })
      .catch(res => {});
  };
};

export const deleteFilesGoogle = id => {
  console.log(id);
  return dispatch => {
    googleDelete(id)
      .then(function(response) {
        if (response.status === 401) {
          googleNewToken(id.refresh_token)
            .then(res => {
              return res;
            })
            .then(res => {
              const access_token = res.access_token;
              const refresh_token = id.refresh_token;
              const _id = id.idclient;
              const token = { _id, access_token, refresh_token };
              googleUpdateToken(token)
                .then(res => {
                  console.log(res);
                  alert(
                    'Hubo un error de token, recarga la pagina e inentalo de nuevo',
                  );
                })
                .catch(function(error) {
                  console.error(error);
                });
            })
            .catch(function(error) {
              console.error(error);
            });
        } else {
          return response;
        }
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
    console.log(content.refresh_token);
    googleUpload(content)
      .then(function(response) {
        console.log(response.status);
        if (response.status !== 200) {
          googleNewToken(content.refresh_token)
            .then(res => {
              console.log(res);
              return res;
            })
            .then(res => {
              const access_token = res.access_token;
              const refresh_token = content.refresh_token;
              const _id = content._id;
              const token = { _id, access_token, refresh_token };
              console.log(token);
              googleUpdateToken(token)
                .then(res => {
                  console.log(res);
                  alert(
                    'Hubo un error de token, recarga la pagina e intentalo de nuevo',
                  );
                })
                .catch(function(error) {
                  console.error(error);
                });
            })
            .catch(function(error) {
              console.error(error);
            });
        } else {
          return response;
        }
      })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        dispatch(uploadFiles(res));
      })
      .catch(res => {
        console.log(res);
      });
  };
};

export const downloadFilesGoogle = id => {
  console.log(id);
  return dispatch => {
    googleDownload(id)
      .then(response => {
        if (response.status === 401) {
          googleNewToken(id.refresh_token)
            .then(res => {
              console.log(res);
              return res;
            })
            .then(res => {
              const access_token = res.access_token;
              const refresh_token = id.refresh_token;
              const _id = id.idclient;
              const token = { _id, access_token, refresh_token };
              console.log(token);
              googleUpdateToken(token)
                .then(res => {
                  console.log(res);
                  alert(
                    'Hubo un error de token, recarga la pagina e intentalo de nuevo',
                  );
                })
                .catch(function(error) {
                  console.error(error);
                });
            })
            .catch(function(error) {
              console.error(error);
            });
        } else {
          return response;
        }
      })
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

export const getAccessTokenDropbox = id => {
  return dispatch => {
    googleGetToken(id)
      .then(res => {
        console.log(res.status);
        if (res.status !== 200) {
          googleGetToken(id)
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

export const shareFileGoogle = params => {
  return dispatch => {
    shareGoogle(params)
      .then(function(response) {
        if (response.status === 401) {
          googleNewToken(params.refresh_token)
            .then(res => {
              console.log(res);
              return res;
            })
            .then(res => {
              const access_token = res.access_token;
              const refresh_token = params.refresh_token;
              const _id = params.idclient;
              const token = { _id, access_token, refresh_token };
              console.log(token);
              googleUpdateToken(token)
                .then(res => {
                  console.log(res);
                  alert(
                    'Hubo un error de token, recarga la pagina e intentalo de nuevo',
                  );
                })
                .catch(function(error) {
                  console.error(error);
                });
            })
            .catch(function(error) {
              console.error(error);
            });
        } else {
          return alert('Se compartio correctamente');
        }
      })
      .catch(res => {
        console.log(res);
      });
  };
};
