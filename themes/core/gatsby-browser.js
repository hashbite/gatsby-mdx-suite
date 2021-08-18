import React from 'react'
import propTypes from 'prop-types'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { remoteLoader } from '@lingui/remote-loader'
import merge from 'deepmerge'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from '@emotion/react'
import { css, Global } from '@emotion/react'
import { globalStyles } from 'twin.macro'
import MdxSuiteContextProvider from '@gatsby-mdx-suite/contexts/provider'
import { BreakpointProvider } from '@gatsby-mdx-suite/helpers/hooks/use-breakpoint'

import tailwindConfigStub from './src/tailwind.default.config'
import minimumConfig from './minimum-config'
import components from './src/components'

export const wrapRootElement = ({ element }, config) => {
  const mergedConfig = merge(minimumConfig, config, {
    arrayMerge: (destinationArray, sourceArray, options) => sourceArray,
  })

  const { defaultLocale, themeConfig } = mergedConfig

  const { translations } = config

  const theme = merge(tailwindConfigStub, themeConfig.theme.extend)

  Object.keys(translations).forEach((locale) => {
    i18n.load(locale, remoteLoader(translations[locale]))
  })

  i18n.activate(defaultLocale)

  delete mergedConfig.translations
  delete mergedConfig.themeConfig
  delete mergedConfig.mediaCollections

  return (
    <I18nProvider i18n={i18n}>
      <MdxSuiteContextProvider themeConfig={mergedConfig}>
        <ThemeProvider theme={theme}>
          <BreakpointProvider screens={theme.screens}>
            <Global styles={css(globalStyles)} />
            <MDXProvider components={components}>{element}</MDXProvider>
          </BreakpointProvider>
        </ThemeProvider>
      </MdxSuiteContextProvider>
    </I18nProvider>
  )
}
wrapRootElement.propTypes = {
  element: propTypes.element.isRequired,
}
