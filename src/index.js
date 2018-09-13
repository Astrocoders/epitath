import React from 'react'
import immutagen from 'immutagen'

export default component => {
  const generator = immutagen(component)

  const compose = context => {
    const value = context.value
    return context.next
      ? React.cloneElement(value, null, values => compose(context.next(values)))
      : value
  }

  function Epitath(props) {
    return compose(generator(props))
  }

  Epitath.displayName = `EpitathContainer(${component.displayName || 'anonymous'})`

  return Epitath
}
