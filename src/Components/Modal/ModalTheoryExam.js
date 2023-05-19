import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ModalTheoryExam({isReserv,setShow}) {
 
  const handleClose = () => setShow(false);
  return (
    <Modal show={isReserv} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Поздравляем!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        Поздравляем вы успешно сдали практический экзамен!!!.
      </Modal.Body>
      <Modal.Footer>
        <Link to="/reservation/practice-exam">
          <Button variant="primary" onClick={handleClose}>
            Перейти на страницу по запису на практического экзамен
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}
