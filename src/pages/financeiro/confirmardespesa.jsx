import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "./style.css"
import { useNavigate } from "react-router-dom";

const ConfirmarDespesa = ({ show6, setShow6, getTransacoes, onEdit, setOnEdit }) => {
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

    const status = (onEdit.status == 'Não Pago' ? 'Pago' : 'Não Pago');
    const handleClose = () => {
        setShow6(false);
        setOnEdit(null)
    }
    const pago = async (e) => {
        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");
        await axios
            .put(`${process.env.REACT_APP_API_URL}changestatus/` + onEdit.id, {
                status: status,
                token,
                key
            })
            .then(
                ({ data }) => {
                    if (data.error === true) {
                        toast.error(data.message)
                    } else {
                        toast.success(data.message)
                        setShow6(false);
                        setOnEdit(null)
                        getTransacoes();
                    }
                }
            )
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
    }
    return (
        logado ?
            <Modal size="xl" show={show6} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Alterar status da Despesa?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Typography variant="h5" >
                        Deseja realmente alterar o status da despesa para '{status}' ?
                    </Typography>
                    <Typography variant="h5" >
                        Você pode alterar o status novamente a qualquer momento pelo mesmo botão.
                    </Typography>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose} >
                        Fechar
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => pago()} >
                        Lançamento {status}
                    </Button>
                </Modal.Footer>
            </Modal>
            : ''
    )
}

export default ConfirmarDespesa;