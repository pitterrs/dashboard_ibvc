import { Box, useTheme } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from "react-toastify";
import Select from 'react-select';
import axios from "axios";
import { useEffect, useState } from "react";
import "./mensageiras.css";

const AddMensageira = () => {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const [membros, setMembros] = useState([]);
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [funcao, setFuncao] = useState('');
    const [etapa, setEtapa] = useState('');
    const [situacao, setSituacao] = useState('');
    const [outrasinfos, setOutrasInfos] = useState('');
    const [responsavel1, setResponsalve1] = useState('');
    const [resp1email, setResp1email] = useState('');
    const [resp1contato, setResp1contato] = useState('');
    const [responsavel2, setResponsalve2] = useState('');
    const [resp2email, setResp2email] = useState('');
    const [resp2contato, setResp2contato] = useState('');
    const [nascimento, setNascimento] = useState();

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
    };

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

    const handleChange = (e) => {
        if (!e) {
            setId('');
            setNome('');
            setEmail('');
            setCelular('');
            setNascimento();
        } else {
            setId(e.id);
            setNome(e.nome);
            setEmail(e.email);
            setCelular(e.celular);
            setNascimento(e.nascimento)
        }
    };

    const addMensageira = async () => {

        if (!nome) { return toast.warn("Preencha o campo 'Nome'"); }
        // if (!cargo) { return toast.warn("Preencha o campo 'Cargo'"); }

        await axios
            .post("http://localhost:8800/addmensageiras", {
                id: id,
                nome: nome,
                email: email,
                celular, celular,
                funcao: funcao,
                etapa: etapa,
                situacao: situacao,
                nascimento: nascimento,
                outrasinfos: outrasinfos,
                responsavel1: responsavel1,
                resp1email: resp1email,
                resp1contato: resp1contato,
                responsavel2: responsavel2,
                resp2email: resp2email,
                resp2contato: resp2contato
            })
            .then(
                ({ data }) => {
                    if (data.code) {
                        if (data.errno == '1062') {
                            toast.error('Membro já faz parte das Mensaegiras do Rei, selecione um membro diferente.')
                        } else {
                            toast.error('Erro ao adicionar registro no BD. Entre em contato com o administrador')
                        }
                    } else {
                        toast.success(data)
                        setId('')
                        setNome('')
                        setEmail('')
                        setCelular('')
                        // setCargo('')
                    }
                }
            )
            .catch(({ data }) => toast.error(data));
    };

    useEffect(() => {
        validations();
        getMembros();
    }, [setMembros]);

    return (
        <React.Fragment>
            <Box m="20px" >
                <Header title="Adicionar Nova Mensageira" subtitle="Você está cadastrando uma nova Mensageira do Rei" />
                <Row>
                    <Col xs lg="5">
                        <div className="fundo">
                            <h4>Informações Pessoais</h4>
                            <Row className="mb-3">
                                <Form.Group as={Col} >
                                    <Form.Label>Nome da Mensageira</Form.Label>
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
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control value={email} size="sm" type="email" placeholder="email" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control value={celular} size="sm" type="text" placeholder="2299999-9999" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Função</Form.Label>
                                    <Form.Control value={funcao} onChange={(e) => setFuncao(e.target.value)} size="sm" type="text" placeholder="Função" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Etapa</Form.Label>
                                    <Form.Control value={etapa} onChange={(e) => setEtapa(e.target.value)} size="sm" type="text" placeholder="Etapa" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Situaçao</Form.Label>
                                    <Form.Select onChange={(e) => setSituacao(e.target.value)} size="sm" aria-label="Default select example">
                                        <option>Selecionar</option>
                                        <option value="Frequenta">Frequenta</option>
                                        <option value="Média Frequência">Média Frequência</option>
                                        <option value="Baixa Frequência">Baixa Frequência</option>
                                        <option value="Não Frequenta">Não Frequenta</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control value={nascimento} size="sm" type="date" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Outras informações:</Form.Label>
                                    <Form.Control value={outrasinfos} onChange={(e) => setOutrasInfos(e.target.value)} as="textarea" size="sm" type="text" placeholder="" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <Button onClick={addMensageira} variant="secondary">Cadastrar</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col xs lg="5" md={{ span: 4, offset: 0 }}>
                        <div className="fundo">
                            <h4>Informações dos Responsáveis</h4>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Responsável Principal</Form.Label>
                                    <Form.Control value={responsavel1} onChange={(e) => setResponsalve1(e.target.value)} size="sm" type="text" placeholder="Responsável" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email do Responsável Principal</Form.Label>
                                    <Form.Control value={resp1email} onChange={(e) => setResp1email(e.target.value)} size="sm" type="text" placeholder="email" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Contato do Responsável Principal</Form.Label>
                                    <Form.Control value={resp1contato} onChange={(e) => setResp1contato(e.target.value)} size="sm" type="text" placeholder="Celular" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Responsável Secundário</Form.Label>
                                    <Form.Control value={responsavel2} onChange={(e) => setResponsalve2(e.target.value)} size="sm" type="text" placeholder="Secundário" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email do Responsável Secundário</Form.Label>
                                    <Form.Control value={resp2email} onChange={(e) => setResp2email(e.target.value)} size="sm" type="text" placeholder="email" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Contato do Responsável Secundário</Form.Label>
                                    <Form.Control value={resp2contato} onChange={(e) => setResp2contato(e.target.value)} size="sm" type="text" placeholder="Celular" />
                                </Form.Group>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
            </Box>
        </React.Fragment>
    )
}

export default AddMensageira;