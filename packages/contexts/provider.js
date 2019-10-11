import React from 'react'
import propTypes from 'prop-types'
import i18n from 'i18next'

import { MDXDataProvider } from './mdx-data'
import I18nContext from './i18n'

const MdxSuiteContextProvider = ({ children, defaultLocale, langs }) => {
  i18n.init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: defaultLocale,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: { useSuspense: false },
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
      <MDXDataProvider>{children}</MDXDataProvider>
    </I18nContext.Provider>
  )
}

MdxSuiteContextProvider.propTypes = {
  children: propTypes.node.isRequired,
  defaultLocale: propTypes.string.isRequired,
  langs: propTypes.array.isRequired,
}

export default MdxSuiteContextProvider
