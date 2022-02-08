import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function saveValueToLocalStorage<T>(key: string, value: T) {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  return localStorage.setItem(key, JSON.stringify(value));
}

function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storeValue, setStoreValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    saveValueToLocalStorage<T>(key, storeValue);
  }, [key, storeValue]);

  return [storeValue, setStoreValue];
}

export default useLocalStorageState;
