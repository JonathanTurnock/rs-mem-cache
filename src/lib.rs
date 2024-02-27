#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;
use napi::Result;
use lru::LruCache;
use std::sync::Mutex;

#[napi]
pub struct SyncCache {
    cache: Mutex<LruCache<String, String>>,
}

#[napi]
impl SyncCache {
    #[napi(constructor)]
    pub fn new(capacity: u32) -> Self {
        Self {
            cache: Mutex::new(LruCache::new(capacity as usize)),
        }
    }

    #[napi]
    pub fn set(&self, key: String, value: String) -> Result<()> {
        let mut cache = self.cache.lock().unwrap();
        cache.put(key, value);
        Ok(())
    }

    #[napi]
    pub fn mset(&self, items: Vec<(String, String)>) -> Result<()> {
        let mut cache = self.cache.lock().unwrap();
        for (key, value) in items {
            cache.put(key, value);
        }
        Ok(())
    }

    #[napi]
    pub fn get(&self, key: String) -> Result<Option<String>> {
        let mut cache = self.cache.lock().unwrap();
        Ok(cache.get(&key).cloned())
    }
}