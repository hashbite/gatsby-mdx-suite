function createPath({ slug, locale, prefix = null }) {
  return (
    '/' +
    [locale, prefix, slug === 'index' ? null : slug].filter(Boolean).join('/')
  )
}

module.exports = createPath
