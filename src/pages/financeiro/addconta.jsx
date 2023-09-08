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

const AddConta = ({ show2, setShow2, getContas }) => {
    const [tipoconta, setTipoConta] = useState();
    const [nome, setBanco] = useState();
    const [agencia, setAgencia] = useState();
    const [conta, setConta] = useState();
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
        setShow2(false);
    }
    const handleCreate = async () => {
        if (!nome) { return toast.warn("Campo 'Nome' é obrigatório"); }
        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");
        await axios
            .post(`${process.env.REACT_APP_API_URL}addconta`, {
                nome: nome,
                agencia: agencia,
                conta: conta,
                tipo: tipoconta,
                token,
                key
            })
            .then(
                ({ data }) => {
                    if (data.error === true) {
                        toast.error(data.message)
                    } else {
                        toast.success(data.message)
                        setBanco('')
                        setAgencia('')
                        setConta('')
                        setTipoConta('')
                        setShow2(false);
                        getContas();
                    }
                }
            )
            .catch(error =>{
                if(error.response.status === 401){
                    window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
                }
                if(error.response.status === 500){
                    toast.error(error.response.data.message);
                }
                if(error.response.status === 403){
                    window.location.replace(`${process.env.REACT_APP_SITE_URL}unauthorized`);
                }
                window.location.replace(`${process.env.REACT_APP_SITE_URL}error`);
            });
    }
    return (
        logado ?
            <Modal size="xl" show={show2} onHide={handleClose}>
                <Modal.Body>
                    <Box m="20px" >
                        <Header title="Criar Conta Bancária" subtitle="Você está criando uma nova Conta Bancária." />
                        <Row>
                            <Col lg="5">
                                <div>
                                    <Typography m='0 0 10px 0' variant="h3" fontWeight="600">
                                        Contas de Movimentação
                                    </Typography>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Nome do Banco</Form.Label>
                                            <Form.Control maxLength={45} value={nome} onChange={(e) => setBanco(e.target.value)} size="sm" type="text" placeholder="Nome" />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Agência</Form.Label>
                                            <Form.Control value={agencia} maxLength={8} onChange={(e) => setAgencia(e.target.value)} size="sm" type="text" placeholder="Agência" />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label>Nº da Conta</Form.Label>
                                            <Form.Control value={conta} maxLength={20} onChange={(e) => setConta(e.target.value)} size="sm" type="text" placeholder="Conta" />
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
            : ''
    )
}

export default AddConta;