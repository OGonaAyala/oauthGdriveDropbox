export const googleGet = token => {
  const url = 'https://www.googleapis.com/drive/v3/files';
  const request = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, request).then(response => response.json());
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
  console.log(data);
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
  return fetch(url, request).then(response => response.json());
};

export const googleDownload = id => {
  const url = `https://www.googleapis.com/drive/v3/files/${id.id}?alt=media`;
  console.log(url);
  const request = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${id.token}`,
    },
  };
  return fetch(url, request);
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
  const url = 'https://content.dropboxapi.com/2/files/download';
  const request = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${id.token}`,
      'Dropbox-API-Arg': JSON.stringify(data),
    },
  };
  return fetch(url, request);
};
