import loadable from '@loadable/component'

const Parallax = loadable(() =>
  import(/* webpackChunkName: "mdx--parallax" */ './parallax')
)

export default Parallax
