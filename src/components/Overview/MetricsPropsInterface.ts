export interface MetricsPropsInterface {
  totalInvestments: number
  totalPNL: number
  numberOfTransactions: number
}

export interface MetricCards {
  title: string
  value: number | string
  description: string
}

export interface MetricsProps {
  metrics: MetricCards[]
}
