export const googleGet = (token) => {
    const url = "https://www.googleapis.com/drive/v3/files";
    const request = {
        method: 'GET',
        headers: {

           'Authorization':  `Bearer ${token}`
        }
    };
    return fetch(url, request)
        .then(response => response.json());
};

export const googleDelete = (id) => {
    const url = `https://www.googleapis.com/drive/v3/files/${id.id}`;
    const request = {
        method: 'DELETE',
        headers: {
           'Authorization':  `Bearer ${id.token}`
        }
    };
    return fetch(url, request)
};
  
export const googleUpload = (data) => {
  console.log(data);
    const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media';
    const request = {
        method: 'POST',
        headers: {
           'Content-Type':data.file.type,
           'Content-Lenght':data.file.size,
           'Authorization':  `Bearer ${data.token}`
          },
        body: data.file
      };
    return fetch(url, request)
        
};

export const googleDownload = (id) => {
  const url = `https://www.googleapis.com/drive/v3/files/${id.id}?alt=media`;
  console.log(url);
  const request = {
    method:'GET',
    headers: {
       'Authorization':  `Bearer ${id.token}`
    }
  };
   return fetch(url, request)
};


