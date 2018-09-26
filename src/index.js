import React from 'react'
import immutagen from 'immutagen'

const compose = context => {
  const value = context.value
  return context.next
    ? React.cloneElement(value, null, values => compose(context.next(values)))
    : value
}

export default Component => {
  const original = Component.prototype.render
  const displayName = `EpitathContainer(${Component.displayName || 'anonymous'})`
  let generator

  if (!original) {
    generator = immutagen(Component)

    return Object.assign(function Epitath(props) {
      return compose(generator(props))
    }, { displayName })
  }

  Component.prototype.render = function() {
    if (!generator) {
      generator = immutagen(original.bind(this))
    }

    return compose(generator(this.props))
  }

  return class EpitathContainer extends React.Component {
    static displayName = displayName

    render() {
      return <Component {...this.props} />
    }
  }
}
