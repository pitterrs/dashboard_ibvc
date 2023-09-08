import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

const DeleteConta = ({ confirm, setConfirm, setShow, onEdit, setOnEdit, getContas }) => {
    const navigate = useNavigate();
    const [logado, setLogado] = useState(false);
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
                        data.createfinancas === 'true' ?
                            setLogado(true)
                            : window.location.replace(`${process.env.REACT_APP_SITE_URL}unauthorized`)
                    } else {
                        setLogado(false);
                        window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
                    }
                }
            )
            .catch(({ err }) => {
                setLogado(false)
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

        let conta = [];
        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}checkconta/` + onEdit.id);
            conta = res.data
        } catch {
            console.log('erro desconhecido');
        }

        if (conta[0].valor != null) { return toast.error("Conta Bancária possui lançamentos ou programações e não pode ser deletada."); }

        await axios
            .delete(`${process.env.REACT_APP_API_URL}deleteconta/` + onEdit.id, {
                data: {
                    token,
                    key
                }
            })
            .then(({ data }) => {
                if (data.error === true) {
                    toast.error(data.message)
                } else {
                    toast.success(data.message)
                    setConfirm(false);
                    getContas();
                    setOnEdit(null);
                    setShow(false);
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
                }
                if (error.response.status === 500) {
                    toast.error(error.response.data.message);
                }
                if (error.response.status === 403) {
                    window.location.replace(`${process.env.REACT_APP_SITE_URL}unauthorized`);
                }
                window.location.replace(`${process.env.REACT_APP_SITE_URL}error`);
            });
    };

    return (
        logado ?
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
            : ''
    )
}

export default DeleteConta;