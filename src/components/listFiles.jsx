import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { shareFileGoogle } from '../actions/actionsGoogle';
import { dropboxDownload } from '../libs/api';
import ListLinks from './listLinks';

class ListFiles extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      email: '',
      url: '/google',
    };
    this.toggle = this.toggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.shareGoogle = this.shareGoogle.bind(this);
    this.downloadDropbox = this.downloadDropbox.bind(this);
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

  shareGoogle(param) {
    this.toggle();
    this.props.shareFileGoogle(param);
  }

  downloadDropbox = param => {
    dropboxDownload(param);
  };

  render() {
    const type = this.props.mimeType;
    const id = this.props.id;
    const idclient = this.props.idclient;
    const refresh_token = this.props.refresh_token;
    const name = this.props.name;
    const token = this.props.token;
    const email = this.state.email;
    const params = { email, id, name, token, refresh_token, idclient, type };
    const links = this.props.links;

    return (
      <Table align="center">
        <tbody>
          <tr>
            <td>{this.props.name}</td>
            {this.state.url === this.props.url ? (
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => this.props.download(params)}
                >
                  Descargar
                </button>
              </td>
            ) : (
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => this.downloadDropbox(params)}
                >
                  Descargar
                </button>
              </td>
            )}
            <td>
              <button
                className="btn btn-success"
                onClick={() => this.props.delete(params)}
              >
                Eliminar
              </button>
            </td>
            {this.state.url === this.props.url ? (
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
                      <p>Email de la persona para compartir archivo</p>
                      <input
                        type="text"
                        name="email"
                        onChange={this.handleInput}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={() => this.shareGoogle(params)}
                      >
                        Compartir
                      </Button>
                      <Button color="secondary" onClick={this.toggle}>
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </td>
            ) : (
              <td>
                <div>
                  <button
                    className="btn btn-success"
                    onClick={() => this.props.share(params)}
                  >
                    Enlace para compartir
                  </button>
                </div>
              </td>
            )}
            <td>
              <div>
                {links.map(link => (
                  <ListLinks
                    key={link.id}
                    idFile={this.props.id}
                    idLink={link.id}
                    link={link.link}
                  />
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default connect(
  state => ({
    links: state.filesReducer.link,
  }),
  { shareFileGoogle },
)(ListFiles);
