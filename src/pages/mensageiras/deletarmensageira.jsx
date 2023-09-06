import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteMensageira = ({ confirm, setConfirm, setShow, mensageira, setMensageira, getMensageiras }) => {

    const validations = async () => {
        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");

        await axios
            .post(`${process.env.REACT_APP_API_URL}validation`, {
                Authorization: token,
                key,
            })
            .then(
                ({ data }) => {
                    if (data.error === false) {
                        console.log('Logado')
                    } else {
                        window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
                    }
                }
            )
            .catch(({ err }) => {
                console.log(err)
                toast.error('Ocorreu um erro ao tentar validar seu acesso. Faça login novamente ou entre em contato com o administrador.')
                window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
            });
    }

    useEffect(() => {
        validations();
    }, []);

    const handleClose = () => {
        setConfirm(false);
    };

    const deletar = async (e) => {
        await axios
            .delete(`${process.env.REACT_APP_API_URL}deletemensageiras/` + mensageira)
            .then(({ data }) => {
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setConfirm(false);
        getMensageiras();
        setMensageira(null);
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
                        Deseja remover Mensageira?
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

export default DeleteMensageira;