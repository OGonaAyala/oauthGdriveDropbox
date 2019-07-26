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
  SaveAccessToken,
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

export const saveToken = token => {
  return dispatch => {
    SaveAccessToken(token);
  };
};

export const getAccessToken = id => {
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
              googleGet(response.access_token)
                .then(res => {
                  console.log(res);
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
                            console.log('Modifica token en base de datos');
                            console.log(res);
                            const params = { access_token, refresh_token };
                            dispatch(save(params));
                          })
                          .then(res => {
                            googleGet(access_token)
                              .then(res => {
                                console.log(res.status);
                                console.log('Obtiene archivos');
                                return res;
                              })
                              .then(response => {
                                return response.json();
                              })
                              .then(res => {
                                dispatch(getFiles(res.files));
                              })
                              .catch(res => {
                                console.log(res);
                              });
                          })
                          .catch(function(error) {
                            console.error(error);
                          });
                      })
                      .catch(res => {
                        console.log(res);
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
                .catch(res => {
                  console.log(res);
                });
            })
            .catch(res => {
              console.log(res);
            });
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
            console.log(res);
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
                      console.log('Modifica token en base de datos');
                      console.log(res);
                      const params = { access_token, refresh_token };
                      dispatch(save(params));
                    })
                    .then(res => {
                      googleGet(access_token)
                        .then(res => {
                          console.log(res.status);
                          console.log('Obtiene archivos');
                          return res;
                        })
                        .then(response => {
                          return response.json();
                        })
                        .then(res => {
                          dispatch(getFiles(res.files));
                        })
                        .catch(res => {
                          console.log(res);
                        });
                    })
                    .catch(function(error) {
                      console.error(error);
                    });
                })
                .catch(res => {
                  console.log(res);
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
          .catch(res => {
            console.log(res);
          });
      })
      .catch(res => {
        console.log(res);
      });
  };
};

export const deleteFilesGoogle = content => {
  console.log(content);
  return dispatch => {
    googleDelete(content)
      .then(function(response) {
        if (response.status === 401) {
          googleNewToken(content.refresh_token)
            .then(res => {
              console.log('Obtiene un nuevo token');
              console.log(res);
              return res;
            })
            .then(res => {
              const access_token = res.access_token;
              const refresh_token = content.refresh_token;
              const _id = content.idclient;
              const token = { _id, access_token, refresh_token };
              googleUpdateToken(token)
                .then(res => {
                  console.log('Modifica token en base de datos');
                  console.log(res);
                  const params = { access_token, refresh_token };
                  dispatch(save(params));
                })
                .then(res => {
                  const id = content.id;
                  const token = access_token;
                  const param = { token, id };
                  console.log(param);
                  googleDelete(param)
                    .then(res => {
                      console.log(res.status);
                      console.log('Elimina el archivo');
                      return res;
                    })
                    .then(res => {
                      return res.json();
                    })
                    .then(res => {
                      console.log(res);
                      dispatch(deleteFiles(content));
                      console.log('Modifica el estado de redux');
                    })
                    .catch(res => {
                      console.log(res);
                    });
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
        dispatch(deleteFiles(content));
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
              console.log('Obtiene nuevo token');
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
                  console.log('Modifica token en base de datos');
                  console.log(res);
                  const params = { access_token, refresh_token };
                  dispatch(save(params));
                })
                .then(res => {
                  const file = content.file;
                  const token = access_token;
                  const param = { token, file };
                  console.log(param);
                  googleUpload(param)
                    .then(res => {
                      console.log(res.status);
                      console.log('Sube el archivo');
                      return res;
                    })
                    .then(res => {
                      return res.json();
                    })
                    .then(res => {
                      console.log(res);
                      dispatch(uploadFiles(res));
                      console.log('Modifica el estado de redux');
                    })
                    .catch(res => {
                      console.log(res);
                    });
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

export const downloadFilesGoogle = content => {
  console.log(content);
  return dispatch => {
    googleDownload(content)
      .then(response => {
        if (response.status === 401) {
          googleNewToken(content.refresh_token)
            .then(res => {
              console.log(res);
              return res;
            })
            .then(res => {
              const access_token = res.access_token;
              const refresh_token = content.refresh_token;
              const _id = content.idclient;
              const token = { _id, access_token, refresh_token };
              console.log(token);
              googleUpdateToken(token)
                .then(res => {
                  console.log('Modifica token en base de datos');
                  console.log(res);
                  const params = { access_token, refresh_token };
                  dispatch(save(params));
                })
                .then(res => {
                  const id = content.id;
                  const token = access_token;
                  const param = { token, id };
                  console.log(param);
                  googleDownload(param)
                    .then(res => {
                      console.log(res.status);
                      console.log('Va a descargar el archivo');
                      return res;
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
                      console.log(link);
                    })
                    .catch(res => {
                      console.log(res);
                    });
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
        link.setAttribute('download', `${content.id}.pdf`);
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
                  console.log('Modifica token en base de datos');
                  console.log(res);
                  const params = { access_token, refresh_token };
                  dispatch(save(params));
                })
                .then(res => {
                  const id = params.id;
                  const email = params.email;
                  const token = access_token;
                  const param = { token, id, email };
                  console.log(param);
                  shareGoogle(param)
                    .then(res => {
                      console.log(res.status);
                      console.log('Elimina el archivo');
                      return res;
                    })
                    .then(res => {
                      return res.json();
                    })
                    .then(res => {
                      console.log(res);
                      console.log('Se ha compartido exitosamente');
                    })
                    .catch(res => {
                      console.log(res);
                    });
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

