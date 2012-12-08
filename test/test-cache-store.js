/**
 * User: sekitakashi
 */

var assert = require('assert') ;
var CacheStore = require('../libs/cache-store.js');

// defalt name space
var cache = CacheStore.getInstance() ;
cache.set('foo','foo') ;
assert.equal(cache.get('foo'),'foo') ;

// multi name space
var cache1 = CacheStore.getInstance('foo',{
    expire: 10,
    expiredLoopTerm: 1
}) ;
var cache2 = CacheStore.getInstance('bar',{
    expire: 20,
    expiredLoopTerm: 1
}) ;
cache1.set('foo','foo1') ;
cache2.set('foo','foo2') ;
assert.equal(cache1.get('foo'),'foo1') ;
assert.equal(cache2.get('foo'),'foo2') ;
setTimeout(function(){
    assert.equal(cache1.get('foo'),null) ;
    console.log('Expire test1 end');
},15000) ;
setTimeout(function(){
    assert.equal(cache2.get('foo'),'foo2') ;
    console.log('Expire test2 end');
},15000) ;

