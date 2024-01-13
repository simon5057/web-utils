type JSON = {
  [key: string]: any;
};

export function getLocalStorage(key: string) {
  function loadJSON<T extends JSON>(defaultValue?: JSON) {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : defaultValue;
  }
  function saveJSON(value: JSON, merge?: boolean) {
    if (!merge) {
      return localStorage.setItem(key, JSON.stringify(value));
    }
    const _oldValue = loadJSON<JSON>({});
    return localStorage.setItem(
      key,
      JSON.stringify({ ..._oldValue, ...value }),
    );
  }

  return {
    load: () => {
      return localStorage.getItem(key);
    },
    save: (value: string) => {
      return localStorage.setItem(key, value);
    },
    loadJSON,
    saveJSON,
  };
}
