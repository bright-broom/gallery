'use client'

import { useState } from 'react'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      // TODO: 認証ロジックの実装
      console.log('ログイン処理')
    } catch (error) {
      console.error('ログインエラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleLogin,
  }
}