export function findActiveTrail({ id, subTree }) {
  for (const item of subTree) {
    // Found the target
    if (item.internalTargetId === id) {
      return [item.menuItemId]
    }

    // Look deeper
    if (item.subitems) {
      const subTreeResult = findActiveTrail({
        id,
        subTree: item.subitems,
      })
      if (subTreeResult.length) {
        // Target found in subitems, bubble up.
        return [item.menuItemId, ...subTreeResult]
      }
    }
  }

  return []
}
