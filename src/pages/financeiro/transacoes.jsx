import {
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import AllStatBox from "./allstatbox";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { React, useEffect, useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from 'react-bootstrap/Button';
import "./style.css"
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';
import AddReceita from "./addreceita";
import { toast, ToastContainer } from "react-toastify";
import AddDespesa from "./adddespesa";
import ChangeReceita from "./changereceita";
import ChangeDespesa from "./changedespesa";
import ConfirmarReceita from "./confirmarreceita";
import ConfirmarDespesa from "./confirmardespesa";
import DeletarLancamento from "./deletarlancamento";

const Transacoes = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [transacoes, setTransacoes] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [picker, setNascimento] = useState();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);
    const [show7, setShow7] = useState(false);
    const [onEdit, setOnEdit] = useState([]);
    const [datainicial, setDataInicial] = useState();
    const [datafinal, setDataFinal] = useState();
    let init = '';
    let end = '';
    const [TotalReceitas, setTotalReceitas] = useState(0);
    const [TotalReceitasPrev, setTotalReceitasPrev] = useState(0);
    const [TotalDespesas, setTotalDespesas] = useState(0);
    const [TotalDespesasPrev, setTotalDespesasPrev] = useState(0);
    const [ReceitaxDespesa, setReceitaxDespesa] = useState(0);
    const [ReceitaxDespesaPrev, setReceitaxDespesaPrev] = useState(0);
    const [ClassReceitas, setClassReceitas] = useState();
    const [ClassReceitasPrev, setClassReceitasPrev] = useState();
    const [ClassDespesas, setClassDespesas] = useState();
    const [ClassDespesasPrev, setClassDespesasPrev] = useState();
    const [ClassReceitaxDespesa, setClassReceitaxDespesa] = useState();
    const [ClassReceitaxDespesaPrev, setClassReceitaxDespesaPrev] = useState();
    const columns = [
        {
            field: "icone", headerName: "Ações", renderCell: ({ row: { id } }) => {
                return <> < ModeEditIcon className="pointer edit" onClick={() => handleEdit(transacoes, id)} /> < CheckCircleIcon className="pointer aprovar" onClick={() => handleApprov(transacoes, id)} />  < DeleteForeverIcon className="pointer lixo" onClick={() => handleDelete(transacoes, id)} /></>;
            }, width: 90
        },
        {
            field: "data",
            headerName: "Data da Transação",
            width: 140,
        },
        { field: "descricao", headerName: "Descrição", width: 340 },
        { field: "nome_pessoa_fornecedor", headerName: "Membro/fornecedor", width: 330 },
        { field: "valor", headerName: "Valor", width: 160 },
        { field: "nome_centro_custo", headerName: "Centro de Custo", width: 215 },
        { field: "nome_plano_contas", headerName: "Finalidade", width: 160 },
        { field: "categoria", headerName: "Categoria", width: 90 },
        { field: "status", headerName: "Status", width: 80 },
    ];
    const getTransacoes = async () => {

        if (init == '' || end == '') {
            const d = new Date();
            init = (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + '01')
            end = (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()));
            setDataInicial('');
            setDataFinal('');
        }

        try {
            const res = await axios.get(`http://localhost:8800/gettransacoes/` + init + '/' + end);
            setTransacoes(ChangeData(res.data))
        } catch (error) {
            console.log('erro desconhecido');
        }
    }

    useEffect(() => {
        getTransacoes();
    }, [setTransacoes]);

    const handleEdit = (transacoes, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => transacoes.find((row) => row.id === id));
        setOnEdit(selectedRowsData[0]);
        if (selectedRowsData[0].categoria == 'Receita') {
            setShow3(true);
        } else {
            setShow4(true);
        }
    }
    const handleApprov = (transacoes, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => transacoes.find((row) => row.id === id));
        setOnEdit(selectedRowsData[0]);
        if (selectedRowsData[0].categoria == 'Receita') {
            setShow5(true);
        } else {
            setShow6(true);
        }
    }
    const handleDelete = (transacoes, id) => {
        console.log('deletar');
        const id2 = [id];
        const selectedRowsData = id2.map((id) => transacoes.find((row) => row.id === id));
        setOnEdit(selectedRowsData[0]);
        setShow7(true);
    }
    const { RangePicker } = DatePicker;
    const dateFormat = 'DD/MM/YYYY';
    const rangePresets = [
        {
            label: 'Ultimos 7 dias',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Ultimos 14 dias',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Ultimo mês',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Ultimos 90 dias',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];
    const ChangeData = (data) => {
        let somareceitas = 0;
        let somareceitasprev = 0;
        let somadespesas = 0;
        let somadespesasprev = 0;
        for (var linha of data) {

            if (linha.data) {
                const newdate = new Date(linha.data);
                // const dia = (newdate.getDate() + 1) < 10 ? `0${(newdate.getDate() + 1)}` : (newdate.getDate() + 1);;
                const dia = (newdate.getUTCDate()) < 10 ? `0${(newdate.getUTCDate())}` : (newdate.getUTCDate());;
                // const mes = (newdate.getMonth() + 1) < 10 ? `0${(newdate.getMonth() + 1)}` : (newdate.getMonth() + 1);
                const mes = (newdate.getUTCMonth() + 1) < 10 ? `0${(newdate.getUTCMonth() + 1)}` : (newdate.getUTCMonth() + 1);
                const ano = newdate.getUTCFullYear();
                const formatDate = dia + '/' + mes + '/' + ano;
                Object.defineProperty(linha, 'data', {
                    value: formatDate,
                })
            }

            if (linha.categoria == 'Receita' && linha.status == 'Pago') {
                somareceitas = somareceitas + linha.valor;
            } else if (linha.categoria == 'Despesa' && linha.status == 'Pago') {
                somadespesas = somadespesas + linha.valor;
            }

            if (linha.categoria == 'Receita') {
                somareceitasprev = somareceitasprev + linha.valor;
            } else if (linha.categoria == 'Despesa') {
                somadespesasprev = somadespesasprev + linha.valor;
            }

            if (linha.valor) {
                Object.defineProperty(linha, 'valor2', {
                    value: linha.valor
                })
                Object.defineProperty(linha, 'valor', {
                    value: (linha.valor ? linha.valor : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                })
            } else {
                Object.defineProperty(linha, 'valor2', {
                    value: 0
                })
                Object.defineProperty(linha, 'valor', {
                    value: (linha.valor ? linha.valor : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                })
            }
        }

        setTotalReceitas(somareceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        setClassReceitas(somareceitas < 0 ? 'vermelho' : 'verde');

        setTotalReceitasPrev(somareceitasprev.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        setClassReceitasPrev(somareceitasprev < 0 ? 'vermelho' : 'verde');

        setTotalDespesas(somadespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        setClassDespesas('vermelho');

        setTotalDespesasPrev(somadespesasprev.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        setClassDespesasPrev('vermelho');

        setReceitaxDespesa((somareceitas - somadespesas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        setClassReceitaxDespesa(somareceitas - somadespesas < 0 ? 'vermelho' : 'verde');

        setReceitaxDespesaPrev((somareceitasprev - somadespesasprev).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        setClassReceitaxDespesaPrev(somareceitasprev - somadespesasprev < 0 ? 'vermelho' : 'verde');

        return (
            data
        );
    };
    const handleReceita = () => {
        setShow(true);
    }
    const handleDespesa = () => {
        setShow2(true);
    }
    const handleTransfer = () => {

    }

    return (
        <Box m="20px">

            <Box
                display={smScreen ? "flex" : "block"}
                flexDirection={smScreen ? "row" : "column"}
                justifyContent={smScreen ? "space-between" : "start"}
                alignItems={smScreen ? "center" : "start"}
                m="10px 0"
            >
                <Header title="Transações" subtitle="Painel de Gerenciamento de transações" />
            </Box>

            <AllStatBox TotalReceitas={TotalReceitas} TotalDespesas={TotalDespesas} ReceitaxDespesa={ReceitaxDespesa}
                TotalReceitasPrev={TotalReceitasPrev} TotalDespesasPrev={TotalDespesasPrev} ReceitaxDespesaPrev={ReceitaxDespesaPrev}
                ClassReceitas={ClassReceitas} ClassReceitasPrev={ClassReceitasPrev} ClassDespesas={ClassDespesas} ClassDespesasPrev={ClassDespesasPrev}
                ClassReceitaxDespesa={ClassReceitaxDespesa} ClassReceitaxDespesaPrev={ClassReceitaxDespesaPrev}
            />
            <Grid m='20px 0 0 0' p='10px' xs={12} backgroundColor={colors.primary[400]} >
                <Box className="periodo" backgroundColor={colors.primary[400]}  >
                    {/* <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
                        Período
                    </Typography> */}
                    <RangePicker className="picker-margin"
                        value={datainicial && datafinal ? [dayjs((datainicial ? datainicial : ''), dateFormat), dayjs((datafinal ? datafinal : ''), dateFormat)] : ''}
                        locale={locale} format={dateFormat} presets={rangePresets}
                        onChange={(values) => {
                            if (values) {
                                const inicial = moment(values[0].format('YYYY-MM-DD'))
                                const inicial2 = moment(values[0].format('DD-MM-YYYY'))
                                init = inicial._i
                                setDataInicial(`'${inicial2._i}'`);

                                const final = moment(values[1].format('YYYY-MM-DD'))
                                const final2 = moment(values[1].format('DD-MM-YYYY'))
                                end = final._i
                                setDataFinal(`'${final2._i}'`);
                                getTransacoes();
                            } else {
                                setDataInicial('');
                                setDataFinal('');
                                getTransacoes();
                            }
                        }}
                    />
                    {' '}<Button onClick={() => handleReceita()} size="sm" variant="success">Adicionar Receita</Button>{' '}
                    <Button onClick={() => handleDespesa()} size="sm" variant="danger">Adicionar Despesa</Button>{' '}
                    {/* <Button onClick={() => handleTransfer()} className="mb" size="sm" variant="light">Fazer Transferência</Button>{' '} */}
                </Box>
                <Box
                    m="8px 0 0 0"
                    width="100%"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        rows={transacoes}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20]}
                        getCellClassName={(params) => {
                            if (params.field === 'valor' && params.row.categoria == 'Receita') {
                                return 'positivo';
                            } else if (params.field === 'valor' && params.row.categoria == 'Despesa') {
                                return 'negativo';
                            }

                        }}
                    />
                </Box>
            </Grid>
            {show && (
                <AddReceita show={show} setShow={setShow} getTransacoes={getTransacoes} />
            )}
            {show2 && (
                <AddDespesa show2={show2} setShow2={setShow2} getTransacoes={getTransacoes} />
            )}
            {show3 && (
                <ChangeReceita show3={show3} setShow3={setShow3} getTransacoes={getTransacoes} onEdit={onEdit} setOnEdit={setOnEdit} />
            )}
            {show4 && (
                <ChangeDespesa show4={show4} setShow4={setShow4} getTransacoes={getTransacoes} onEdit={onEdit} setOnEdit={setOnEdit} />
            )}
            {show5 && (
                <ConfirmarReceita show5={show5} setShow5={setShow5} getTransacoes={getTransacoes} onEdit={onEdit} setOnEdit={setOnEdit} />
            )}
            {show6 && (
                <ConfirmarDespesa show6={show6} setShow6={setShow6} getTransacoes={getTransacoes} onEdit={onEdit} setOnEdit={setOnEdit} />
            )}
            {show7 && (
                <DeletarLancamento show7={show7} setShow7={setShow7} getTransacoes={getTransacoes} onEdit={onEdit} setOnEdit={setOnEdit} />
            )}
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </Box>
    )
}

export default Transacoes;