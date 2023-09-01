import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockLineData } from "../data/mockData";
import { mockMembros } from "../../data/mockData";
import axios from "axios";

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dataChart, setDataChart] = useState([]);
  const mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dados = mockMembros();
  const chartData = async () => {
    try {
      const d = new Date();
      const init = d.getFullYear() + '-' + '01' + '-' + '01';
      const end = d.getFullYear() + '-' + '12' + '-' + '31';
      const res = await axios.get(`http://localhost:8800/getreceitasano/` + init + '/' + end);
      const res2 = await axios.get(`http://localhost:8800/getdespesasano/` + init + '/' + end);
      const novoarray = [
        {
          id: "Receitas",
          color: "#1ab347",
          data: [
          ]
        },
        {
          id: "Despesas",
          color: "rgb(228, 26, 26)",
          data: [
          ]
        }
      ]

      for (var i = 1; i <= 12; i++) {
        const receitasMes = res.data.filter(filterdata);
        let totalmes = 0;
        const n = i - 1;

        for(var receita of receitasMes){
          totalmes = totalmes + receita.valor;
        }

        novoarray[0].data.push(
          {
            x: mes[n],
            y: totalmes
          }
        )
      }

      for (var i = 1; i <= 12; i++) {
        const despesasMes = res2.data.filter(filterdata);
        let totalmes = 0;
        const n = i - 1;

        for(var despesa of despesasMes){
          totalmes = totalmes + despesa.valor;
        }

        novoarray[1].data.push(
          {
            x: mes[n],
            y: totalmes
          }
        )
      }

      setDataChart(novoarray);


      function filterdata(data) {
        const d = new Date();
        const mes = i;
        const firstday = (d.getUTCFullYear() + '-' + (mes <= 9 ? '0' + mes : mes) + '-' + '01');
        const lastday = (d.getUTCFullYear() + '-' + (mes <= 9 ? '0' + mes : mes) + '-' + (new Date(d.getUTCFullYear(), d.getUTCMonth() + 1, 0).getUTCDate()));
        if (data.data >= firstday && data.data <= lastday)
        return data;
      }

      // setDataChart(dados);
    } catch (error) {
      console.log('erro desconhecido');
    }
  }

  useEffect(() => {
    chartData();
  }, []);

  return (
    <ResponsiveLine
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
          },
        },
      }}
      curve="catmullRom"
      data={dataChart}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-$.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={!isDashboard}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
