import React, { useEffect, useMemo } from 'react'
import { css, Global, ThemeProvider } from '@emotion/react'
import MdxSuiteContextProvider from '@gatsby-mdx-suite/contexts/provider'
import { BreakpointProvider } from '@gatsby-mdx-suite/helpers/hooks/use-breakpoint'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { MDXProvider } from '@mdx-js/react'
import { globalStyles } from 'twin.macro'
import { en, de } from 'make-plural/plurals'
import components from './components'

export const ContextProvider = ({ element, config }) => {
  const { cleanConfig, theme } = config

  const i18nReady = useMemo(() => {
    const { defaultLocale, translations } = cleanConfig

    const messages = Object.keys(translations).reduce((locales, locale) => {
      console.log('loading', locale, translations[locale])
      return { ...locales, [locale]: translations[locale] }
    }, {})

    console.log({ messages })

    i18n.load(messages)
    // @todo make dynamic!
    i18n.loadLocaleData({
      'en-US': { plurals: en },
      de: { plurals: de },
    })

    i18n.activate(defaultLocale)

    return true
  }, [cleanConfig])

  console.log({ config, i18n })

  if (!i18nReady) {
    return false
  }

  return (
    <MdxSuiteContextProvider themeConfig={cleanConfig}>
      <ThemeProvider theme={theme}>
        <BreakpointProvider screens={theme.screens}>
          <Global styles={css(globalStyles)} />
          <MDXProvider components={components}>
            <I18nProvider i18n={i18n}>{element}</I18nProvider>
          </MDXProvider>
        </BreakpointProvider>
      </ThemeProvider>
    </MdxSuiteContextProvider>
  )
}
