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

const AddDespesa = ({ show2, setShow2, getTransacoes }) => {
    const [repetir, setRepetir] = useState();
    const [bancos, setBancos] = useState([]);
    const [custos, setCustos] = useState([]);
    const [planos, setPlanos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [data, setData] = useState();
    const [descricao, setDescricao] = useState();
    const [banco, setBanco] = useState();
    const [idbanco, setIdBanco] = useState();
    const [custo, setCusto] = useState();
    const [idcusto, setIdCusto] = useState();
    const [categoria, setCategoria] = useState('Despesa');
    const [fornecedor, setFornecedor] = useState();
    const [idfornecedor, setIdFornecedor] = useState();
    const [plano, setPlano] = useState();
    const [idplano, setIdPlano] = useState();
    const [pagamento, setPagamento] = useState();
    const [valor, setValor] = useState();
    const [valorformatado, setValorFormatado] = useState();
    const [frequencia, setFrequencia] = useState();
    const [vezes, setVezes] = useState();
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const getBancos = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/getcontas`);
            setBancos(res.data)
        } catch (error) {
            console.log('erro desconhecido');
        }

        try {
            const res = await axios.get(`http://localhost:8800/getcustos`);
            setCustos(res.data)
        } catch (error) {
            console.log('erro desconhecido');
        }

        try {
            const res = await axios.get(`http://localhost:8800/getplanosdespesa`);
            setPlanos(res.data)
        } catch (error) {
            console.log('erro desconhecido');
        }

        try {
            const res = await axios.get(`http://localhost:8800/getfornecedores`);
            setFornecedores(changeData(res.data))
        } catch (error) {
            console.log('erro desconhecido');
        }

    }

    useEffect(() => {
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
        setShow2(false);
    }
    const handleCreate = async () => {

        let lastidr = '';
        let datas = [];
        let dataatual = '';
        // if (!data) { return toast.warn("Preencha o campo 'Nome'"); }
        // if (!descricao) { return toast.warn("Preencha o campo 'Cargo'"); }

        if (repetir == 'repetir') {
            if (vezes == 0 || !vezes) { return toast.warn("Preencha o campo 'Repetir'") }
            if (frequencia == 'Selecione...' || !frequencia) { return toast.warn("Selecione uma opção no campo 'Frequência'.") }

            try {
                const res = await axios.get(`http://localhost:8800/getlastidr`);
                lastidr = res.data[0].idr;
                lastidr = lastidr + 1;
                dataatual = data;
            } catch (error) {
                console.log('erro desconhecido');
            }

            let ano = dataatual.substring(0, 4);
            let mes = dataatual.substring(5, 7);
            let dia = dataatual.substring(8, 10);


            if (frequencia == 'Semanal') {

                function addDays(date, days) {
                    const dateCopy = new Date(date);
                    dateCopy.setDate(date.getDate() + days);
                    return dateCopy;
                }

                for (var i = 1; i <= vezes; i++) {
                    let novadata = '';
                    if (i == 1) {
                        datas.push(dataatual)
                    } else {
                        const newDate = new Date(dataatual);
                        dataatual = addDays(newDate, 7);
                        const day = dataatual.getUTCDate();
                        const month = dataatual.getUTCMonth() + 1;
                        const year = dataatual.getUTCFullYear();
                        novadata = year + '-' + month + '-' + day;
                        datas.push(novadata)
                    }
                }

            } else if (frequencia == 'Quinzenal') {

                function addDays(date, days) {
                    const dateCopy = new Date(date);
                    dateCopy.setDate(date.getDate() + days);
                    return dateCopy;
                }

                for (var i = 1; i <= vezes; i++) {
                    let novadata = '';
                    if (i == 1) {
                        datas.push(dataatual)
                    } else {
                        const newDate = new Date(dataatual);
                        dataatual = addDays(newDate, 15);
                        const day = dataatual.getUTCDate();
                        const month = dataatual.getUTCMonth() + 1;
                        const year = dataatual.getUTCFullYear();
                        novadata = year + '-' + month + '-' + day;
                        datas.push(novadata)
                    }
                }

            } else if (frequencia == 'Mensal') {
                for (var i = 1; i <= vezes; i++) {
                    let novadata = '';
                    if (i == 1) {
                        novadata = ano + '-' + mes + '-' + dia;
                        datas.push(novadata);
                    } else {
                        if (mes < 12) {
                            mes++;
                            const novodia = checkdia(dia, mes, ano);
                            novadata = ano + '-' + mes + '-' + novodia;
                            datas.push(novadata);
                        } else {
                            ano++;
                            mes = '01';
                            novadata = ano + '-' + mes + '-' + dia;
                            datas.push(novadata);
                        }
                    }
                }
            } else if (frequencia == 'Anual') {
                for (var i = 1; i <= vezes; i++) {
                    let novadata = '';
                    if (i == 1) {
                        datas.push(dataatual)
                    } else {
                        const n = i - 1;
                        dataatual = new Date(dataatual)
                        const day = dataatual.getUTCDate();
                        const month = dataatual.getUTCMonth() + 1;
                        const year = dataatual.getUTCFullYear() + n;
                        novadata = year + '-' + month + '-' + day;
                        datas.push(novadata)
                    }
                }
            }
        }
        if (datas.length == 0) {
            await axios
                .post("http://localhost:8800/addtransacao", {
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
                    valor: valorformatado,
                    status: 'Não Pago',
                    idr: lastidr
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
            getTransacoes();
        } else {
            for (var novadata of datas) {
                await axios
                    .post("http://localhost:8800/addtransacao", {
                        data: novadata,
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
                        valor: valorformatado,
                        status: 'Não Pago',
                        idr: lastidr
                    })
                    .then(
                        ({ data }) => {
                            if (data.code) {
                                return toast.error('Erro ao adicionar registro no BD. Entre em contato com o administrador')
                            } else {
                                // toast.success(data)
                            }
                        }
                    )
                    .catch(({ data }) => toast.error(data));
            }
            toast.success('Lançamentos adicionados com sucesso')
            setShow2(false);
            getTransacoes();
        }
    };

    const checkdia = (dia, mes, ano) => {

        const ultimodia = (new Date(ano, mes, 0).getDate());
        if (dia > ultimodia) {
            dia = ultimodia;
        }
        return (
            dia
        )
    }

    const handleChange = (e) => {
        if (!e) {
            setIdFornecedor('');
            setFornecedor('');
        } else {
            setIdFornecedor(e.id);
            setFornecedor(e.nome);
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
        <Modal size="xl" show={show2} onHide={handleClose}>
            <Modal.Body className='borda4' >
                <Box m="20px" >
                    <Header title="Criar Despesa" subtitle="Você está adicionando uma nova saída." />
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
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control maxLength={45} value={descricao} onChange={(e) => setDescricao(e.target.value)} size="sm" type="text" placeholder="Descrição" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Nome do Banco</Form.Label>
                                        <Form.Select size="sm" aria-label="Default select example" onChange={(e) => fillbanco(e.target.value)}>
                                            <option value="">Selecione...</option>
                                            {
                                                bancos.map(
                                                    (e) => {
                                                        return <option key={e.id} value={e.id}>{e.nome}</option>
                                                    }
                                                )
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label>Centro de Custo</Form.Label>
                                        <Form.Select size="sm" aria-label="Default select example" onChange={(e) => fillcusto(e.target.value)}>
                                            <option value="">Selecione...</option>
                                            {
                                                custos.map(
                                                    (e) => {
                                                        return <option key={e.id} value={e.id}>{e.nome}</option>
                                                    }
                                                )
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Control disabled value='Despesa' size="sm" type="text" placeholder="" />
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
                                            options={fornecedores}
                                            onChange={handleChange}

                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Plano de Contas</Form.Label>
                                        <Form.Select onChange={(e) => fillplano(e.target.value)} size="sm" aria-label="Default select example">
                                            <option value="">Selecione...</option>
                                            {
                                                planos.map(
                                                    (e) => {
                                                        return <option key={e.id} value={e.id}>{e.nome}</option>
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
                                            <Form.Label>valor</Form.Label>
                                            <Form.Control value={valor} onChange={(e) => mascaraMoeda(e.target.value)} size="sm" type="text" placeholder="R$0,00" />
                                        </Form.Group>
                                    </Row>
                                </Col>
                                <Row className="mb-3">
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
                                            <option value="Semanal">Semanal</option>
                                            <option value="Quinzenal">Quinzenal</option>
                                            <option value="Mensal">Mensal</option>
                                            <option value="Anual">Anual</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label>Reptir</Form.Label>
                                        <Form.Control value={vezes} onChange={(e) => setVezes(e.target.value)} size="sm" type="number" placeholder="Número de vezes" />
                                    </Form.Group>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" size="sm" onClick={handleCreate}>
                    Criar Despesa
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddDespesa;