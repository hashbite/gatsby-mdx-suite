export function findActiveTrail({ id, subTree }) {
  for (const item of subTree) {
    const linkedPage = item.linkedPage || item.linkedApp
    if (linkedPage && id === linkedPage.cid) {
      return [item.pageId]
    }
    if (item.subitems) {
      const subTreeResult = findActiveTrail({
        id,
        subTree: item.subitems
      })
      if (subTreeResult.length) {
        return [item.pageId, ...subTreeResult]
      }
    }
  }

  return []
}
