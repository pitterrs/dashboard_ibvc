import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "./style.css"
import { useNavigate } from "react-router-dom";

const DeletarLancamento = ({ show7, setShow7, getTransacoes, onEdit, setOnEdit }) => {
    const navigate = useNavigate();
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
                        data.admin === 'true' ?
                        console.log('Logado')
                        : navigate('/unauthorized')
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
        setShow7(false);
        setOnEdit(null)
    }
    const pago = async (e) => {
        if (onEdit.id_recorrencia > 0) {
            await axios
                .delete(`${process.env.REACT_APP_API_URL}deletelancamento/` + onEdit.id + '/' + onEdit.id_recorrencia)
                .then(({ data }) => {
                    toast.success(data);
                })
                .catch(({ data }) => toast.error(data));

            setShow7(false);
            setOnEdit(null)
            getTransacoes();
        } else {
            await axios
                .delete(`${process.env.REACT_APP_API_URL}deletelancamento/` + onEdit.id)
                .then(({ data }) => {
                    toast.success(data);
                })
                .catch(({ data }) => toast.error(data));

            setShow7(false);
            setOnEdit(null)
            getTransacoes();
        }
    }
    return (
        <Modal size="xl" show={show7} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Deletar lançamento?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Typography variant="h5" >
                    Deseja realmente deletar este lançamento?
                </Typography>
                <Typography variant="h5" >
                    Está ação não podera ser desfeita após a confirmação e caso o lançamento tenha correrencia os mesmo serão deletados.
                </Typography>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={handleClose} >
                    Fechar
                </Button>
                <Button variant="danger" size="sm" onClick={() => pago()} >
                    Deletar Lançamento
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletarLancamento;