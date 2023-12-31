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
import './novomembro'
const AddEquipe = ({ show, setShow, getEquipes }) => {
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
                        data.createequipes === 'true' ?
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
    const [nome, setNome] = useState()
    const handleClose = () => {
        setShow(false);
    }
    const handleCreate = async () => {

        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");

        let new_id_equipe = 0;
        if (!nome) { return toast.warn("Preencha o campo 'Nome'"); }

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getlastequipe`);
            new_id_equipe = res.data[0].id_equipe ? res.data[0].id_equipe : 0;
            new_id_equipe = new_id_equipe + 1;
        } catch (error) {
            window.location.replace(`${process.env.REACT_APP_SITE_URL}error`)
        }

        await axios
            .post(`${process.env.REACT_APP_API_URL}addequipe`, {
                nome: nome,
                id_equipe: new_id_equipe,
                token,
                key
            })
            .then(
                ({ data }) => {
                    if (data.error === true) {
                        toast.error('Erro ao adicionar registro no BD. Entre em contato com o administrador')
                    } else {
                        toast.success(data.message)
                        setShow(false);
                        getEquipes();
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
            <Modal className='zindex' size="xl" show={show} onHide={handleClose}>
                <Modal.Body >
                    <Box m="20px" >
                        <Header title="Criar Equipe" subtitle="Você está uma nova Equipe." />
                        <Row>
                            <Col xs lg="9">
                                <div className='fundo'>
                                    <Row className="mb-3">
                                        <Col xs lg="6">
                                            <Form.Group as={Col} >
                                                <Form.Label>Nome da Equipe</Form.Label>
                                                <Form.Control maxLength={45} value={nome} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="Nome" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" size="sm" onClick={handleCreate}>
                        Criar Equipe
                    </Button>
                    <Button variant="outline-success" size="sm" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            : ''
    )
}

export default AddEquipe;