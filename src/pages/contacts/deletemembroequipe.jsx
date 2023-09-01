import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteMembroEquipe = ({ show5, setShow5, membro, setMembro, getMembrosEquipe }) => {

    const handleClose = () => {
        setShow5(false);
    };

    const deletar = async (e) => {

        await axios
            .delete("http://localhost:8800/deletemembroequipe/" + membro.id_membro)
            .then(({ data }) => {
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setShow5(false);
        getMembrosEquipe();
        setMembro(null);
    };

    return (
        <div>
            <Modal
                size="lg"
                show={show5}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Deseja remover o membro da equipe?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><p>Esta ação não poderá ser desfeita uma vez confirmada. </p></Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" size="sm" onClick={handleClose} >
                        Fechar
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => deletar()} >
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteMembroEquipe;