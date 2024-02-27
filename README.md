# rs-mem-cache

Heavily a WIP

Will require Rust to be installed to run for development

https://www.rust-lang.org/learn/get-started

## Usage

This package exposes a Cache using the Rust LRU Cache Library

https://github.com/jeromefroe/lru-rs

Mostly a performance experiment to see if offloading memory management from NodeJS into Rust has any
benefits in apps that use lots of caching but don't want heavy IPC

Based on the test suite you've provided for the `SyncCache` class, here's a README outline that explains how to use the `SyncCache` library. This README includes sections on installation, basic usage, handling different data types, and working with multiple items.

## Installation

1. Add `rs-mem-cache` to your project dependencies using `yarn` or `npm`.

```bash
yarn add sync-cache
# or
npm install sync-cache
```

## Basic Usage

The `SyncCache` class allows you to set, get, and manage cache entries with ease. Here's a quick start guide:

```javascript
import { SyncCache } from 'rs-mem-cache';

// Initialize cache with a specified capacity
const cache = new SyncCache(1000000); // Capacity of 1,000,000 items

// Set a value
cache.set('key', 'value');

// Retrieve a value
const value = cache.get('key'); // Returns 'value'

// Check for an unknown key
const unknown = cache.get('unknown'); // Returns null
```

## Handling Different Data Types

The cache, like its underlying rust impl works with string values, you can handle different data types by serializing them to a string format.

### Storing Numbers

To store numbers, convert them to strings or serialize them:

```javascript
const key = 'numberKey';
const value = 123;

// Store as a string
cache.set(key, value.toString());

// Retrieve and parse
const storedValue = parseInt(cache.get(key), 10);
```

### Working with JSON

For more complex data types like objects or arrays, you can use JSON serialization:

```javascript
const key = 'objectKey';
const value = { a: 1, b: 2 };

// Serialize and store
cache.set(key, JSON.stringify(value));

// Retrieve and parse
const storedValue = JSON.parse(cache.get(key));
```

## Setting Multiple Items

You can set multiple items at once using the `mset` method:

```javascript
// Prepare multiple key-value pairs
const items = [
  ['key1', 'value1'],
  ['key2', 'value2'],
];

// Set multiple items
cache.mset(items);

// Retrieve to verify
console.log(cache.get('key1')); // Outputs 'value1'
console.log(cache.get('key2')); // Outputs 'value2'
```

## Contributing

This is my first experiment with Rust, I would like to implement the following and am happy to get help in doing so:
- Expose the remaining functions
- Make functions async so it uses tokio async mutex

Make sure **rust** and **yarn** is installed, run `yarn install` and it should work with a `yarn build` and `yarn test`