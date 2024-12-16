import {
  calculateOverallPnl,
  calculateProfitFactor,
  calculateRiskToRewardRatio,
  calculateWinPercentage,
} from './tradeutils'

export const metricsConfig = [
  {
    title: 'Net P&L',
    calculate: calculateOverallPnl,
    description:
      'The total profit or loss from trades. \n The trades where buy or sell is zero is excluded',
  },
  {
    title: 'Trade Win Percentage',
    calculate: calculateWinPercentage,
    description: 'Percentage of winning trades out of total trades.',
  },
  {
    title: 'Risk-to-Reward Ratio',
    calculate: calculateRiskToRewardRatio,
    description: 'Average reward per unit of risk.',
  },
  {
    title: 'Profit Factor',
    calculate: calculateProfitFactor,
    description: 'Ratio of total profits to total losses.',
  },
]
