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
    // Since we are calling a new function to be called from here instead of
    // from a component class, we need to ensure that the render method is
    // invoked against `this`. We only need to do this binding and creation of
    // this function once, so we cache it by adding it as a property to this
    // new render method which avoids keeping the generator outside of this
    // method's scope.
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
