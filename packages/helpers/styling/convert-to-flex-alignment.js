/**
 * Simplify configuration of alignment within flex items by translatin:
 * * start, end -> flex-start, flex-end
 * * center -> center
 *
 */
const convertToFlexAlignment = (value) =>
  value && (value === 'center' ? value : `flex-${value}`)

export default convertToFlexAlignment
