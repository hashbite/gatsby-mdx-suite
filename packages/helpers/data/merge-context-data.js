import merge from 'deepmerge'

export default function mergeContextData(context, newData) {
  if (newData.pageContext) {
    context.pageContext = newData.pageContext
  }

  if (newData.data) {
    if (!Array.isArray(newData.data)) {
      newData.data = [newData.data]
    }
    newData.data.forEach((dataSet) => {
      const cleanDataSet = Object.assign({}, dataSet)
      delete cleanDataSet.body
      context.data = merge(context.data, cleanDataSet, {})
    })
  }

  return context
}
