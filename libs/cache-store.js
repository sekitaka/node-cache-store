/**
 * Multi cache instance manager.
 * User: sekitakashi
 * Date: 2012/12/04
 * Time: 23:20
 */
var Cache = require('./cache.js') ;
var dataStore = {} ;
var defaultStore = null ;
module.exports.getInstance = function(namespace,options) {
    if(namespace) {
        if(!dataStore[namespace]){
            //console.log('namespace is not found') ;
            dataStore[namespace] = new Cache(options) ;
        }
        return dataStore[namespace] ;
    }

    //console.log('default namespace');
    if(defaultStore == null) {
        //console.log('default namespace is null');
        defaultStore = new Cache(options) ;
    }
    return defaultStore ;
}
