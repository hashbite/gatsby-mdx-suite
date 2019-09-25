function createPath({ slug, locale = null, prefix = null }) {
  return (
    '/' +
    [locale, prefix, slug === 'index' ? null : slug].filter(Boolean).join('/')
  )
}

module.exports = {
  createPath,
}
