import React, {Fragment} from 'react'
import {render} from 'react-dom'
import {Formik} from 'formik'

import regenerator from '../../src'

class Query extends React.Component {
  state = {loading: true, data: null}

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        data: {
          user: {id: '000', name: 'Nikolas Tesla', email: 'nikolas@tesla.com'},
        },
      })
    }, 2000)
  }

  render() {
    return this.props.children(this.state)
  }
}

class Time extends React.Component {
  state = {time: new Date()}

  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: new Date(),
      })
    }, 1000)
  }

  render() {
    return this.props.children(this.state)
  }
}

const App = regenerator(function*() {
  const {loading, data} = yield props => <Query {...props} />
  const {time} = yield props => <Time {...props} />

  if (loading) return <h1>Loading</h1>

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = yield props => (
    <Formik
      initialValues={{
        // Use data from other HOCs!
        email: data.user.email,
        password: '',
      }}
      // if the HOC accepts a `render` instead of a `child` function just
      // forward the props.children regenerator gives you and it figures out the rest
      render={props.children}
      validate={values => {
        // same as above, but feel free to move this into a class method now.
        let errors = {}
        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
        return errors
      }}
    />
  )

  return (
    <div className="App">
      <h1>{`Hello, ${data.user.name}`}</h1>
      <h2>The time is {time.toLocaleString()}!</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email && <div>{errors.email}</div>}
        <input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {touched.password && errors.password && <div>{errors.password}</div>}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  )
})

render(<App />, document.querySelector('#demo'))
