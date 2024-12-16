import { Data } from '../types/Trade'
import { checkTradeDataAvailability } from './checkTradeData'
import { roundValue } from './math_utils'

// Calculate Average Reward
export const calculateAverageReward = (
  data: Data,
): { value: number; excluded: boolean } => {
  const profits = Object.values(data).filter(
    (item) => item.pnl > 0 && item.buy > 0 && item.sell > 0,
  )
  const totalProfits = profits.reduce((sum, item) => sum + item.pnl, 0)
  const excluded = profits.length === 0

  return {
    value: excluded ? 0 : totalProfits / profits.length,
    excluded,
  }
}

// Calculate Average Risk
export const calculateAverageRisk = (
  data: Data,
): { value: number; excluded: boolean } => {
  const losses = Object.values(data).filter(
    (item) => item.pnl < 0 && item.buy > 0 && item.sell > 0,
  )
  const totalLosses = Math.abs(losses.reduce((sum, item) => sum + item.pnl, 0))
  const excluded = losses.length === 0

  return {
    value: excluded ? 0 : totalLosses / losses.length,
    excluded,
  }
}

// Calculate win percentage
export const calculateWinPercentage = (
  data: Data,
): { value: number; excluded: boolean } => {
  const validTrades = Object.values(data).filter(
    (item) => item.buy > 0 && item.sell > 0,
  )
  const winningTrades = validTrades.filter((item) => item.pnl > 0).length
  const totalTrades = validTrades.length

  return {
    value: totalTrades ? (winningTrades / totalTrades) * 100 : 0,
    excluded: totalTrades === 0,
  }
}

// Calculate overall P&L
export const calculateOverallPnl = (
  data: Data,
): { value: number; excluded: boolean } => {
  const pnl = Object.values(data)
    .filter((item) => item.buy > 0 && item.sell > 0)
    .reduce((sum, item) => sum + item.pnl, 0)

  const excluded = Object.values(data).some(
    (item) => item.buy === 0 || item.sell === 0,
  )

  return { value: roundValue(pnl), excluded }
}

// Calculation of Risk-to-Reward ratio
export const calculateRiskToRewardRatio = (
  data: Data,
): { value: number; excluded: boolean; message?: string } => {
  const averageReward = calculateAverageReward(data)
  const averageRisk = calculateAverageRisk(data)

  if (averageReward.excluded || averageRisk.excluded) {
    return {
      value: 0,
      excluded: true,
      message: 'Insufficient data for calculating Risk-to-Reward Ratio.',
    }
  }

  return {
    value: averageRisk.value ? averageReward.value / averageRisk.value : 0,
    excluded: false,
  }
}

// Profit factor
export const calculateProfitFactor = (
  data: Data,
): { value: number; excluded: boolean; message?: string } => {
  const { hasProfits, hasLosses, message } = checkTradeDataAvailability(data)

  if (!hasProfits || !hasLosses) {
    return { value: 0, excluded: true, message }
  }

  const totalProfits = Object.values(data)
    .filter((item) => item.pnl > 0 && item.buy > 0 && item.sell > 0)
    .reduce((sum, item) => sum + item.pnl, 0)

  const totalLosses = Math.abs(
    Object.values(data)
      .filter((item) => item.pnl < 0 && item.buy > 0 && item.sell > 0)
      .reduce((sum, item) => sum + item.pnl, 0),
  )

  return {
    value: totalLosses ? totalProfits / totalLosses : 0,
    excluded: false,
  }
}

export const diffPnL = (data: Data) => {}
