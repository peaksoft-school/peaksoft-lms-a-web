export const localStorageHelper = {
   laod(key) {
      const stored = localStorage.getItem(key)
      return stored == null ? undefined : JSON.parse(stored)
   },
   store(key, value) {
      localStorage.setItem(key, JSON.stringify(value))
   },
   clear(key) {
      localStorage.removeItem(key)
   },
}
