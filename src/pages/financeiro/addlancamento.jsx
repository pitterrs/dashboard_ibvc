import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Header from "../../components/Header";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddLancamento = ({ show2, setShow2, getLancamentos }) => {
    const [nome, setNome] = useState();
    const [tipo, setTipo] = useState();
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
        setShow2(false);
    }
    const handleCreate = async () => {
        if (!nome) { return toast.warn("Campo 'Nome' é obrigatório"); }
        if (!tipo) { return toast.warn("Campo 'Categoria' é obrigatório"); }

        await axios
            .post(`${process.env.REACT_APP_API_URL}addplano`, {
                nome: nome,
                tipo: tipo
            })
            .then(
                ({ data }) => {
                    if (data.code) {
                        toast.error('Erro ao adicionar registro no BD. Entre em contato com o administrador')
                    } else {
                        toast.success(data)
                        setNome('')
                    }
                }
            )
            .catch(({ data }) => toast.error(data));

        setShow2(false);
        getLancamentos();
    }
    return (
        <Modal size="xl" show={show2} onHide={handleClose}>
            <Modal.Body>
                <Box m="20px" >
                    <Header title="Criar Plano de Contas" subtitle="Você está criando um novo Plano de Contas." />
                    <Row>
                        <Col xs lg="5">
                            <div>
                                <Typography m='0 0 10px 0' variant="h3" fontWeight="600">
                                    Plano de Contas
                                </Typography>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Nome do Plano de Contas</Form.Label>
                                        <Form.Control value={nome} maxLength={20} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="Nome" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <div>
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Select size="sm" aria-label="Default select example" onChange={(e) => setTipo(e.target.value)}>
                                            <option value=""></option>
                                            <option value="Despesas">Despesas</option>
                                            <option value="Receitas">Receitas</option>
                                        </Form.Select>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" size="sm" onClick={handleCreate}>
                    Criar
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddLancamento;