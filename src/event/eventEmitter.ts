import { EventEmitter } from "eventemitter3";

export function createEventEmitter() {
  const eventEmitter = new EventEmitter();

  function emitEvent<T>(eventName: string, data: T) {
    eventEmitter.emit(eventName, data);
  }

  function onEvent<T>(
    eventName: string,
    callback: (data: T) => void,
    once?: boolean,
  ) {
    if (once) {
      eventEmitter.once(eventName, callback);
    } else {
      eventEmitter.on(eventName, callback);
    }
  }

  function offEvent<T>(
    eventName: string,
    callback: (data: T) => void,
    once?: boolean,
  ) {
    if (once) {
      eventEmitter.off(eventName, callback, null, true);
    } else {
      eventEmitter.off(eventName, callback);
    }
  }

  function listenerCount(eventName: string) {
    return eventEmitter.listenerCount(eventName);
  }

  return {
    emitEvent,
    onEvent,
    offEvent,
    listenerCount,
  };
}

export const { emitEvent, onEvent, offEvent, listenerCount } =
  createEventEmitter();
