import React from 'react'
import { Chart, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register(...registerables)

const TradeChart: React.FC<{ data: number[] }> = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => `Trade ${index + 1}`), // Example labels
    datasets: [
      {
        label: 'P&L',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  }

  return <Line data={chartData} />
}

export default TradeChart
