function createPath({ slug, locale, prefix = null }) {
  return (
    '/' +
    [locale, prefix, slug === 'index' ? null : slug].filter(Boolean).join('/')
  )
}

function generatePageMap({ pages, pageId }) {
  return pages
    .filter(({ id }) => id === pageId)
    .reduce(
      (map, page) => ({
        ...map,
        [page.locale]: page,
      }),
      {}
    )
}

function getPageWithFallback({ pageMap, locale, defaultLocale }) {
  let page
  // Generate path to translated version
  if (pageMap[locale]) {
    page = pageMap[locale]
  }

  // Fallback to default locale if translation is not available
  if (!page && pageMap[defaultLocale]) {
    page = pageMap[defaultLocale]
  }

  // Fallback if no version with default locale is available
  if (!page && pageMap.length) {
    page = pageMap[Object.keys(pageMap)[0]]
  }

  // Unable to locate any page. This should not happen.
  if (!page) {
    throw new Error(
      `Unable to generate language selector link for ${pageMap[Object.keys(pageMap)[0]].id} with locale ${locale}`
    )
  }

  return page
}

module.exports = { createPath, generatePageMap, getPageWithFallback }
