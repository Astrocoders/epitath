# renderator

```js
import renderator from 'renderator'
...

const App = renderator(function*() {
  const { loading, data } = yield <Query />;
  const { time } = yield <Time />;

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

[Live demo](http://astrocoders.com/renderator)
[Source of demo](https://github.com/Astrocoders/renderator/blob/master/demo/src/index.js#L42)

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

## Install

```
yarn add renderator
```
or
```
npm install --save renderator
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

And that's exactly what renderator is, it just takes care of the callbacks for you.
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
And with renderator you can even use Formik, Apollo optimistic, React Powerplug and Smalldots tooling and etc!

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
