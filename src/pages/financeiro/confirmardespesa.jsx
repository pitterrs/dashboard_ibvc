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
    const validations = async () => {
        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");

        await axios
            .post("http://localhost:8800/validation", {
                Authorization: token,
                key,
            })
            .then(
                ({ data }) => {
                    if (data.error === false) {
                        data.admin === 'true' ?
                        console.log('Logado')
                        : navigate('/unauthorized')
                    } else {
                        window.location.replace('http://localhost:3000/login');
                    }
                }
            )
            .catch(({ err }) => {
                console.log(err)
                toast.error('Ocorreu um erro ao tentar validar seu acesso. Faça login novamente ou entre em contato com o administrador.')
                window.location.replace('http://localhost:3000/login');
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
        await axios
            .put(`http://localhost:8800/changestatus/` + onEdit.id, {
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

        setShow6(false);
        setOnEdit(null)
        getTransacoes();
    }
    return (
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
    )
}

export default ConfirmarDespesa;