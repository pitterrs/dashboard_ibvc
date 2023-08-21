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
import StatBox from "./box";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AllStatBox from "./allstatbox";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { React, useEffect, useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import "./style.css"

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import dayjs from 'dayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';

import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';

const Transacoes = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [financas, setFinancas] = useState([]);
    const [financa, setFinanca] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [picker, setNascimento] = useState();
    const columns = [
        {
            field: "icone", headerName: "Ações", renderCell: ({ row: { id } }) => {
                return <> < ModeEditIcon className="pointer edit" onClick={() => handleEdit(financas, id)} /> < CheckCircleIcon className="pointer aprovar" onClick={() => handleApprov(financas, id)} />  < DeleteForeverIcon className="pointer lixo" onClick={() => handleDelete(financas, id)} /></>;
            }, width: 100
        },
        {
            field: "nome",
            headerName: "Data da Transação",
            cellClassName: "name-column--cell",
            width: 200,
        },
        { field: "celular", headerName: "Descrição", width: 100 },
        { field: "email", headerName: "Membro/fornecedor", width: 200 },
        { field: "cargo", headerName: "Valor da Transação", width: 250 },
        { field: "Teste", headerName: "Centro de Custo", width: 250 },
        { field: "Teste2", headerName: "Plano de Contas", width: 250 },
    ];
    const getFinancas = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/getfinancas`);
            setFinancas(res.data)
        } catch (error) {
            console.log('erro desconhecido');
        }
    }
    useEffect(() => {
        getFinancas();
    }, [setFinancas]);
    const handleEdit = (financas, id) => {
        console.log('editar');
        const id2 = [id];
        const selectedRowsData = id2.map((id) => financas.find((row) => row.id === id));
        setFinanca(selectedRowsData);
        // setShow(true);
    }
    const handleApprov = (financas, id) => {
        console.log('aprovar');
        const id2 = [id];
        const selectedRowsData = id2.map((id) => financas.find((row) => row.id === id));
        setFinanca(selectedRowsData);
        // setShow(true);
    }
    const handleDelete = (financas, id) => {
        console.log('deletar');
        const id2 = [id];
        const selectedRowsData = id2.map((id) => financas.find((row) => row.id === id));
        setFinanca(selectedRowsData);
        // setShow(true);
        console.log(picker);
    }
    const shortcutsItems = [
        {
            label: 'This Week',
            getValue: () => {
                const today = dayjs();
                return [today.startOf('week'), today.endOf('week')];
            },
        },
        {
            label: 'Last Week',
            getValue: () => {
                const today = dayjs();
                const prevWeek = today.subtract(7, 'day');
                return [prevWeek.startOf('week'), prevWeek.endOf('week')];
            },
        },
        {
            label: 'Last 7 Days',
            getValue: () => {
                const today = dayjs();
                return [today.subtract(7, 'day'), today];
            },
        },
        {
            label: 'Current Month',
            getValue: () => {
                const today = dayjs();
                return [today.startOf('month'), today.endOf('month')];
            },
        },
        {
            label: 'Next Month',
            getValue: () => {
                const today = dayjs();
                const startOfNextMonth = today.endOf('month').add(1, 'day');
                return [startOfNextMonth, startOfNextMonth.endOf('month')];
            },
        },
        { label: 'Reset', getValue: () => [null, null] },
    ];
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

            <AllStatBox />
            <Box className="periodo" backgroundColor={colors.primary[400]}  >
                    <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
                        Alterar período padrão
                    </Typography>
                    <RangePicker locale={locale} format={dateFormat} presets={rangePresets} 
                    onChange={(values) =>{
                        const inicial = moment(values[0].format('DD-MM-YYYY'))
                        console.log(inicial._i)
                        const final = moment(values[1].format('DD-MM-YYYY'))
                        console.log(final._i)
                    }}
                    />
                    {' '}<Button size="sm" variant="success">Adicionar Receita</Button>{' '}
                    <Button size="sm" variant="danger">Adicionar Despesa</Button>{' '}
                    <Button className="mb" size="sm" variant="light">Fazer Transferência</Button>{' '}
                </Box>
            <Box
                m="8px 0 0 0"
                width="100%"
                height="70vh"
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
                    rows={financas}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                />
            </Box>

        </Box>
    )
}

export default Transacoes;