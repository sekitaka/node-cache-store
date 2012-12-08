# node-cache-store

A in-memory cache system.

* Key/Value store.
* You can use multi cache space like namespace.

# Installation

`npm install node-cache-store`

# Usage
Simple usage
```javascript
var Cache = require('node-cache-store').Cache;
var cache = new Cache() ;

// Set a cache
cache.set('key', 'value');

// get a cache
cache.set('key');

// delete a cache
cache.delete('key') ;
```
Multi namespace usage
```javascript
var CacheStore = require('node-cache-store').CacheStore;
var cache1 = CacheStore.getInstance('space1') ;
cache1.set('foo','foo') ;
```

Options
```javascript
var opt = {
    expire: 3600 ; // Cache expire time(sec). Defalt is no limit(-1).
    expiredLoopTerm: 3600   // interval for delete expired data(sec). Defalt is 3600 ;
} ;
var cache = new Cache(opt) ;
var cache1 = CacheStore.getInstance('space1',opt) ;
```

# Support

Open an issue on GitHub.
