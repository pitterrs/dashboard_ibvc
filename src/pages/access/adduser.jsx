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
const AddUser = ({ show, setShow, getUsers }) => {
    const navigate = useNavigate();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [admin, setAdmin] = useState(false);
    const [superAdmin, setSuperAdmin] = useState(false);
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
                        data.admin === 'true' && data.super === 'true' ?
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
        setShow(false);
    }
    const handleCreate = async () => {

        if (!nome) { return toast.warn("Preencha o campo 'Nome'"); }
        if (!email) { return toast.warn("Preencha o campo 'Email'"); }
        if (!senha) { return toast.warn("Preencha o campo 'Senha'"); }

        const key = createKey(25);

        await axios
            .post(`${process.env.REACT_APP_API_URL}adduser`, {
                nome,
                email,
                senha,
                key,
                admin,
                super: superAdmin
            })
            .then(
                ({ data }) => {
                    if (data.error === true) {
                        toast.error(data.message)
                    } else {
                        toast.success(data)
                        setShow(false);
                        getUsers();
                    }
                }
            )
            .catch(({ data }) => toast.error(data));
    }

    function createKey(tamanho) {
        var stringAleatoria = '';
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }

    return (
        <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Body >
                <Box m="20px" >
                    <Header title="Criar Equipe" subtitle="Você está uma nova Equipe." />
                    <Row>
                        <Col xs lg="9">
                            <div className='fundo'>
                                <Row className="mb-3">
                                    <Col xs lg="6">
                                        <Form.Group as={Col} >
                                            <Form.Label>Nome do Usuário</Form.Label>
                                            <Form.Control maxLength={45} value={nome} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="Nome" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs lg="6">
                                        <Form.Group as={Col} >
                                            <Form.Label>E-mail</Form.Label>
                                            <Form.Control maxLength={45} value={email} onChange={(e) => setEmail(e.target.value)} size="sm" type="email" placeholder="Email" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs lg="2">
                                        <Form.Group as={Col} >
                                            <Form.Label>Senha</Form.Label>
                                            <Form.Control maxLength={10} value={senha} onChange={(e) => setSenha(e.target.value)} size="sm" type="password" placeholder="Senha" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label>Administração de acessos:</Form.Label>
                                    <Col xs lg="6">
                                        <Form.Check
                                            inline
                                            label="Finanças"
                                            name="group1"
                                            type="checkbox"
                                            onChange={(e) => setAdmin(e.target.checked)}
                                        />
                                        <Form.Check
                                            inline
                                            label="Controle de Usuários"
                                            name="group2"
                                            type="checkbox"
                                            onChange={(e) => setSuperAdmin(e.target.checked)}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" size="sm" onClick={handleCreate}>
                    Cadastrar Usuário
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddUser;