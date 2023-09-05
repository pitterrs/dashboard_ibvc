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

const AddMembro = ({ show, setShow, equipe, getMembrosEquipe }) => {
    const [id_equipe, setIdEquipe] = useState(equipe.id_equipe);
    const [nome_equipe, setNomeEquipe] = useState(equipe.nome_equipe);
    const [id_membro, setIdMembro] = useState()
    const [nome_membro, setNomeMembro] = useState()
    const [funcao, setFuncao] = useState()
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
            .post("http://localhost:8800/validation", {
                Authorization: token,
                key,
            })
            .then(
                ({ data }) => {
                    if (data.error === false) {
                        console.log('Logado')
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

    const getMembros = async () => {

        try {
            const res = await axios.get(`http://localhost:8800/getmembros`);
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
        setShow(false);
    }

    const handleCreate = async () => {
        // let new_id_equipe = 0;
        if (!nome_membro) { return toast.warn("Preencha o campo 'Nome'"); }

        try {
            const res = await axios.get(`http://localhost:8800/checkmembroequipe/` + id_membro + '/' + id_equipe);
            if (res.data[0].nome_membro); {
                return toast.warn("Membro já faz parte da equipe! Selecione um membro diferente");
            }
        } catch (error) {
            console.log('erro desconhecido');
        }

        await axios
            .post("http://localhost:8800/addmembroequipe", {
                id_equipe: id_equipe,
                nome_equipe: nome_equipe,
                id_membro: id_membro,
                nome_membro: nome_membro,
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
        setShow(false);
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
                                            <Form.Label>Nome da Equipe</Form.Label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                isDisabled={isDisabled}
                                                isLoading={isLoading}
                                                isClearable={isClearable}
                                                isRtl={isRtl}
                                                isSearchable={isSearchable}
                                                defaultValue=''
                                                name="name"
                                                options={membros}
                                                onChange={handleChange}

                                            />
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
                    Adicionar Membro
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddMembro;