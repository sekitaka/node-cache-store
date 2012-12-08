/**
 * User: sekitakashi
 */

var assert = require('assert') ;
var Cache = require('../libs/cache.js');
var cache = new Cache({
    expire: 10,
    expiredLoopTerm: 1
}) ;

// set, get
cache.set('foo','FOO');
assert.equal(cache.get('foo'),'FOO') ;

// delete
cache.delete('foo') ;
assert.equal(cache.get('foo'),null) ;

// clear
cache.set('foo','FOO');
cache.clear() ;
assert.equal(cache.get('foo'),null) ;

// expire
cache.set('foo','FOO') ;
setTimeout(function(){
    assert.equal(cache.get('foo'),null) ;
    console.log('Expire test1 end') ;
},11000) ;

cache.set('bar','BAR',15) ;
setTimeout(function(){
    assert.equal(cache.get('bar'),'BAR') ;
    console.log('Expire test2 end') ;
},11000) ;
setTimeout(function(){
    assert.equal(cache.get('bar'),null) ;
    console.log('Expire test3 end') ;
},16000) ;

// no limit
var cache2 = new Cache({
    expiredLoopTerm:1
}) ;
cache2.set('foo','FOO') ;
assert.equal(cache2.get('foo'),'FOO') ;
setInterval(function(){
    assert.equal(cache2.get('foo'),'FOO') ;
    console.log('No limit test end') ;
},11000) ;

