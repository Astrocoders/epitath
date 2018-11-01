# epita✞h
[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors)

<p align="center">
  <i>In memoriam HOCs and Render Props</i>
</p>

### [Read the article](https://medium.com/p/9f76dd911f9e)

```js
import epitath from 'epitath'
...

const App = epitath(function*() {
  const { loading, data } = yield <Query />
  const { time } = yield <Time />

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
  )
})
```

[![npm package][npm-badge]][npm]

Compose HOCs imperatively like async/await. No callback hell!

[Live demo](http://astrocoders.com/epitath)
[Source of demo](https://github.com/Astrocoders/epitath/blob/master/demo/src/index.js#L42)

[npm-badge]: https://img.shields.io/npm/v/npm-package.svg?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

## Install

```
yarn add epitath
```
or
```
npm install --save epitath
```

## Why
Render props are amazing for providing more functionality but once you need to stack a bunch of them you get what recalls a painful callback hell.

```jsx
<Query>
  {({ data }) =>
    <Mutation>
      {({ mutate, result })=>
        <Form>
        etc
        </Form>
      }
    </Mutation>
  }
</Query>
```

## How

Wait, we just mentioned "callback hell". So what if we had a function that would allow us to have a kind of sugar for continuation-passing-style à la async/await?

And that's exactly what epitath is, it just takes care of the callbacks for you.
The whole code is this:

```js
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
```

**Note that** epitath will only yield the first argument of the render function. In order to consume multiple arguments, we recommend creating a wrapper component:

```js
const MutationWrapper = ({ children, ...props }) =>
  <Mutation {...props}>{(mutate, result) => children({ mutate, result })}</Mutation>

const { mutate, result } = yield <MutationWrapper />
```

## How is this different from Suspense?

Suspense only allows you to evalulate a promise once. It does not allow you to trigger a re-render for a state update.
And with epitath you can even use Formik, Apollo optimistic, React Powerplug and Smalldots tooling and etc!

## BTW it's epitaph not "epitath"

"These Astrocoders dudes simply don't know how to spell words in English!" 

Actually it was intended, for 2 reasons:

1. We wanted to put a cross as icon of the package
2. Epitaph is already taken in NPM


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

### Acknowledgements 

Thanks @jamiebuilds for the [suggestions](https://github.com/Astrocoders/epitath/issues/1) on how simplifying the API

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/952783?v=4" width="100px;"/><br /><sub><b>Jamie</b></sub>](https://jamie.build/)<br />[🤔](#ideas-jamiebuilds "Ideas, Planning, & Feedback") [💻](https://github.com/Astrocoders/epitath/commits?author=jamiebuilds "Code") | [<img src="https://avatars0.githubusercontent.com/u/285899?v=4" width="100px;"/><br /><sub><b>Eli Perelman</b></sub>](http://eliperelman.com)<br />[🤔](#ideas-eliperelman "Ideas, Planning, & Feedback") [💻](https://github.com/Astrocoders/epitath/commits?author=eliperelman "Code") | [<img src="https://avatars0.githubusercontent.com/u/1283200?v=4" width="100px;"/><br /><sub><b>Gabriel Rubens</b></sub>](https://medium.com/@_gabrielrubens)<br />[🤔](#ideas-grsabreu "Ideas, Planning, & Feedback") [💻](https://github.com/Astrocoders/epitath/commits?author=grsabreu "Code") | [<img src="https://avatars0.githubusercontent.com/u/17956325?v=4" width="100px;"/><br /><sub><b>Medson Oliveira</b></sub>](https://github.com/medson10)<br />[🤔](#ideas-medson10 "Ideas, Planning, & Feedback") [💻](https://github.com/Astrocoders/epitath/commits?author=medson10 "Code") | [<img src="https://avatars0.githubusercontent.com/u/16995184?v=4" width="100px;"/><br /><sub><b>George Lima</b></sub>](https://github.com/georgelima)<br />[🤔](#ideas-georgelima "Ideas, Planning, & Feedback") [💻](https://github.com/Astrocoders/epitath/commits?author=georgelima "Code") | [<img src="https://avatars0.githubusercontent.com/u/8146889?v=4" width="100px;"/><br /><sub><b>Eliabe Júnior</b></sub>](http://eliabejr.com)<br />[💻](https://github.com/Astrocoders/epitath/commits?author=eliabejr "Code") [🎨](#design-eliabejr "Design") | [<img src="https://avatars3.githubusercontent.com/u/4806269?v=4" width="100px;"/><br /><sub><b>Guilherme Decampo</b></sub>](https://astrocoders.com)<br />[🤔](#ideas-guilhermedecampo "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars0.githubusercontent.com/u/8618687?v=4" width="100px;"/><br /><sub><b>gtkatakura</b></sub>](https://github.com/gtkatakura)<br />[🤔](#ideas-gtkatakura "Ideas, Planning, & Feedback") [💬](#question-gtkatakura "Answering Questions") [💡](#example-gtkatakura "Examples") | [<img src="https://avatars0.githubusercontent.com/u/4899432?v=4" width="100px;"/><br /><sub><b>Erjan Kalybek</b></sub>](https://mssg.me/emx)<br />[📖](https://github.com/Astrocoders/epitath/commits?author=erjanmx "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/2148168?v=4" width="100px;"/><br /><sub><b>Jack Hanford</b></sub>](http://jackhanford.com/)<br />[📖](https://github.com/Astrocoders/epitath/commits?author=hanford "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/3068563?v=4" width="100px;"/><br /><sub><b>Haz</b></sub>](https://twitter.com/diegohaz)<br />[📖](https://github.com/Astrocoders/epitath/commits?author=diegohaz "Documentation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
