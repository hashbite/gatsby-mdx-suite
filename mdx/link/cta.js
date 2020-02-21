import React from 'react'
import tw from 'twin.macro'

import Link from './link'

export const StyledCTA = tw(
  Link
)`bg-blue-500 hover:bg-blue-700 text-white hover:text-white visited:text-white font-bold py-2 px-4 rounded`

/**
 * Renders a Link styled as a call to action button.
 */
const CTA = (props) => <StyledCTA {...props} />

CTA.propTypes = Link.propTypes
CTA.defaultProps = Link.defaultProps

export default CTA
