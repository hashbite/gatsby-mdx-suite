import React from 'react'
import propTypes from 'prop-types'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import merge from 'lodash/merge'

import MdxSuiteContextProvider from '@gatsby-mdx-suite/contexts/provider'

import minimumConfig from './minimum-config'

export const wrapRootElement = ({ element }, themeConfig) => {
  const { translations, langs, defaultLocale } = merge(
    minimumConfig,
    themeConfig
  )

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
    <MdxSuiteContextProvider themeConfig={themeConfig}>
      {element}
    </MdxSuiteContextProvider>
  )
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
