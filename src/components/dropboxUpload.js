import React, { Component } from 'react';
const Dropbox = require('dropbox').Dropbox;

class DropboxUpload extends Component {

   handleUpload(){
    const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
    const dbx = new Dropbox({ accessToken: this.props.access_token });
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    
      if (file.size < UPLOAD_FILE_SIZE_LIMIT) {
        dbx.filesUpload({path: '/Imagenes/' + file.name, contents: file})
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.error(error);
          });
      } else {
        const maxBlob = 8 * 1000 * 1000; 
        var workItems = [];     
        var offset = 0;
        while (offset < file.size) {
          var chunkSize = Math.min(maxBlob, file.size - offset);
          workItems.push(file.slice(offset, offset + chunkSize));
          offset += chunkSize;
        } 
          
        const task = workItems.reduce((acc, blob, idx, items) => {
          if (idx === 0) {
            return acc.then(function() {
              return dbx.filesUploadSessionStart({ close: false, contents: blob})
                        .then(response => response.session_id)
            });          
          } else if (idx < items.length-1) {  
            return acc.then(function(sessionId) {
             var cursor = { session_id: sessionId, offset: idx * maxBlob };
             return dbx.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob }).then(() => sessionId); 
            });
          } else {
            return acc.then(function(sessionId) {
              var cursor = { session_id: sessionId, offset: file.size - blob.size };
              var commit = { path: '/' + file.name, mode: 'add', autorename: true, mute: false };              
              return dbx.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });           
            });
          }          
        }, Promise.resolve());
        task.then(function(result) {
        }).catch(function(error) {
          console.error(error);
        }); 
      }
      return false;
  }

  render(){
    return(
      <div>
        <h2>Subir archivo</h2>
          <form onSubmit={this.handleUpload.bind(this)}>
           <input type="file" id="file-upload" />
           <button type="submit">Submit</button>
          </form>
      </div>

      )
  }
}

export default DropboxUpload;
