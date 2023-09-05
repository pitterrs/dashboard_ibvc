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
const ChangeUser = ({ show2, setShow2, getUsers, user }) => {
    const navigate = useNavigate();
    const [id, setId] = useState(user.id)
    const [nome, setNome] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [admin, setAdmin] = useState(user.admin == 'true' ? 'true' : 'false');
    const [superAdmin, setSuperAdmin] = useState(user.super);
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
                        data.admin === 'true' && data.super === 'true' ?
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

    const handleClose = () => {
        setShow2(false);
    }
    const handleChange = async () => {

        if (!nome) { return toast.warn("Preencha o campo 'Nome'"); }
        if (!email) { return toast.warn("Preencha o campo 'Email'"); }

        await axios
            .put("http://localhost:8800/changeuser/" + id, {
                nome,
                email,
                admin,
                super: superAdmin
            })
            .then(
                ({ data }) => {
                    if (data.code) {
                        toast.error('Erro ao adicionar registro no BD. Entre em contato com o administrador')
                    } else {
                        toast.success(data)
                    }
                }
            )
            .catch(({ data }) => toast.error(data));
        setShow2(false);
        getUsers();

    }

    const setAdminFunction = (e) => {
        if(e == true){
            setAdmin('true');
        }else{
            setAdmin('false');
        }
    }

    const setSuperAdminFunction = (e) => {
        if(e == true){
            setSuperAdmin('true');
        }else{
            setSuperAdmin('false');
        }
    }

    return (
        <Modal size="xl" show={show2} onHide={handleClose}>
            <Modal.Body >
                <Box m="20px" >
                    <Header title="Alterar Usuário" subtitle="Você está alterando as informaçõs do usuário." />
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
                                            <Form.Control disabled maxLength={45} value={email} onChange={(e) => setEmail(e.target.value)} size="sm" type="email" placeholder="Email" />
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
                                            onChange={(e) => setAdminFunction(e.target.checked)}
                                            checked={admin == 'true' ? 'true' : false}
                                            
                                        />
                                        <Form.Check
                                            inline
                                            label="Controle de Usuários"
                                            name="group2"
                                            type="checkbox"
                                            onChange={(e) => setSuperAdminFunction(e.target.checked)}
                                            checked={superAdmin == 'true' ? 'true' : false}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" size="sm" onClick={handleChange}>
                    Salvar Alterações
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeUser;