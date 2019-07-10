import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import ListLinks from './listLinks.jsx';

class ListFiles extends Component {
  handleDelete() {
    const id = this.props.id;
    const name = this.props.name;
    const token = this.props.token;
    const param = { id, name, token };
    this.props.delete(param);
  }

  handleDownload() {
    const id = this.props.id;
    const name = this.props.name;
    const type = this.props.mimeType;
    const token = this.props.token;
    const param = { id, name, type, token };
    this.props.download(param);
  }

  handleShare() {
    const name = this.props.name;
    const token = this.props.token;
    const id = this.props.id;
    const param = { name, token, id };
    this.props.share(param);
  }

  render() {
    console.log(this.props.links);
    const links = this.props.links;
    return (
      <Table align="center">
        <tbody>
          <tr>
            <td>{this.props.name}</td>
            <td>
              <button
                className="btn btn-success"
                onClick={this.handleDownload.bind(this)}
              >
                Descargar
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={this.handleDelete.bind(this)}
              >
                Eliminar
              </button>
            </td>
            <td>
              <button
                className="btn btn-success"
                onClick={this.handleShare.bind(this)}
              >
                Enlace para compartir
              </button>
            </td>
            <td>
              {links.map(link => (
                <ListLinks
                  key={link.id}
                  idFile={this.props.id}
                  idLink={link.id}
                  link={link.link}
                />
              ))}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default connect(state => ({
  links: state.filesReducer.link,
}))(ListFiles);
