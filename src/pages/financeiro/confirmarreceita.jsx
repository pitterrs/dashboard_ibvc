import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Header from "../../components/Header";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "./style.css"
import { useNavigate } from "react-router-dom";

const ConfirmarReceita = ({ show5, setShow5, getTransacoes, onEdit, setOnEdit }) => {
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
        setShow5(false);
        setOnEdit(null)
    }
    const pago = async (e) => {
        await axios
            .put(`${process.env.REACT_APP_API_URL}changestatus/` + onEdit.id, {
                status: status
            })
            .then(
                ({ data }) => {
                    if (data.code) {
                        toast.error('Erro ao alterar registro no BD. Entre em contato com o administrador')
                    } else {
                        toast.success(data)
                    }
                }
            )
            .catch(({ data }) => toast.error(data));

        setShow5(false);
        setOnEdit(null)
        getTransacoes();
    }
    return (
        logado ?
        <Modal size="xl" show={show5} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Alterar status da Receita?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Typography variant="h5" >
                    Deseja realmente alterar o status da receita para '{status}' ?
                </Typography>
                <Typography variant="h5" >
                    Você pode alterar o status novamente a qualquer momento pelo mesmo botão.
                </Typography>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={handleClose} >
                    Fechar
                </Button>
                <Button variant="success" size="sm" onClick={() => pago()} >
                    Lançamento {status}
                </Button>
            </Modal.Footer>
        </Modal>
        : ''
    )
}

export default ConfirmarReceita;