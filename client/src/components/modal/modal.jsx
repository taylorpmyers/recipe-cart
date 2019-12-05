import React from 'react';
import { Modal } from 'react-bootstrap';
import './modal.css'
const customModal = props => {

  return (
    <Modal fade={"false"} animation={false} show={props.show} onHide={props.onHide}>
      <Modal.Header
        style={props.style}
      >
      </Modal.Header>

      <Modal.Body>
        <h1 style={{ textAlign: "center", fontSize: "2em" }}>{props.title}</h1>
        {props.body}
      </Modal.Body>

      <Modal.Footer>
        {props.footer}
      </Modal.Footer>
    </Modal>

  );
}

export default customModal;