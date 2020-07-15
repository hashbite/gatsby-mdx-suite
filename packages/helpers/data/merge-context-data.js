import mergeWith from 'lodash/mergeWith'
import omit from 'lodash/omit'

export default function mergeContextData(context, newData) {
  if (newData.pageContext) {
    context.pageContext = newData.pageContext
  }

  if (newData.data) {
    if (!Array.isArray(newData.data)) {
      newData.data = [newData.data]
    }
    newData.data.forEach(
      (dataSet) =>
        (context.data = mergeWith(
          context.data,
          omit(dataSet, 'body'),
          (objValue, srcValue) => {
            if (Array.isArray(objValue)) {
              return objValue.concat(srcValue)
            }
          }
        ))
    )
  }

  return context
}
