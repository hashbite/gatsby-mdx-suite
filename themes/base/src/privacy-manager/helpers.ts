import { PRIVACY_MANAGER_DATA_STRUCTURE_VERSION } from './config'

/**
 * Quick simple hashing to ensure new privacy integrations always retrigger the privacy manager
 *
 * Based on: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */
function fastSimpleHash(source: string): number {
  let hash = 0
  if (source.length === 0) {
    return hash
  }
  for (var i = 0; i < source.length; i++) {
    var char = source.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash
}

/**
 * Set version and versionHash based on enabled integrations.
 *
 * This avoids silent aggreements by the user to any data processing.
 */
export function enhanceState(defaultState: any, virginState: any) {
  return {
    ...virginState,
    version: PRIVACY_MANAGER_DATA_STRUCTURE_VERSION,
    versionHash: fastSimpleHash(
      JSON.stringify({
        PRIVACY_MANAGER_DATA_STRUCTURE_VERSION,
        settings: defaultState.settings,
      })
    ),
  }
}
