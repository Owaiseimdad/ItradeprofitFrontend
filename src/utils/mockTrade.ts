// src/utils/mockTrades.ts

export interface Trade {
  id: number
  symbol: string
  quantity: number
  price: number
  date: Date
}

const generateRandomTrade = (id: number): Trade => {
  const symbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA']
  const symbol = symbols[Math.floor(Math.random() * symbols.length)]
  const quantity = Math.floor(Math.random() * 100) + 1 // Random quantity between 1 and 100
  const price = parseFloat((Math.random() * 1000).toFixed(2)) // Random price between 0 and 1000
  const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random date in the past

  return { id, symbol, quantity, price, date }
}

export const generateMockTrades = (numTrades: number): Trade[] => {
  return Array.from({ length: numTrades }, (_, index) =>
    generateRandomTrade(index + 1),
  )
}

// Example usage
// const mockTrades = generateMockTrades(10);
// console.log(mockTrades);
