// The Promise is only be resolved, will not be rejected.
// The data is a tuple([err, data]):
// 1. The first is an error, when success is null
// 2. The second is the data, when fail is null

type AsyncError = any;
export function promise2ErrorFirst<T>(
  promise: Promise<T>
): Promise<[AsyncError, T | null]> {
  return new Promise((resolve) => {
    promise
      .then((res) => resolve([null, res]))
      .catch((err) => resolve([err, null]));
  });
}
