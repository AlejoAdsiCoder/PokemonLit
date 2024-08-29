export class DataCache {
    constructor() {
      this.cache = new Map();
    }
  
    getCachedData(key) {
      return this.cache.get(key);
    }
  
    setCachedData(key, data) {
      this.cache.set(key, data);
    }
  }
  