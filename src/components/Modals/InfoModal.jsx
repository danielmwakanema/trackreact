import React from "react";

import { Modal, ModalBody } from "reactstrap";

class InfoModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <div className="modal-header">
          <h5 className="modal-title" id="modalLabel">
            {this.props.header}
          </h5>
          <a
            href="/"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={ e => { e.preventDefault(); this.props.toggle(); }}
            style={{padding: "1%"}}
          >
            <i className="tim-icons icon-simple-remove" />
          </a>
        </div>
        <ModalBody>
          <p>{ this.props.message }</p>
        </ModalBody>
      </Modal>
    );
  }
}

export default InfoModal;
