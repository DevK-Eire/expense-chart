'use client'
import { useState, useEffect } from 'react';
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
    backgroundColor: any;
    borderColor: any;
    hoverBackgroundColor: any;
    borderWidth: number;
    neutralColor: any;
    barColor : any;
    barHovered : any;
    activeBarColor : any;
    activeBarHovered : any;
    borderRadius: number;
  }[];
};

type DailyAmount = {
  day: string;
  amount: number;
};

type CustomColor = `hsl(${number}, ${number}%, ${number}%)` | `hsla(${number}, ${number}%, ${number}%, ${number})` | `hsla(${number}, ${number}%, ${number}%, ${number}.${number})`;

// Then define your colors
const barColor: CustomColor = 'hsl(10, 79%, 65%)';
const barHovered: CustomColor = 'hsla(10, 79%, 65%, 0.8)';
const activeBarHovered: CustomColor = 'hsla(186, 34%, 60%, 0.8)';
const activeBarColor: CustomColor = 'hsl(186, 34%, 60%)';
const neutralColor: CustomColor = 'hsl(28, 10%, 53%)';


const BarChart:  React.FC = () => {
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
    }) as any; // Type assertion here
    
    const hoverBackgroundColor = labels.map(label => {
      const today = new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
      return label.toLowerCase() === today ? activeBarHovered : barHovered;
    }) as any;

    // Now we can use the variables to set the chart data
    const chartData: ChartData = {
        labels: labels,
        datasets: [
            {
                label: 'Daily Amount',
                data: data.map(d => d.amount),
                backgroundColor: backgroundColor as string[],
                hoverBackgroundColor: hoverBackgroundColor as string[],
                borderColor: 'transparent',
                borderRadius: 5,
                borderWidth: 1,
                neutralColor: neutralColor,
                barColor: barColor,
                barHovered: barHovered,
                activeBarColor: activeBarColor,
                activeBarHovered: activeBarHovered
            },
        ],
    };

    setChartData(chartData);
  }, []);
  

  const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false // Add this to hide the legend
          },
        tooltip: {
          enabled: true,
          backgroundColor: 'black' as 'black', // Corrected to a predefined value
          padding: 10,
          caretSize: 0,
          usePointStyle: true,
          displayColors: false,
          yAlign: 'bottom' as 'bottom', // Corrected to a predefined value
          xAlign: 'center' as 'center', // Corrected to a predefined value
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
            color: neutralColor
          },
          grid: {
            display: false,
            
          },
          border:{
            display:false
          },
          borderColor: 'transparent' // This should remove the axis line if it's still there
        },
        y: { 
            display: false,
            grid: {
                drawBorder: false, // Also remove the y-axis line if it's present
                display: false
              },
              borderColor: 'transparent' // This should remove the axis line if it's still there
         }
      }
  };

  return (
    <>
    
    <div  className='bg-white w-[500px] flex flex-col p-8 rounded-2xl'>     
    <h1 className='font-bold text-2xl mb-8 text-left'>Spending - Last 7 days</h1>
      <Bar  data={chartData} options={chartOptions} />
      <div className="flex-grow border-t border-neutral-cream my-6"></div>
      <div className="flex flex-row items-end justify-between space-y-6">
        <div className="space-y-1">
          <p className="text-neutral-medium-brown text-xs md:text-md">Total this month</p>
          <h2 className="text-xl md:text-4xl font-semibold">
            $478.33
          </h2>
        </div>
        <div className=''>
          <h3 className="font-semibold text-lg text-right">+2.4%</h3>
          <p className="text-neutral-medium-brown text-xs md:text-md">from last month</p>
        </div>
        </div>
      
    </div>

    
    </>
    
  );
};



export default BarChart;
