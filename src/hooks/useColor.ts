import { useCallback } from 'react'
import { colorCodes } from '../models'

export const useColor = () => {
  const getRepoLanguageColorCode = useCallback((language: string) => {
    return colorCodes[language] ? colorCodes[language].color : 'grey'
  }, [])

  return { getRepoLanguageColorCode }
}
