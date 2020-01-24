function createPath({ slug, locale, pageType, config }) {
  const { localeMap, pageTypeMap } = config

  const pageTypePrefix = pageTypeMap[pageType]
  const localePrefix = localeMap[locale]

  return (
    '/' +
    [localePrefix, pageTypePrefix, slug === 'index' ? null : slug]
      .filter(Boolean)
      .join('/')
  )
}

function generatePageMap({ pages, activePageId }) {
  return pages
    .filter(({ context }) => context && context.pageId === activePageId)
    .reduce(
      (map, page) => ({
        ...map,
        [page.context.locale]: { path: page.path, ...page.context },
      }),
      {}
    )
}

function getPageWithFallback({ pageMap, locale, defaultLocale }) {
  if (!Object.keys(pageMap).length) {
    return null
  }

  let page
  // Lookup path to translated version
  if (pageMap[locale]) {
    page = pageMap[locale]
  }

  // Fallback to default locale if translation is not available
  if (!page && pageMap[defaultLocale]) {
    page = pageMap[defaultLocale]
  }

  // Fallback to first available versio if none with default locale is available
  if (!page && pageMap.length) {
    page = pageMap[Object.keys(pageMap)[0]]
  }

  // Unable to locate any page.
  // Either it is a generic gatsby page or the created page is missing context information.
  if (!page) {
    return null
  }

  return page
}

module.exports = { createPath, generatePageMap, getPageWithFallback }
