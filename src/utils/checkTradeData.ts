import { Data } from '../types/Trade'

export const checkTradeDataAvailability = (
  data: Data,
): { hasProfits: boolean; hasLosses: boolean; message?: string } => {
  const profits = Object.values(data).filter((item) => item.pnl > 0)
  const losses = Object.values(data).filter((item) => item.pnl < 0)

  if (profits.length === 0 && losses.length === 0) {
    return {
      hasProfits: false,
      hasLosses: false,
      message: 'Both profit and loss data are missing.',
    }
  }

  if (profits.length === 0) {
    return {
      hasProfits: false,
      hasLosses: true,
      message:
        'No profit trades found; Risk-to-Reward Ratio metric is excluded.',
    }
  }

  if (losses.length === 0) {
    return {
      hasProfits: true,
      hasLosses: false,
      message: 'No loss trades found; Profit Factor metric is excluded.',
    }
  }

  return {
    hasProfits: true,
    hasLosses: true,
  }
}
