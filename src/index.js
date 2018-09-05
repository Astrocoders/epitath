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
