export default (schema, min = 1, max) => {
  max = max || min;
  return Array.from({
    length: faker.random.number({
      min,
      max,
    }),
  }).map(() => {
    const innerGen = (anySchema) =>
      Object.keys(anySchema).reduce((entity, key) => {
        if (typeof anySchema[key] === 'function') {
          entity[key] = anySchema[key]();
          return entity;
        }

        if (
          Object.prototype.toString.call(anySchema[key]) === '[object Object]'
        ) {
          entity[key] = innerGen(anySchema[key]);
          return entity;
        }

        entity[key] = faker.fake(anySchema[key]);
        return entity;
      }, {});

    return innerGen(schema);
  });
};
