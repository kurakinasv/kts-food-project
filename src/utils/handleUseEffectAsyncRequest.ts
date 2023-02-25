export function uefCallback<T>(asyncFunc: (...args: T[]) => Promise<void>, ...args: T[]) {
  return () => {
    const controller = new AbortController();

    const getData = async () => {
      await asyncFunc(...args);
    };

    getData();

    return () => {
      controller.abort();
    };
  };
}
