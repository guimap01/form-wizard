export function setItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting localStorage', error);
  }
}

export function getItem(key: string) {
  return localStorage.getItem(key);
}
