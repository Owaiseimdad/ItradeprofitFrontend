import { useEffect, useState } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { Data } from '../types/Trade'
import {
  calculateAverageReward,
  calculateAverageRisk,
  calculateWinPercentage,
  calculateOverallPnl,
  calculateRiskToRewardRatio,
  calculateProfitFactor,
} from '../utils/tradeutils'

const SECRET_KEY = 'your-secret-key'
const INVALID_SECRET_KEY = 'ITRADEPROFIT-836'
const TOTAL_PNL_SECRET_KEY = 'TOTAL_PNL'

const useFileUpload = () => {
  const [data, setData] = useState<Data | null>(null)
  const [validData, setValidData] = useState<Data | null>(null)
  const [invalidData, setInvalidData] = useState<Data | null>(null)
  const [totalPnl, setTotalPnl] = useState<number>(0)
  const [message, setMessage] = useState<string | null>(null)

  const resetData = () => {
    setValidData(null)
    setInvalidData(null)
    setTotalPnl(0)
    setMessage(null)
  }

  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      const user_uuid = localStorage.getItem('user_uuid')
      if (user_uuid) {
        const storedData = localStorage.getItem(`validData_${user_uuid}`)
        const storedInvalidData = localStorage.getItem(
          `invalidData_${user_uuid}`,
        )
        const storedTotalPnl = localStorage.getItem(`totalPnl_${user_uuid}`)

        if (storedData) {
          const decryptedData = decryptData(storedData, SECRET_KEY)
          setValidData(JSON.parse(decryptedData))
        }
        if (storedInvalidData) {
          const decryptedInvalidData = decryptData(
            storedInvalidData,
            INVALID_SECRET_KEY,
          )
          setInvalidData(JSON.parse(decryptedInvalidData))
        }
        if (storedTotalPnl) {
          const decryptedTotalPnl = decryptData(
            storedTotalPnl,
            INVALID_SECRET_KEY,
          )
          setTotalPnl(Number(decryptedTotalPnl))
        }
      }
    }

    loadDataFromLocalStorage()
  }, [])

  const decryptData = (data: string, key: string) => {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
  }

  const handleSubmit = async (file: File | null, userUid: string) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('uid', userUid) // Append user UID

    try {
      const response = await uploadFile(formData)
      handleResponse(response.data, userUid)
    } catch (error) {
      handleError(error)
    }
  }

  const uploadFile = async (formData: FormData) => {
    return await axios.post('http://127.0.0.1:5000/trades/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  const handleResponse = (data: any, userUid: string) => {
    const pnlData: Data = data['P&L']
    const validPnLData: Data = data['P&L_plain']['valid']
    const invalidPnLData: Data = data['P&L_plain']['invalid']

    setData(pnlData)
    setValidData(validPnLData)
    setInvalidData(invalidPnLData)
    setTotalPnl(calculateOverallPnl(validPnLData).value)

    storeDataInLocalStorage(validPnLData, invalidPnLData, userUid)
    calculateAndLogMetrics(validPnLData)

    setMessage('File uploaded successfully!')
    setTimeout(() => setMessage(null), 5000)
  }

  const storeDataInLocalStorage = (
    validData: Data,
    invalidData: Data,
    userUid: string,
  ) => {
    const encryptedValidData = CryptoJS.AES.encrypt(
      JSON.stringify(validData),
      SECRET_KEY,
    ).toString()
    const encryptedInvalidData = CryptoJS.AES.encrypt(
      JSON.stringify(invalidData),
      INVALID_SECRET_KEY,
    ).toString()

    const encryptedTotalPnL = CryptoJS.AES.encrypt(
      JSON.stringify(totalPnl),
      TOTAL_PNL_SECRET_KEY,
    ).toString()

    localStorage.setItem(`validData_${userUid}`, encryptedValidData)
    localStorage.setItem(`invalidData_${userUid}`, encryptedInvalidData)
    localStorage.setItem(`totalPnl_${userUid}`, encryptedTotalPnL)
  }

  const calculateAndLogMetrics = (validPnlData: Data) => {
    const averageReward = calculateAverageReward(validPnlData)
    const averageRisk = calculateAverageRisk(validPnlData)
    const winPercentage = calculateWinPercentage(validPnlData)
    const overallPnl = calculateOverallPnl(validPnlData)
    const riskToRewardRatio = calculateRiskToRewardRatio(validPnlData)
    const profitFactor = calculateProfitFactor(validPnlData)

    console.log('Metrics:', {
      averageReward,
      averageRisk,
      winPercentage,
      overallPnl,
      riskToRewardRatio,
      profitFactor,
    })
  }

  const handleError = (error: any) => {
    console.error('Error uploading file:', error)
    setMessage('Error uploading file. Please try again.')
    setTimeout(() => setMessage(null), 5000)
  }

  return { validData, invalidData, totalPnl, handleSubmit, message, resetData }
}

export default useFileUpload
