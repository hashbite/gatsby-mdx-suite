import { useContext } from 'react'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'

export default function useImageDataFromContext({ id, contextKey }) {
  const {
    data,
    pageContext,
    themeConfig: { defaultLocale },
  } = useContext(MdxSuiteContext)

  const { locale: activeLocale } = pageContext

  if (!id) {
    return null
  }

  // Locate image data from context if id is passed
  if (!data[contextKey]) {
    throw new Error(
      `The media context "${contextKey}" does not exist or does not contain any data.`
    )
  }

  const images = data[contextKey].filter(Boolean)
  if (!images) {
    throw new Error(`No images available in context "${contextKey}"`)
  }

  // Get all available image data in all locales
  const matches = images.filter((asset) => asset.assetId === id)

  // Get data from active locale
  let imageData = matches.find(({ locale }) => locale === activeLocale)

  // Fall back to data with default locale
  if (!imageData) {
    imageData = matches.find(({ locale }) => locale === defaultLocale)
  }

  // Fall back to first available data from any locale
  if (!imageData && matches.length) {
    imageData = matches[0]
  }

  if (!imageData) {
    /**
     * @todo throw error here:
     * figure out how to do multi line error messages via Gatsby OR use our own error catch logic
     * */
    console.warn(
      [
        `--- MDX ASSET ERROR ---`,
        `Unable to locate image rendering data for ${id} for context ${contextKey}`,
        `Page Details:\n ${JSON.stringify(
          { ...pageContext, defaultLocale },
          null,
          2
        )}`,
        `Available Media:\n ${JSON.stringify(data, null, 2)}`,
        `--- MDX ASSET ERROR ---`,
      ].join(`\n\n`)
    )
    return null
  }

  return imageData
}
