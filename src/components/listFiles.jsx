import React, { Component } from 'react';
import { Table } from 'reactstrap';

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

  render() {
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
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default ListFiles;
