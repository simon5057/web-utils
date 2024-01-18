import { useEffect, useState } from "react";
import { createSetCallbackProxy } from "../proxy";

function createProxyWithListener<T>(key: string, value: T) {
  type LISTENER = (t: T) => any;
  const listeners: Set<LISTENER> = new Set();
  const proxy = createSetCallbackProxy(
    {
      [key]: value,
    },
    (_t, p, value) => {
      if (p === key) {
        listeners.forEach((l) => {
          l(value);
        });
      }
    }
  );

  return {
    setData(data: T) {
      proxy[key] = data;
    },
    getData() {
      return proxy[key] as T;
    },
    addListener(l: LISTENER) {
      listeners.add(l);
    },
    removeListener(l: LISTENER) {
      listeners.delete(l);
    },
  } as const;
}

export default function createCustomState<T>(key: string, initValue: T) {
  const { setData, getData, addListener, removeListener } =
    createProxyWithListener(key, initValue);

  function useCustomState() {
    const [state, setState] = useState<T>(getData());
    useEffect(() => {
      function l(t: T) {
        setState(t);
      }
      addListener(l);
      return () => {
        removeListener(l);
      };
    }, []);
    return state;
  }

  return {
    useCustomState,
    notify(data: T) {
      setData(data);
    },
    getData,
  };
}
