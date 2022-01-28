// Autobind decorator
export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const oryginalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = oryginalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
