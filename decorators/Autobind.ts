function Autobind(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const orig = descriptor.value;
  return {
    configurable: true,
    enumerable: true,
    get() {
      return orig.bind(this);
    },
  };
}

export default Autobind;
