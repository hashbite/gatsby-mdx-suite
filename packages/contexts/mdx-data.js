import React, { createContext, useReducer, useContext } from 'react'
import propTypes from 'prop-types'

const MDXDataStateContext = createContext()
const MDXDataDispatchContext = createContext()

// Map of data arrays which will be available within all MDX components
function MDXDataReducer(state, action) {
  const { id, type, data } = action
  switch (type) {
    case 'add': {
      return { ...state, [id]: [...(state[id] || []), ...data] }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
function MDXDataProvider({ children, defaultState }) {
  const [state, dispatch] = useReducer(MDXDataReducer, defaultState || {})
  return (
    <MDXDataStateContext.Provider value={state}>
      <MDXDataDispatchContext.Provider value={dispatch}>
        {children}
      </MDXDataDispatchContext.Provider>
    </MDXDataStateContext.Provider>
  )
}
MDXDataProvider.propTypes = {
  children: propTypes.node.isRequired,
  defaultState: propTypes.object,
}

function useMDXDataState() {
  const stateContext = useContext(MDXDataStateContext)
  if (stateContext === undefined) {
    throw new Error('useMDXDataState must be used within a MDXDataProvider')
  }
  return stateContext
}

function useMDXDataDispatch() {
  const dispatchContext = useContext(MDXDataDispatchContext)
  if (dispatchContext === undefined) {
    throw new Error('useMDXDataDispatch must be used within a MDXDataProvider')
  }
  return dispatchContext
}

export { MDXDataProvider, useMDXDataState, useMDXDataDispatch }
