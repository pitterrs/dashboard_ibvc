import { Box, useTheme } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { React, useState } from 'react';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./novomembro.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Novomembro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [telefone, setTelefone] = useState("");
    const [genero, setGenero] = useState("");
    const [nascimento, setNascimento] = useState();
    const [civil, setCivil] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [admissao, setAdmissao] = useState("");
    const [obs_admissao, setObsAdmissao] = useState("");
    const [situacao, setSituacao] = useState("");
    const [conversao, setConversao] = useState();
    const [batismo, setBatismo] = useState();
    const [chamado, setChamado] = useState("");
    const [outrasinfos, setOutrasInfos] = useState("");

    const handleCreate = async (e) => {

        console.log(civil);

        if (!nome) { return toast.warn("Campo 'Nome' é obrigatório"); }

        await axios
            .post("http://localhost:8800/addmembro", {
                nome: nome,
                email: email,
                celular: celular,
                telefone: telefone,
                genero: genero,
                nascimento: nascimento,
                civil: civil,
                cep: cep,
                endereco: endereco,
                numero: numero,
                complemento: complemento,
                admissao: admissao,
                obs_admissao: obs_admissao,
                situacao: situacao,
                conversao: conversao,
                batismo: batismo,
                chamado: chamado,
                outrasinfos: outrasinfos
            })
            .then(
                ({ data }) => {
                    if (data.code) {
                        toast.error('Erro ao adicionar registro no BD. Entre em contato com o administrador')
                    } else {
                        toast.success(data)
                        setNome('')
                        setEmail('')
                        setCelular('')
                        setTelefone('')
                        setGenero('')
                        setNascimento()
                        setCivil('')
                        setCep('')
                        setEndereco('')
                        setNumero('')
                        setComplemento('')
                        setAdmissao('')
                        setObsAdmissao('')
                        setSituacao('')
                        setConversao()
                        setBatismo()
                        setChamado('')
                        setOutrasInfos('')
                    }
                }
            )
            .catch(({ data }) => toast.error(data));
    }

    return (
        // <React.Fragment>
        <Box m="20px" >
            <Header title="Novo Membro" subtitle="Você está cadastrando um novo membro" />
            <Row>
                <Col xs lg="5">
                    <div className="fundo">
                        <h4>Informações Pessoais</h4>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Nome</Form.Label>
                                <Form.Control required value={nome} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="Nome completo" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} size="sm" type="email" placeholder="email" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Celular</Form.Label>
                                <Form.Control value={celular} onChange={(e) => setCelular(e.target.value)} size="sm" type="text" placeholder="2299999-9999" />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control value={telefone} onChange={(e) => setTelefone(e.target.value)} size="sm" type="text" placeholder="223050-3050" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Label>Genero</Form.Label>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3" onChange={(e) => setGenero(e.target.value)}>
                                    <Form.Check
                                        inline
                                        label="Masculino"
                                        name="genero"
                                        type={type}
                                        id="masculino"
                                        value='Masculino'
                                    />
                                    <Form.Check
                                        inline
                                        label="Feminino"
                                        name="genero"
                                        type={type}
                                        id="feminino"
                                        value='Feminino'
                                    />
                                </div>
                            ))}
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control value={nascimento} onChange={(e) => setNascimento(e.target.value)} size="sm" type="date" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <div>
                                <Form.Label>Estado Civil</Form.Label>
                                <Form.Select size="sm" aria-label="Default select example" onChange={(e) => setCivil(e.target.value)}>
                                    <option>Selecionar</option>
                                    <option value="Solteiro(a)">Solteiro(a)</option>
                                    <option value="Casado(a)">Casado(a)</option>
                                    <option value="Viúvo(a)">Viúvo(a)</option>
                                    <option value="Divorciado(a)">Divorciado(a)</option>
                                </Form.Select>
                            </div>
                        </Row>
                    </div>
                </Col>

                <Col xs lg="5" md={{ span: 4, offset: 0 }}>
                    <div className="fundo">
                        <h4>Localização</h4>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="zip-code">
                                <Form.Label>CEP</Form.Label>
                                <Form.Control value={cep} onChange={(e) => setCep(e.target.value)} size="sm" type="text" placeholder="CEP" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control value={endereco} onChange={(e) => setEndereco(e.target.value)} size="sm" type="text" placeholder="Endereço" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Número</Form.Label>
                                <Form.Control value={numero} onChange={(e) => setNumero(e.target.value)} size="sm" type="text" placeholder="Número" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control value={complemento} onChange={(e) => setComplemento(e.target.value)} size="sm" type="text" placeholder="Complemento" />
                            </Form.Group>
                        </Row>
                    </div>
                    <div className="fundo">
                        <h4>Informações Eclesiásticas</h4>
                        <Row className="mb-4">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Tipo de Admissão</Form.Label>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-1" onChange={(e) => setAdmissao(e.target.value)}>
                                        <Form.Check
                                            inline
                                            label="Batismo"
                                            name="admissao"
                                            type={type}
                                            id="batismo"
                                            value="Batismo"
                                        />
                                        <Form.Check
                                            inline
                                            label="Transferência"
                                            name="admissao"
                                            type={type}
                                            id="transfer"
                                            value="Transferência"
                                        />
                                        <Form.Check
                                            inline
                                            label="Outro"
                                            name="admissao"
                                            type={type}
                                            id="outro"
                                            value="Outro"
                                        />
                                    </div>
                                ))}
                                <Form.Label>Observação:</Form.Label>
                                <Form.Control value={obs_admissao} onChange={(e) => setObsAdmissao(e.target.value)} size="sm" as="textarea" type="textarea" placeholder="Observação" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Situação na Igreja</Form.Label>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3" onChange={(e) => setSituacao(e.target.value)}>
                                        <Form.Check
                                            inline
                                            label="Membro Ativo"
                                            name="situacao"
                                            type={type}
                                            id="membro"
                                            value="Membro Ativo"
                                        />
                                        <Form.Check
                                            inline
                                            label="Membro Inativo"
                                            name="situacao"
                                            type={type}
                                            id="membroinativo"
                                            value="Membro Inativo"
                                        />
                                        <Form.Check
                                            inline
                                            label="Afastado"
                                            name="situacao"
                                            type={type}
                                            id="afastado"
                                            value="Afastado"
                                        />
                                    </div>
                                ))}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Data de Conversão</Form.Label>
                                <Form.Control value={conversao} onChange={(e) => setConversao(e.target.value)} size="sm" type="date" placeholder="dd/mm/aaaa" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Data de Batismo</Form.Label>
                                <Form.Control value={batismo} onChange={(e) => setBatismo(e.target.value)} size="sm" type="date" placeholder="dd/mm/aaaa" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Chamado Ministerial</Form.Label>
                                <Form.Control value={chamado} onChange={(e) => setChamado(e.target.value)} size="sm" type="text" placeholder="Chamado" />
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
                                <Button variant="secondary" onClick={handleCreate} >Cadastrar Membro</Button>
                            </Col>
                        </Row>
                        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
                    </div>
                </Col>
            </Row>
        </Box>
        // </React.Fragment>
    )
}

export default Novomembro;