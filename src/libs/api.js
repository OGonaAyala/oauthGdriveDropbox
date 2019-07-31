export const getTokenFromURL = str => {
  const ret = Object.create(null);
  if (typeof str !== 'string') {
    return ret;
  }
  str = str.trim().replace(/^(\?|#|&)/, '');
  if (!str) {
    return ret;
  }
  str.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=');
    let key = parts.shift();
    let val = parts.length > 0 ? parts.join('=') : '';
    key = decodeURIComponent(key);
    val = val ? decodeURIComponent(val) : null;
    if (!ret[key]) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
  });
  return ret;
};

export const SaveAccessToken = token => {
  const url =
    'https://api.mlab.com/api/1/databases/tokens_omar/collections/tokensUser?apiKey=7N0hJ19t7vyboGPojW8evejTxlwizS-i';
  const request = {
    method: 'POST',
    body: JSON.stringify(token),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };
  return fetch(url, request).then(response => response.json());
};

export const googleUpdateToken = token => {
  const url = `https://api.mlab.com/api/1/databases/tokens_omar/collections/tokensUser/${token._id}?apiKey=7N0hJ19t7vyboGPojW8evejTxlwizS-i`;
  const request = {
    method: 'PUT',
    body: JSON.stringify({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };
  return fetch(url, request);
};

export const GetToken = id => {
  const url = `https://api.mlab.com/api/1/databases/tokens_omar/collections/tokensUser/${id}?apiKey=7N0hJ19t7vyboGPojW8evejTxlwizS-i`;
  return fetch(url);
};

export const googleGet = token => {
  const url = 'https://www.googleapis.com/drive/v3/files';
  const request = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, request);
};

export const googleDelete = id => {
  const url = `https://www.googleapis.com/drive/v3/files/${id.id}`;
  const request = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${id.token}`,
    },
  };
  return fetch(url, request);
};

export const googleUpload = data => {
  const url =
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=media';
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': data.file.type,
      'Content-Lenght': data.file.size,
      Authorization: `Bearer ${data.token}`,
    },
    body: data.file,
  };
  return fetch(url, request);
};

export const googleDownload = id => {
  const url = `https://www.googleapis.com/drive/v3/files/${id.id}?alt=media`;
  const request = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${id.token}`,
    },
  };
  return fetch(url, request);
};

export const googleNewToken = refreshToken => {
  const client_id =
    '1011461723910-5l7nmlhno2me1ahd5jksfc4ti96n35ua.apps.googleusercontent.com';
  const client_secret = 'B88yPjs8m-sQeiapqnK-fWDz';
  const data = `client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
  const url = 'https://www.googleapis.com/oauth2/v4/token';
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data,
  };
  return fetch(url, request).then(response => response.json());
};

export const dropboxDelete = id => {
  const data = { path: `/Imagenes/${id.name}` };
  const url = 'https://api.dropboxapi.com/2/files/delete_v2';
  const request = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${id.token}`,
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, request);
};

export const dropboxDownload = id => {
  const data = { path: `/Imagenes/${id.name}` };
  let url = 'https://content.dropboxapi.com/2/files/download';
  const request = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${id.token}`,
      'Dropbox-API-Arg': JSON.stringify(data),
    },
  };
  fetch(url, request)
    .then(response => response.blob())
    .then(blob => {
      url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', id.name);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(res => {
      console.log(res);
    });
};

export const shareDropbox = params => {
  const data = { path: `/Imagenes/${params.name}` };
  const url =
    'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';
  const request = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(url, request).then(response => response.json());
};

export const shareGoogle = params => {
  const role = 'reader';
  const type = 'user';
  const emailAddress = params.email;
  const data = { role, type, emailAddress };
  const url = `https://www.googleapis.com/drive/v3/files/${params.id}/permissions`;
  const request = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(url, request);
};
