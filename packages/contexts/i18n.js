import { createContext } from 'react'

const I18nContext = createContext({
  langs: ['en'],
  default: 'en',
  active: 'en',
})

export default I18nContext
