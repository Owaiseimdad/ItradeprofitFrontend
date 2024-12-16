import React, { useState } from 'react'
import Metrics from '../components/Overview/Metrics'
import TableHeader from '../components/Table/TableHeader'
import { DashboardProps, Values } from '../types/Trade'
import TableBody from '../components/Table/TableBody'
import { calculateMetrics } from '../utils/calculateMetrics'
import CategoryDropdown from '../components/Dashboard/Category'
import TradeChart from '../components/Dashboard/TradeChart'
import '../views/Dashboard.css'

const Dashboard: React.FC<DashboardProps> = ({ uploadedData, invalidData }) => {
  const [selectedOption, setSelectedOption] = useState('Overall')

  // Calculate metrics based on uploaded data
  const calculatedMetrics = calculateMetrics(uploadedData)

  // Extract trade values using the defined type
  const tradeValues = uploadedData
    ? Object.values(uploadedData).map((trade: Values) => trade.pnl) // Use pnl values
    : []

  return (
    <div className="container">
      <div className="page-dashboard-header">
        <h3 className="page-title">Dashboard</h3>
        <CategoryDropdown
          selectedOption={selectedOption}
          onChange={setSelectedOption}
        />
      </div>
      <div className="metrics-section">
        <Metrics metrics={calculatedMetrics} />
      </div>
      <div className="chart-table-section">
        <div className="chart-section">
          <div className="chart-label">
            <h3>P&L Chart</h3>
          </div>
          <TradeChart data={tradeValues} />
        </div>
        {uploadedData && (
          <div className="table-container">
            <h3 className="table-title">Trade Data</h3>
            <table>
              <TableHeader />
              <TableBody data={uploadedData} />
            </table>
          </div>
        )}
      </div>
      {invalidData && (
        <div className="invalid-data-section">
          <h3 className="table-title">Invalid Trade Data</h3>
          <table>
            <TableHeader />
            <TableBody data={invalidData} />
          </table>
        </div>
      )}
    </div>
  )
}

export default Dashboard
