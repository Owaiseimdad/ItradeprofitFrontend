// src/components/TotalPnL.tsx
import React from 'react'

interface TotalPnLProps {
  total: number
}

const TotalPnL: React.FC<TotalPnLProps> = ({ total }) => {
  return (
    <h3 className="text-center">
      Total P&L:{' '}
      <span className={total >= 0 ? 'text-success' : 'text-danger'}>
        {total}
      </span>
    </h3>
  )
}

export default TotalPnL
