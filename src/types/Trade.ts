// src/types/Trade.ts
export interface Trade {
  id: string
  symbol: string
  quantity: number
  price: number
}

export interface Values {
  buy: number
  sell: number
  pnl: number
}

export interface Data {
  [symbol: string]: Values
}

export interface DashboardProps {
  uploadedData: Data | null
  invalidData: Data | null
}
