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

const AddConta = ({ show2, setShow2, getContas }) => {
    const [tipoconta, setTipoConta] = useState();
    const [nome, setBanco] = useState();
    const [agencia, setAgencia] = useState();
    const [conta, setConta] = useState();
    const handleClose = () => {
        setShow2(false);
    }
    const handleCreate = async () => {
        if (!nome) { return toast.warn("Campo 'Nome' é obrigatório"); }

        await axios
            .post("http://localhost:8800/addconta", {
                nome: nome,
                agencia: agencia,
                conta: conta,
                tipo: tipoconta
            })
            .then(
                ({ data }) => {
                    if (data.code) {
                        toast.error('Erro ao adicionar registro no BD. Entre em contato com o administrador')
                    } else {
                        toast.success(data)
                        setBanco('')
                        setAgencia('')
                        setConta('')
                        setTipoConta('')
                    }
                }
            )
            .catch(({ data }) => toast.error(data));

        setShow2(false);
        getContas();
    }
    return (
        <Modal size="xl" show={show2} onHide={handleClose}>
            <Modal.Body>
                <Box m="20px" >
                    <Header title="Criar Conta Bancária" subtitle="Você está criando uma nova Conta Bancária." />
                    <Row>
                        <Col xs lg="5">
                            <div>
                                <Typography m='0 0 10px 0' variant="h3" fontWeight="600">
                                    Contas de Movimentação
                                </Typography>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Nome do Banco</Form.Label>
                                        <Form.Control value={nome} onChange={(e) => setBanco(e.target.value)} size="sm" type="text" placeholder="Nome" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Agência</Form.Label>
                                        <Form.Control value={agencia} onChange={(e) => setAgencia(e.target.value)} size="sm" type="text" placeholder="Agência" />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label>Nº da Conta</Form.Label>
                                        <Form.Control value={conta} onChange={(e) => setConta(e.target.value)} size="sm" type="text" placeholder="Conta" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <div>
                                        <Form.Label>Tipo de Conta</Form.Label>
                                        <Form.Select size="sm" aria-label="Default select example" onChange={(e) => setTipoConta(e.target.value)}>
                                            <option value=""></option>
                                            <option value="Conta Corrente">Conta Corrente</option>
                                            <option value="Conta Poupança">Conta Poupança</option>
                                            <option value="Conta Salário">Conta Salário</option>
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
                    Criar Conta
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddConta;