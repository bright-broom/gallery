'use client'

import { useState } from 'react'
import type { SubscribeFormData } from '@/types'

export const useSubscribe = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (data: SubscribeFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // TODO: サブスクリプション処理の実装
      console.log('メールアドレス登録:', data.email)
    } catch (err) {
      setError('サブスクリプションに失敗しました。後でもう一度お試しください。')
      console.error('サブスクリプションエラー:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    handleSubscribe,
  }
}