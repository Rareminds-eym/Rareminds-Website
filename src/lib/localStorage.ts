/**
 * Safe localStorage access utility
 * Handles cases where localStorage is not available due to browser restrictions
 */

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Safe getItem wrapper
export const safeGetItem = (key: string): string | null => {
  if (!isLocalStorageAvailable()) {
    return null;
  }
  
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    console.warn(`Error reading from localStorage for key "${key}":`, e);
    return null;
  }
};

// Safe setItem wrapper
export const safeSetItem = (key: string, value: string): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`Error writing to localStorage for key "${key}":`, e);
  }
};

// Safe removeItem wrapper
export const safeRemoveItem = (key: string): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.warn(`Error removing from localStorage for key "${key}":`, e);
  }
};

// Safe clear wrapper
export const safeClear = (): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  try {
    window.localStorage.clear();
  } catch (e) {
    console.warn('Error clearing localStorage:', e);
  }
};