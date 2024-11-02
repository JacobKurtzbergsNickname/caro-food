declare const localStorage: Storage;

export const toLS = <T>(key: string, items: Array<T>): Array<T> => {
  const local = localStorage.getItem(key);
  const parsed: Array<T> = local ? JSON.parse(local) : [];
  const newItems: Array<T> = [...parsed, ...items];
  localStorage.setItem(key, JSON.stringify(newItems));
  return newItems;
};

export const fromLS = <T>(key: string): Array<T> => {
  const local = localStorage.getItem(key);
  return local ? JSON.parse(local) : [];
};
