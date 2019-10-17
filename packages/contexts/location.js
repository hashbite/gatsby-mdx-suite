import { createContext } from 'react'

const LocationContext = createContext({
  activePageId: null,
  pages: [],
})

export default LocationContext
