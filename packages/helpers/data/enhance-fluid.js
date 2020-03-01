/**
 * Returns fluid data with replaced embedded preview if SQIP data is available
 */
function enhanceFluid(data) {
  if (data.sqip) {
    return {
      ...data.fluid,
      base64: data.sqip.base64,
    }
  }
  return data.fluid
}

export default enhanceFluid
