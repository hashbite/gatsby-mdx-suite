import React, { useContext } from 'react'
import propTypes from 'prop-types'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import MdxSuiteContext from './mdx-suite'

const MdxSuiteContextProvider = ({ children, themeConfig }) => {
  const MdxSuiteData = useContext(MdxSuiteContext)
  const { translations, langs, defaultLocale } = themeConfig

  i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    .init({
      resources: translations,
      whitelist: langs,
      debug: process.env.NODE_ENV === 'development',
      lng: defaultLocale,
      fallbackLng: defaultLocale,
      load: 'currentOnly',
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    })

  return (
    <MdxSuiteContext.Provider
      value={{
        ...MdxSuiteData,
        themeConfig,
      }}
    >
      {children}
    </MdxSuiteContext.Provider>
  )
}

MdxSuiteContextProvider.propTypes = {
  children: propTypes.node.isRequired,
  themeConfig: propTypes.object.isRequired,
}

export default MdxSuiteContextProvider
