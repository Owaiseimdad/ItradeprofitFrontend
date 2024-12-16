import React from 'react'
import { headerTitles } from '../../constants/Table/tableheader'
import './Table.css' // Import the CSS file for styles

const TableHeader: React.FC = () => {
  const headers = headerTitles

  return (
    <thead>
      <tr>
        {headers.map((title, index) => (
          <th key={index} className="table-header">
            {title}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
