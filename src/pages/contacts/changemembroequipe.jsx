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
import Select from 'react-select';

const ChangeMembroEquipe = ({ show3, setShow3, membro, getMembrosEquipe }) => {
    const [id_equipe, setIdEquipe] = useState(membro.id_equipe);
    const [nome_equipe, setNomeEquipe] = useState(membro.nome_equipe);
    const [id_membro, setIdMembro] = useState(membro.id_membro)
    const [nome_membro, setNomeMembro] = useState(membro.nome_membro)
    const [funcao, setFuncao] = useState(membro.funcao)
    const [membros, setMembros] = useState([]);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

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
                        console.log('Logado')
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

    const getMembros = async () => {

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getmembros`);
            setMembros(changeData(res.data))
        } catch (error) {
            console.log('erro desconhecido');
        }

    }

    const changeData = (data) => {
        for (var linha of data) {
            Object.defineProperty(linha, 'label', {
                value: linha.nome,
            })
        }
        return (
            data
        )
    };

    useEffect(() => {
        validations();
        getMembros();
    }, [setMembros]);

    const handleClose = () => {
        setShow3(false);
    }

    const handleCreate = async () => {

        if (!nome_membro) { return toast.warn("Preencha o campo 'Nome'"); }

        await axios
            .put(`${process.env.REACT_APP_API_URL}changemembroequipe/` + membro.id_membro, {
                funcao: funcao,
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
        setShow3(false);
        getMembrosEquipe();

    }

    const handleChange = (e) => {
        if (!e) {
            setIdMembro('');
            setNomeMembro('');
        } else {
            setIdMembro(e.id);
            setNomeMembro(e.nome);
        }
    };


    return (
        <Modal size="xl" show={show3} onHide={handleClose}>
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
                                            <Form.Control disabled='true' maxLength='45' value={nome_membro} size="sm" type="text" placeholder="Nome" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Col xs lg="3">
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Função</Form.Label>
                                            <Form.Control maxLength='20' value={funcao} onChange={(e) => setFuncao(e.target.value)} size="sm" type="text" placeholder="Função" />
                                        </Form.Group>
                                    </Row>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" size="sm" onClick={handleCreate}>
                    Salvar Alterações
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeMembroEquipe;