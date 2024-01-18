export function createSetCallbackProxy<T extends object>(
  obj: T,
  setCallback: (t: T, p: string | symbol, value) => any
) {
  const proxy = new Proxy<T>(obj, {
    set(target, p, value) {
      setCallback(target, p, value);
      return Reflect.set(target, p, value);
    },
  });
  return proxy;
}
