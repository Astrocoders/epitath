# regenerator

```js
import regenerator from '@astrocoders/regenerator'

class Time extends React.Component {
  state = {time: new Date()}

  componentDidMount() {
    // every second!
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

...

const App = regenerator(function*() {
  // Where `yield` you can roughly read `await`, where regenerator is awaiting
  // the `render` work of the component. But with the difference that the component
  // can trigger a re-render.  
  const { loading, data } = yield props => <Query {...props} />;
  // Exactly what you are thinking, time is going to be update every 1 second.
  const { time } = yield props => <Time {...props} />;

  return (
    <div className="App">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <h1>{`Hello, ${data.user.name}`}</h1>
          <h2>The time is {time.toLocaleString()}!</h2>
        </div>
      )}
    </div>
  );
});
```

[![npm package][npm-badge]][npm]

Compose HOCs imperatively like async/await. No callback hell!

[Live demo](http://astrocoders.com/regenerator)
[Source of demo](https://github.com/Astrocoders/regenerator/blob/master/demo/src/index.js#L42)

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

## Install

```
yarn add @astrocoders/regenerator
```
or
```
npm install --save @astrocoders/regenerator
```

## Why
Render props are amazing for providing more functionality but once you need to stack a bunch of them you get what recalls a painful callback hell.

```js
<Query>
  {({ data }) =>
    <Mutation>
      {({ mutate, reuslt })=>
        <Form>
        etc
        </Form>
      }
    </Mutation>
  }
</Query>
```

## How

Wait, we just mentioned "callback hell". So what if we had a function that would allow us to have a kind of sugar for continuation-passing-style? Or async/await feels.

And that's exactly what regenerator is, it just takes care of the callbacks for you.
The whole code is roughly this:

```js
import immutagen from 'immutagen'

export default component => props => {
  const generator = immutagen(component);
  const compose = context => {
    const value = context.value;
    return typeof value === "function"
      ? value({
          ...props,
          children: values => compose(context.next(values))
        })
      : value;
  };

  return compose(generator(props));
};
```

## How is this different from Suspense?

Suspense only allows you to evalulate a promise once. It does not allow you to trigger a re-render for a state update.
And with regenerator you can even use Formik, Apollo optimistic, React Powerplug and Smalldots tooling and etc!

## Contributing

### Steps to get it running

Install the deps
```
yarn install
```

Boot the demo
```
yarn start
```

### Things missing that we would like a little help

- [ ] Tests
- [ ] TypeScript support
