import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteFornecedor = ({ confirm, setConfirm, onEdit, setOnEdit, getFornecedores }) => {

    const handleClose = () => {
        setConfirm(false);
    };

    const deletar = async (e) => {

        await axios
            .delete("http://localhost:8800/deletefornecedor/" + onEdit[0].id)
            .then(({ data }) => {
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setConfirm(false);
        getFornecedores();
        setOnEdit(null);
    };

    return (
        <div>
            <Modal
                size="lg"
                show={confirm}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Deseja deletar o cadastro da Pessoa/Fornecedor?
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

export default DeleteFornecedor;