import React from 'react'
import propTypes from 'prop-types'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import I18nContext from './i18n'

const MdxSuiteContextProvider = ({
  children,
  defaultLocale,
  langs,
  translations,
}) => {
  i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    .init({
      resources: translations,
      whitelist: langs,
      debug: process.env.NODE_ENV === 'development',
      lng: defaultLocale,
      fallbackLng: defaultLocale,
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    })

  return (
    <I18nContext.Provider
      value={{
        i18n,
        langs,
        default: defaultLocale,
        active: defaultLocale,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

MdxSuiteContextProvider.propTypes = {
  children: propTypes.node.isRequired,
  defaultLocale: propTypes.string.isRequired,
  langs: propTypes.array.isRequired,
  translations: propTypes.object.isRequired,
}

export default MdxSuiteContextProvider
