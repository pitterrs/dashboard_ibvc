import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../../components/Header";
import { Box, Typography } from "@mui/material";
import DeleteLancamento from './deletelancamento';
import { useNavigate } from "react-router-dom";

const EditLanchamento = ({ show, setShow, onEdit, setOnEdit, getLancamentos }) => {
    const [nome, setNome] = useState(onEdit.nome);
    const [tipo, setTipo] = useState(onEdit.tipo);
    const [confirm, setConfirm] = useState(false);
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
        setShow(false);
        setOnEdit(null);
    }
    const handleEdit = async (e) => {
        if (!nome) { return toast.warn("Campo 'nome' é obrigatório"); }

        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");

        await axios
            .put(`${process.env.REACT_APP_API_URL}changeplano` + onEdit.id, {
                nome: nome,
                tipo: tipo,
                token,
                key
            }).then(
                ({ data }) => {
                    if (data.error === true) {
                        toast.error(data.message)
                    } else {
                        toast.success(data.message)
                        setShow(false);
                        getLancamentos();
                        setOnEdit(null);
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
    const handleDelete = () => {
        setConfirm(true);
    };
    return (
        logado ?
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Body>
                    <Box m="20px" >
                        <Header title="Alterar Plano de Contas" subtitle="Você está modificando um Plano de Contas." />
                        <Row>
                            <Col xs lg="5">
                                <div className="fundo">
                                    <Typography m='0 0 10px 0' variant="h3" fontWeight="600">
                                        Plano de Contas
                                    </Typography>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Nome do Plano de Contas</Form.Label>
                                            <Form.Control maxLength='20' value={nome} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="" />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <div>
                                            <Form.Label>Categoria</Form.Label>
                                            <Form.Select size="sm" aria-label="Default select example" onChange={(e) => setTipo(e.target.value)}>
                                                <option selected={tipo == 'Despesas' ? 'true' : ''} value="Despesas">Despesas</option>
                                                <option selected={tipo == 'Receitas' ? 'true' : ''} value="Receitas">Receitas</option>
                                            </Form.Select>
                                        </div>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" size="sm" onClick={handleEdit}>
                        Salvar alterações
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                        Deletar
                    </Button>
                    <Button variant="outline-success" size="sm" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
                {confirm && (
                    <DeleteLancamento confirm={confirm} setConfirm={setConfirm} setShow={setShow} onEdit={onEdit} setOnEdit={setOnEdit} getLancamentos={getLancamentos} />
                )}
            </Modal>
            : ''
    )
}

export default EditLanchamento;