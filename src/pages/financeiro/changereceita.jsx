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
import "./style.css"
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

const ChangeReceita = ({ show3, setShow3, getTransacoes, onEdit, setOnEdit }) => {
    const [repetir, setRepetir] = useState();
    const [bancos, setBancos] = useState([]);
    const [custos, setCustos] = useState([]);
    const [planos, setPlanos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [data, setData] = useState(!onEdit.data ? onEdit.data : onEdit.data.substr(6, 4) + '-' + onEdit.data.substr(3, 2) + '-' + onEdit.data.substr(0, 2));
    const [descricao, setDescricao] = useState(onEdit.descricao);
    const [banco, setBanco] = useState(onEdit.nome_banco);
    const [idbanco, setIdBanco] = useState(onEdit.id_banco);
    const [custo, setCusto] = useState(onEdit.nome_centro_custo);
    const [idcusto, setIdCusto] = useState(onEdit.id_centro_custo);
    const [categoria, setCategoria] = useState('Receita');
    const [fornecedor, setFornecedor] = useState(onEdit.nome_pessoa_fornecedor);
    const [idfornecedor, setIdFornecedor] = useState(onEdit.id_pessoa_fornecedor);
    const [plano, setPlano] = useState(onEdit.nome_plano_contas);
    const [idplano, setIdPlano] = useState(onEdit.id_plano_contas);
    const [pagamento, setPagamento] = useState(onEdit.meio_pagamento);
    const [valor, setValor] = useState(onEdit.valor);
    const [valorformatado, setValorFormatado] = useState();
    const [frequencia, setFrequencia] = useState();
    const [vezes, setVezes] = useState();
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [defaultfornecedor, setDefaultFornecedor] = useState([0])
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

    const getBancos = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getcontas`);
            setBancos(res.data)
        } catch (error) {
            console.log('erro desconhecido');
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getcustos`);
            setCustos(res.data)
        } catch (error) {
            console.log('erro desconhecido');
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getplanosreceita`);
            setPlanos(res.data)
        } catch (error) {
            console.log('erro desconhecido');
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getfornecedores`);
            setFornecedores(changeData(res.data))
            const id2 = [onEdit.id_pessoa_fornecedor]
            const selectedRowsData = id2.map((id) => res.data.find((row) => row.id === id));
            setDefaultFornecedor(selectedRowsData[0]);
        } catch (error) {
            console.log('erro desconhecido');
        }

    }

    useEffect(() => {
        validations();
        getBancos();
    }, [setBancos]);

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

    const handleClose = () => {
        setShow3(false);
        setOnEdit(null)
    }
    const handleEdit = async () => {

        if (!data) { return toast.warn("Preencha o campo 'Data de Lançamento'"); }
        if (!descricao) { return toast.warn("Preencha o campo 'Descrição'"); }
        if (!banco) { return toast.warn("Selecione a Origem do Recebimento"); }
        if (!fornecedor) { return toast.warn("Selecione a Pessoa ou Fornecedor"); }
        if (!plano) { return toast.warn("Selecione o Tipo da Receita"); }
        if (!pagamento) { return toast.warn("Selecione o Meio de Pagamento"); }
        if (!valor || valor === 0) { return toast.warn("Digite um valor valido"); }

        let valornovo = valor;
        valornovo = valornovo.replace('R$', '');
        valornovo = valornovo.replaceAll('.', '');
        valornovo = valornovo.replace(',', '.');
        valornovo = valornovo.trim();

        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");
        
        await axios
            .put(`${process.env.REACT_APP_API_URL}changetransacao/` + onEdit.id, {
                data: data,
                descricao: descricao,
                idbanco: idbanco,
                banco: banco,
                idcusto: idcusto,
                custo: custo,
                categoria: categoria,
                idfornecedor: idfornecedor,
                fornecedor: fornecedor,
                idplano: idplano,
                plano: plano,
                pagamento: pagamento,
                valor: valornovo,
                status: 'Não Pago',
                token,
                key
            })
            .then(
                ({ data }) => {
                    if (data.error === true) {
                        toast.error(data.message)
                    } else {
                        toast.success(data.message)
                        setShow3(false);
                        setOnEdit(null)
                        getTransacoes();
                    }
                }
            )
            .catch(error => {
                if (error.response.status === 401) {
                    window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
                }
                if (error.response.status === 500) {
                    toast.error(error.response.data.message);
                }
                if (error.response.status === 403) {
                    window.location.replace(`${process.env.REACT_APP_SITE_URL}unauthorized`);
                }
                window.location.replace(`${process.env.REACT_APP_SITE_URL}error`);
            });
    };

    const handleChange = (e) => {
        if (!e) {
            setIdFornecedor('');
            setFornecedor('');
        } else {
            setIdFornecedor(e.id);
            setFornecedor(e.nome);
            setDefaultFornecedor(e)
        }
    };

    const fillbanco = (id) => {
        const id2 = [id]
        const selectedRowsData = id2.map((id) => bancos.find((row) => row.id == id));
        setIdBanco(id);
        setBanco(selectedRowsData[0].nome);
    }

    const fillcusto = (id) => {
        const id2 = [id]
        const selectedRowsData = id2.map((id) => custos.find((row) => row.id == id));
        setIdCusto(id);
        setCusto(selectedRowsData[0].nome);
    }

    const fillplano = (id) => {
        const id2 = [id]
        const selectedRowsData = id2.map((id) => planos.find((row) => row.id == id));
        setIdPlano(id);
        setPlano(selectedRowsData[0].nome);
    }

    const mascaraMoeda = (event) => {
        const onlyDigits = event
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0")
        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
        setValor(maskCurrency(digitsFloat))
        let valor2 = maskCurrency(digitsFloat)
        valor2 = valor2.replace('R$', '');
        valor2 = valor2.replace('.', '');
        valor2 = valor2.replace(',', '.');
        valor2 = valor2.trim();
        setValorFormatado(valor2)
    }

    function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
    }

    return (
        logado ?
            <Modal size="xl" show={show3} onHide={handleClose}>
                <Modal.Body className='borda3' >
                    <Box m="20px" >
                        <Header title="Criar Receita" subtitle="Você está adicionando uma nova entrada." />
                        <Row>
                            <Col xs lg="9">
                                <div className='fundo'>
                                    <Col xs lg="5">
                                        <Row className="mb-3">
                                            <Form.Group as={Col} >
                                                <Form.Label>Data de Lançamento</Form.Label>
                                                <Form.Control value={data} onChange={(e) => setData(e.target.value)} size="sm" type="date" placeholder="Data de Lançamento" />
                                            </Form.Group>
                                        </Row>
                                    </Col>
                                    <Col xs lg="6">
                                        <Row className="mb-3">
                                            <Form.Group as={Col} >
                                                <Form.Label>Descrição</Form.Label>
                                                <Form.Control maxLength='45' value={descricao} onChange={(e) => setDescricao(e.target.value)} size="sm" type="text" placeholder="Descrição" />
                                            </Form.Group>
                                        </Row>
                                    </Col>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Origem do Recebimento</Form.Label>
                                            <Form.Select size="sm" aria-label="Default select example" onChange={(e) => fillbanco(e.target.value)}>
                                                <option value="">Selecione...</option>
                                                {
                                                    bancos.map(
                                                        (e) => {
                                                            return <option selected={banco == e.nome ? 'true' : ''} key={e.id} value={e.id}>{e.nome}</option>
                                                        }
                                                    )
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                        {/* <Form.Group as={Col} >
                                        <Form.Label>Centro de Custo</Form.Label>
                                        <Form.Select size="sm" aria-label="Default select example" onChange={(e) => fillcusto(e.target.value)}>
                                            <option value="">Selecione...</option>
                                            {
                                                custos.map(
                                                    (e) => {
                                                        return <option selected={custo == e.nome ? 'true' : ''} key={e.id} value={e.id}>{e.nome}</option>
                                                    }
                                                )
                                            }
                                        </Form.Select>
                                    </Form.Group> */}
                                        <Form.Group as={Col} >
                                            <Form.Label>Categoria</Form.Label>
                                            <Form.Control disabled value='Receita' size="sm" type="text" placeholder="" />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Pessoa ou Fornecedor</Form.Label>
                                            {/* <Form.Control value={fornecedor} onChange={(e) => setBanco(e.target.value)} size="sm" type="text" placeholder="Pessoa/Fornecedor" /> */}
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
                                                value={defaultfornecedor}
                                                options={fornecedores}
                                                onChange={handleChange}

                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Tipo de Receita</Form.Label>
                                            <Form.Select onChange={(e) => fillplano(e.target.value)} size="sm" aria-label="Default select example">
                                                <option value="">Selecione...</option>
                                                {
                                                    planos.map(
                                                        (e) => {
                                                            return <option selected={plano == e.nome ? 'true' : ''} key={e.id} value={e.id}>{e.nome}</option>
                                                        }
                                                    )
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label>Meio de Pagamento</Form.Label>
                                            <Form.Select value={pagamento} onChange={(e) => setPagamento(e.target.value)} size="sm" aria-label="Default select example">
                                                <option value="">Selecione...</option>
                                                <option value="Dinheiro">Dinheiro</option>
                                                <option value="PIX">PIX</option>
                                                <option value="Débito">Débito</option>
                                                <option value="Crédito">Crédito</option>
                                                <option value="TED">TED</option>
                                                <option value="DOC">DOC</option>
                                                <option value="Depósito Bancário">Depósito Bancário</option>
                                                <option value="Boleto">Boleto</option>
                                                <option value="Cheque">Cheque</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Col xs lg="3">
                                        <Row className="mb-3">
                                            <Form.Group as={Col} >
                                                <Form.Label>Valor</Form.Label>
                                                <Form.Control value={valor} maxLength={22} onChange={(e) => mascaraMoeda(e.target.value)} size="sm" type="text" placeholder="R$0,00" />
                                            </Form.Group>
                                        </Row>
                                    </Col>
                                    {/* <Row className="mb-3">
                                    <Typography m='0 0 10px 0' variant="h5" fontWeight="600">
                                        Repetir Transação
                                    </Typography>
                                    <Form.Group as={Col} >
                                        <Form.Check inline label="Sem Repetição" name="repetir" type='radio' id="" value='' onChange={(e) => setRepetir(e.target.value)} />
                                        <Form.Check inline label="Repetir" name="repetir" type='radio' id="" value='repetir' onChange={(e) => setRepetir(e.target.value)} />
                                    </Form.Group>
                                </Row>
                                <Row className={repetir == 'repetir' ? 'mb-3' : 'hiden'} >
                                    <Form.Group as={Col} >
                                        <Form.Label>Frequência de Repetição</Form.Label>
                                        <Form.Select value={frequencia} onChange={(e) => setFrequencia(e.target.value)} size="sm" aria-label="Default select example">
                                            <option value="">Selecione...</option>
                                            <option value="dia">Todo dia</option>
                                            <option value="semana">Semanal</option>
                                            <option value="quizena">Quinzenal</option>
                                            <option value="mes">Mensal</option>
                                            <option value="ano">Anual</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label>Reptir</Form.Label>
                                        <Form.Control value={vezes} onChange={(e) => setVezes(e.target.value)} size="sm" type="number" placeholder="Número de vezes" />
                                    </Form.Group>
                                </Row> */}
                                </div>
                            </Col>
                        </Row>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" size="sm" onClick={handleEdit}>
                        Salvar Receita
                    </Button>
                    <Button variant="outline-success" size="sm" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            : ''
    )
}

export default ChangeReceita;