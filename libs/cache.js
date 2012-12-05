var utility = require('./utility.js') ;

/**
 * Cache
 * @constructor
 */
var Cache = function(options) {
    var defaults = {
        expire: 3600,           // default expire(sec)
        expiredLoopTerm: 3600   // interval for delete expired data.(sec)
    }
    options = utility.objectMerge(defaults,options) ;
    this.data = {} ;                // data store.
    this.expire = options.expire ;
    this.expiredLoopTerm = options.expiredLoopTerm ;
    this.inExpiredProcess = false ; // flag for deleting expired data.
    this.startExpiredLoop() ;
}

/**
 * get value.
 * @param key if expired, return null.
 */
Cache.prototype.get = function(key) {
    this.expired(key) ;
    if ( !this.data[key] || !this.data[key].value ) return null ;
    return this.data[key].value ;
};

/**
 * set value.
 * @param key unique key
 * @param val value
 * @param expire expire time (sec)
 */
Cache.prototype.set = function(key, val, expire) {
    if ( !utility.isInt(expire) ) {
        expire = this.expire ;
    }
    var expireTime = (new Date() * 1) + expire * 1000 ;
    this.data[key] = {
        expire: expireTime,
        value: val
    } ;
};

/**
 * delete cache.
 * @param key unique key
 */
Cache.prototype.delete = function(key) {
    delete this.data[key] ;
} ;

/**
 * delete all cache.
 */
Cache.prototype.deleteAll = function(){
    this.data = {} ;
} ;

/**
 * If expired , delete cache.
 */
Cache.prototype.expired = function(key) {
    var now = new Date() * 1 ;
    if (!this.data[key]) return ; // if not exist data.
    if ( this.data[key].expire < now ) {
        this.delete(key) ;
    }
} ;

/**
 * delete expired cache.
 * TODO: Using process.nextTick .(when delete too many object)
 */
Cache.prototype.expiredAll = function() {
    var now = new Date() * 1 ;
    for ( var key in this.data ) {
        var expire = this.data[key].expire ;
        if ( expire < now ) {
            this.delete(key) ;
        }
    }
} ;


/**
 * start delete expired data.
 */
Cache.prototype.startExpiredLoop = function() {
    var self = this ;
    setInterval(function(){
        if ( self.inExpiredProcess ) return ; // Check duplicate
        self.inExpiredProcess = true ;
        self.expiredAll();
        self.inExpiredProcess = false ;
    },this.expiredLoopTerm * 1000) ;
} ;

module.exports = Cache ;
