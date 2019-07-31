import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ListLinks extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    if (this.props.idFile === this.props.idLink) {
      return (
        <div>
          <Button color="danger" onClick={this.toggle}>
            Ver enlace
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Enlace de archivo</ModalHeader>
            <ModalBody>
              <p>
                Copia este enlace y mandalo a quien quieras compartir este
                archivo
              </p>
              <p>{this.props.link}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Cerrar
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
    return <p />;
  }
}

export default ListLinks;
