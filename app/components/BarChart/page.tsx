'use client'
import { useState, useEffect, FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  Title,
  Legend
} from 'chart.js';
import jsonData from '../../../data.json'; // Make sure the path is correct

// Register the required Chart.js components
ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Title, Legend);

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    hoverBackgroundColor: string;
    borderWidth: number;
  }[];
};

type DailyAmount = {
  day: string;
  amount: number;
};

const barColor = 'hsl(10, 79%, 65%)'
const barHovered = 'hsla(10, 79%, 65%, .8)'
const activeBarHovered = 'hsla(186, 34%, 60%, .8)'
const activeBarColor = 'hsl(186, 34%, 60%)'

const BarChart: FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Assuming jsonData is an array of DailyAmount objects
    const data: DailyAmount[] = jsonData;
  
    // Define labels from the data
    const labels = data.map(d => d.day);
  
    // Use labels to map background and hover colors
    const backgroundColor = labels.map(label => {
      const today = new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
      return label.toLowerCase() === today ? activeBarColor : barColor;
    });
  
    const hoverBackgroundColor = labels.map(label => {
      const today = new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
      return label.toLowerCase() === today ? activeBarHovered : barHovered;
    });
  
    // Now we can use the variables to set the chart data
    const chartData: ChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Daily Amount',
          data: data.map(d => d.amount),
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
            borderColor: 'transparent',
          borderWidth: 1,
        },
      ],
    };
  
    setChartData(chartData);
  }, []);
  

  const chartOptions = {
    responsive: true,
    plugins: {
        tooltip: {
          enabled: true,
          backgroundColor: 'black',
          padding: 10,
          caretSize: 0,
          usePointStyle: true,
          displayColors: false,
          yAlign: 'bottom',
          xAlign: 'center',
          position: 'nearest',
          footerMarginTop: 42,
          callbacks: {
            label: function (context) {
              const value = context.parsed.y
              return `$${String(value.toFixed(2))}`
            },
            title: function () {
              return ''
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          ticks: {
            color: 'slategrey'
          },
          grid: {
            display: false
          }
        },
        y: { display: false }
      }
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
