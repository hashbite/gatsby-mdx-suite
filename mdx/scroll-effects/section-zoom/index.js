import loadable from '@loadable/component'

const SectionZoom = loadable(() =>
  import(/* webpackChunkName: "mdx--section-zoom" */ './section-zoom')
)

export default SectionZoom
