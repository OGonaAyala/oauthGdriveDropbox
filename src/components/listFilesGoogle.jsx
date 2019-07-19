import React, { Component } from 'react';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { shareFileGoogle } from '../actions/actions';
import { connect } from 'react-redux';

class ListFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
    };

    this.toggle = this.toggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.shareGoogle = this.shareGoogle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  handleInput(e) {
    const { value } = e.target;
    this.setState({
      email: value,
    });
  }

  shareGoogle() {
    this.toggle();
    console.log(this.state.email);
    const email = this.state.email;
    const id = this.props.id;
    const token = this.props.token;
    const idclient = this.props.idclient;
    const refresh_token = this.props.refresh_token;
    const param = { email, id, token, refresh_token, idclient };
    this.props.shareFileGoogle(param);
  }

  handleDelete() {
    const id = this.props.id;
    const idclient = this.props.idclient;
    const refresh_token = this.props.refresh_token;
    const name = this.props.name;
    const idname = this.props.name;
    const token = this.props.token;
    const param = { id, name, token, refresh_token, idclient };
    this.props.delete(param);
  }

  handleDownload() {
    const id = this.props.id;
    const name = this.props.name;
    const type = this.props.mimeType;
    const token = this.props.token;
    const idclient = this.props.idclient;
    const refresh_token = this.props.refresh_token;
    const param = { id, name, type, token, idclient, refresh_token };
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
            <td>
              <div>
                <Button color="danger" onClick={this.toggle}>
                  Compartir archivo
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggle}>
                    Compartir Archivo
                  </ModalHeader>
                  <ModalBody>
                    <label>Email de la persona para compartir archivo</label>
                    <input
                      type="text"
                      name="email"
                      onChange={this.handleInput}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.shareGoogle}>
                      Compartir
                    </Button>
                    <Button color="secondary" onClick={this.toggle}>
                      Cancelar
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default connect(
  null,
  { shareFileGoogle },
)(ListFiles);
