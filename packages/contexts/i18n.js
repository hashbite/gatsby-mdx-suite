import { createContext } from 'react'

const i18nContext = createContext({
  langs: ['en'],
  default: 'en',
  active: 'en',
})

export default i18nContext
