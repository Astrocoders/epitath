import React from 'react'
import immutagen from 'immutagen'

const compose = ({ next, value }) => next
  ? React.cloneElement(value, null, values => compose(next(values)))
  : value

export default Component => {
  const original = Component.prototype.render
  const displayName = `EpitathContainer(${Component.displayName || 'anonymous'})`

  if (!original) {
    const generator = immutagen(Component)

    return Object.assign(function Epitath(props) {
      return compose(generator(props))
    }, { displayName })
  }

  Component.prototype.render = function render() {
    if (!render.generator) {
      render.generator = immutagen(original.bind(this))
    }

    return compose(render.generator(this.props))
  }

  return class EpitathContainer extends React.Component {
    static displayName = displayName
    render() {
      return <Component {...this.props} />
    }
  }
}
