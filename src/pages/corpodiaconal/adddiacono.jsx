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
import Select from 'react-select';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./corpodiaconal.css";



const AddDiacono = () => {
    const [membros, setMembros] = useState([]);
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [cargo, setCargo] = useState('');

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
        } else {
            setId(e.id);
            setNome(e.nome);
            setEmail(e.email);
            setCelular(e.celular);
        }
    };

    const addDiacono = async () => {

        if (!nome) { return toast.warn("Preencha o campo 'Nome'"); }
        if (!cargo) { return toast.warn("Preencha o campo 'Cargo'"); }

        await axios
            .post("http://localhost:8800/adddiaconos", {
                id: id,
                nome: nome,
                email: email,
                celular, celular,
                cargo: cargo,
            })
            .then(
                ({ data }) => {
                    if (data.code) {
                        if (data.errno == '1062') {
                            toast.error('Membro já faz parte do Corpo Diaconal, selecione um membro diferente.')
                        } else {
                            toast.error('Erro ao adicionar registro no BD. Entre em contato com o administrador')
                        }
                    } else {
                        toast.success(data)
                        setId('')
                        setNome('')
                        setEmail('')
                        setCelular('')
                        setCargo('')
                    }
                }
            )
            .catch(({ data }) => toast.error(data));
    };

    useEffect(() => {
        getMembros();
    }, [setMembros]);

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    return (
        <React.Fragment>
            <Box m="20px" >
                <Header title="Novo Integrante do Corpo Diaconal" subtitle="Você está cadastrando um novo diacono/diaconisa no Corpo Diaconal." />
                <Row>
                    <Col xs lg="5">
                        <div className="fundo">
                            <h4>Informações Pessoais</h4>
                            <p>Caso algum campo não seja preenchido automaticamente após selecionar o nome, verificar o cadastro de membros.</p>
                            <Row className="mb-3">
                                <Form.Group as={Col} >
                                    <Form.Label>Nome</Form.Label>
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
                                    <Form.Control value={email} disabled size="sm" type="email" placeholder="" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control value={celular} disabled size="sm" type="text" placeholder="" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Cargo</Form.Label>
                                    <Form.Control value={cargo} onChange={(e) => setCargo(e.target.value)} size="sm" type="text" placeholder="Cargo" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <Button onClick={addDiacono} variant="secondary">Cadastrar Integrante</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
            </Box>
        </React.Fragment>
    )
}

export default AddDiacono;