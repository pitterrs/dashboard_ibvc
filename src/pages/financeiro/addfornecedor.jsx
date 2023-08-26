import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Header from "../../components/Header";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

const AddFornecedor = ({ show2, setShow2, getFornecedores }) => {
    const [nome, setNome] = useState();
    const [documento, setDocumento] = useState();
    const [contato, setContato] = useState();
    const handleClose = () => {
        setShow2(false);
    }
    const handleCreate = async () => {
        if (!nome) { return toast.warn("Campo 'Nome' é obrigatório"); }
        if (!documento) { return toast.warn("Campo 'CPF/CNPJ' é obrigatório"); }

        await axios
            .post("http://localhost:8800/addfornecedor", {
                nome: nome,
                documento: documento,
                contato: contato
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
        getFornecedores();
    }
    return (
        <Modal size="xl" show={show2} onHide={handleClose}>
            <Modal.Body>
                <Box m="20px" >
                    <Header title="Criar Cadastro de Pessoa ou Fornecedor" subtitle="Você está criando um novo cadastro de pessoa ou fornecedor." />
                    <Row>
                        <Col xs lg="5">
                            <div>
                                <Typography m='0 0 10px 0' variant="h3" fontWeight="600">
                                    Pessoa/Fornecedor
                                </Typography>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Nome da Pessoa ou Fornecedor</Form.Label>
                                        <Form.Control maxLength='45' value={nome} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="Nome" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>CPF ou CNPJ</Form.Label>
                                        <Form.Control value={documento} onChange={(e) => setDocumento(e.target.value)} size="sm" type="text" placeholder="Documento" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label>Contato</Form.Label>
                                        <Form.Control value={contato} onChange={(e) => setContato(e.target.value)} size="sm" type="text" placeholder="Telefone/Celular de Contato" />
                                    </Form.Group>
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

export default AddFornecedor;