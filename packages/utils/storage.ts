interface StorageUtils<T> {
  get(key: string): T | null;
  set(key: string, value: T): void;
  remove(key: string): void;
}

export function localStorageUtils<T>(): StorageUtils<T> {
  return {
    get(key: string): T | null {
      let item = localStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item);
        } catch (error) {
          console.log(error);
        }
      }
      return null;
    },
    set(key: string, value: T) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key: string) {
      localStorage.removeItem(key);
    }
  };
}
