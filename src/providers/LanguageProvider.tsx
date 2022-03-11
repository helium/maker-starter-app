import React, { createContext, ReactNode, useContext } from 'react'
import { useLanguage } from '../utils/i18n'

const initialState = {
  language: 'pt_BR',
  changeLanguage: async () => undefined,
}

const LanguageContext = createContext<ReturnType<typeof useLanguage>>(
  initialState,
)
const { Provider } = LanguageContext

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={useLanguage()}>{children}</Provider>
}

export const useLanguageContext = () => useContext(LanguageContext)

export default LanguageProvider
