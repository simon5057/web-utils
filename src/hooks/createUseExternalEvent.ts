import { useEffect, useSyncExternalStore } from "react";
import { emitEvent, listenerCount, offEvent, onEvent } from "../event";

export default function createUseExternalEvent<T>(
  eventName: string,
  clean?: boolean
) {
  let _data: T | undefined = undefined;

  function useExternalEvent(defaultValue?: T) {
    if (defaultValue && _data === undefined) {
      _data = defaultValue;
    }
    useEffect(() => {
      const handler = function (data) {
        _data = data;
      };
      onEvent(eventName, handler);
      return () => {
        offEvent(eventName, handler);
        if (clean && listenerCount(eventName) === 0) {
          _data = undefined;
        }
      };
    }, []);

    return useSyncExternalStore(subscribe, getSnapshot) as T;
  }

  function subscribe(listener: () => void) {
    onEvent(eventName, listener);
    return () => {
      offEvent(eventName, listener);
    };
  }

  function getSnapshot() {
    return _data;
  }

  return {
    useExternalEvent,
    notify(data: T) {
      emitEvent(eventName, data);
    },
    getData() {
      return _data;
    },
  };
}
