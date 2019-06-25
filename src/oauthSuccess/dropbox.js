import React, { Component } from "react";
import ListFiles from "../components/listFiles";
import DropboxUpload from "../components/dropboxUpload";
const Dropboxx = require('dropbox').Dropbox;

class Dropbox extends Component {
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

  handleDelete(name){
     const data = {path: `/Imagenes/${name.name}`};
     fetch('https://api.dropboxapi.com/2/files/delete_v2',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
                'Authorization':  `Bearer ${this.state.token}`,
                'Content-Type': 'application/json'
                },
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    };

    handleDownload(name){
    const data = {path: `/Imagenes/${name.name}`};
      this.setState({
      errors: null,
      loading: true,
    }, () => {
     fetch('https://content.dropboxapi.com/2/files/download',{
      method: 'POST',
      headers: {
                'Authorization':  `Bearer ${this.state.token}`,
                'Dropbox-API-Arg': JSON.stringify(data)
                }
    })
     .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name.name);
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
     var access_token = this.getTokenFromURL(window.location.hash).access_token;
     this.setState({
      token: access_token
     });

    }



  componentDidMount(){
    var dbx = new Dropboxx({ accessToken: this.state.token});
    dbx.filesListFolder({path: '/Imagenes'})
    .then(function(response) {
      console.log(response.entries);
      return response.entries;
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

  componentDidUpdate(){
    var dbx = new Dropboxx({ accessToken: this.state.token});
    dbx.filesListFolder({path: '/Imagenes'})
    .then(function(response) {
      console.log(response.entries);
      return response.entries;
    })
    
    .catch(function(error) {
      console.error(error);
    });
  }

  render() {
    const files = this.state.files;
    return (
     <div className="App">
      <h2>Files</h2>
       <div>
        {
          files.map(file =>
            <ListFiles
            key = {file.id}
            {...file}
            delete = {this.handleDelete} 
            download = {this.handleDownload}/>
        )}
        </div>
        <div>
          <DropboxUpload access_token= {this.state.token}/>
        </div>
      </div> 
    );
  }
}

export default Dropbox;
