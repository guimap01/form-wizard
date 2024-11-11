import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });
