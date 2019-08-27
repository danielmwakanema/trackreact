import React from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

class InfoModal extends React.Component {
  render () {
    return (
      <Modal
        isOpen={true}
        size="sm"
        style={{ backgroundColor: "crimson" }}
        toggle={this.props.toggle}
      >
      <ModalHeader
        className="justify-content-center"
        toggle={this.props.toggle}
      >
        { this.props.header }
      </ModalHeader>
      <ModalBody>{ this.props.message }</ModalBody>
    </Modal>
    );
  }
}

export default InfoModal;