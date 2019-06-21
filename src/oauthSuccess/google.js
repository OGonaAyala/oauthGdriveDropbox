import React, { Component } from "react";
import "../App.css";
import ListFiles from "../components/listFiles";

class Google extends Component {
  constructor(){
    super();
    this.state = {
      token: '',
      loading: false,
      errors: null,
      files: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  getTokenFromURL(str){
    var ret = Object.create(null);
    if (typeof str !== 'string') {
      return ret;
    }
    str = str.trim().replace(/^(\?|#|&)/, '');
    if (!str) {
      return ret;
    }
    str.split('&').forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts.shift();
      var val = parts.length > 0 ? parts.join('=') : undefined;
      key = decodeURIComponent(key);
      val = val === undefined ? null : decodeURIComponent(val);
      if (ret[key] === undefined) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
    });
    return ret;
  }

   componentWillMount(){
    var query = this.getTokenFromURL(window.location.hash).token;
     this.setState({
      token: query
     });
   }

   componentDidMount(){
    fetch('https://www.googleapis.com/drive/v3/files',{
      method: 'GET',
      headers: {'Authorization':  `Bearer ${this.state.token}`}
    })
    .then(response => response.json())
    .then(jsonResponse => {
     console.log(jsonResponse.files);
     return jsonResponse.files;
    })
    .then((files) => {
      this.setState({
        files:files
      })
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  uploadFile(){
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    const data = file;
    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=media',{
      method: 'POST',
      headers: {
        'Content-Type': file.type,
        'Content-Lenght': file.size,
        'Authorization':  `Bearer ${this.state.token}`
      },
      body: data
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  handleDownload(id){
      this.setState({
      errors: null,
      loading: true,
    }, () => {
     fetch( `https://www.googleapis.com/drive/v3/files/${id.id}?alt=media`,{
      method: 'GET',
      headers: {
                'Authorization':  `Bearer ${this.state.token}`,
      }
    })
     .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${id.id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        this.setState({
          loading: false
        });
      })
      .catch((error) => {
        error.json().then((json) => {
          this.setState({
            errors: json,
            loading: false
          });
        })
      });
    }); 
  }

  handleDelete(id){
     fetch(`https://www.googleapis.com/drive/v3/files/${id.id}`,{
      method: 'DELETE',
      headers: {
                'Authorization':  `Bearer ${this.state.token}`,
                }
    })
   .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });
    }
      
  render() {
    const files = this.state.files;

    return (
      <div>
        <div>
          {
            files.map(file => 
              <ListFiles
              key={file.id}
              {...file}
              delete = {this.handleDelete}
              download = {this.handleDownload}/>
              )
          }
        </div>
        <div>
        <h2>Subir archivo</h2>
          <form onSubmit={this.uploadFile.bind(this)}>
           <input type="file" id="file-upload" />
           <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Google;
