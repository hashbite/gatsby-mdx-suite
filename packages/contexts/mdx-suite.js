import { createContext } from 'react'

const MdxSuiteContext = createContext({
  // Theme configuration. Automatically set
  themeConfig: {},
  // Page context data like page id, active locale and so on.
  pageContext: {},
  // MDX component rendering data. You may fill these with your processed asset data.
  data: {},
})

export default MdxSuiteContext
