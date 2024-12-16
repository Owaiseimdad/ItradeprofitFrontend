import React from 'react'
import './Table.css'

// Define the type for values in the data object
interface Values {
  buy: number
  sell: number
  pnl: number
  symbol?: string
}

// Define the type for the data object
interface Data {
  [symbol: string]: Values // Using an index signature to allow any string as a key
}

interface TableBodyProps {
  data: Data // Props containing the data
}

const TableBody: React.FC<TableBodyProps> = ({ data }) => {
  return (
    <tbody>
      {Object.entries(data).map(([symbol, values]) => (
        <tr key={values.symbol}>
          <td>{values.symbol}</td>
          <td>{values.buy}</td>
          <td>{values.sell}</td>
          <td className={values.pnl < 0 ? 'negative' : 'positive'}>
            {values.pnl}
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
