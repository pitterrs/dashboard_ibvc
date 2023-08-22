import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteConta = ({ confirm, setConfirm, setShow, onEdit, setOnEdit, getContas }) => {

    const handleClose = () => {
        setConfirm(false);
    };

    const deletar = async (e) => {

        let conta = [];

        try {
            const res = await axios.get("http://localhost:8800/checkconta/" + onEdit.id);
            conta = res.data
        } catch {
            console.log('erro desconhecido');
        }

        if (conta.length != 0) { return toast.error("Conta Bancária possui lançamentos ou programações e não pode ser deletada."); }

        await axios
            .delete("http://localhost:8800/deleteconta/" + onEdit.id)
            .then(({ data }) => {
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setConfirm(false);
        getContas();
        setOnEdit(null);
        setShow(false);
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
                        Deseja deletar o cadastro da Conta Bancária?
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

export default DeleteConta;