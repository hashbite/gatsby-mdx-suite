import React from 'react'
import propTypes from 'prop-types'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import merge from 'deepmerge'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'emotion-theming'

import MdxSuiteContextProvider from '@gatsby-mdx-suite/contexts/provider'
import { BreakpointProvider } from '@gatsby-mdx-suite/helpers/hooks/use-breakpoint'

import tailwindConfigStub from './src/tailwind.default.config'
import minimumConfig from './minimum-config'
import components from './src/components'
import './src/tailwind.css'

export const wrapRootElement = ({ element }, config) => {
  const mergedConfig = merge(minimumConfig, config)

  const { translations, langs, defaultLocale, themeConfig } = mergedConfig

  const theme = merge(tailwindConfigStub, themeConfig.theme.extend)

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

  delete mergedConfig.translations
  delete mergedConfig.themeConfig
  delete mergedConfig.mediaCollections

  return (
    <MdxSuiteContextProvider themeConfig={mergedConfig}>
      <ThemeProvider theme={theme}>
        <BreakpointProvider screens={theme.screens}>
          <MDXProvider components={components}>{element}</MDXProvider>
        </BreakpointProvider>
      </ThemeProvider>
    </MdxSuiteContextProvider>
  )
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
