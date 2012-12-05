/**
 * Utility
 * User: sekitakashi
 * Date: 2012/12/04
 * Time: 22:10
 */

/**
 * check int value.
 * @param num
 * @return {Boolean}
 */
module.exports.isInt = function(num) {
    if ( num == parseInt(num) ) return true ;
    return false ;
}

/**
 * merge object.
 * @param obj1 base object
 * @param obj2 if same property exists in obj1 , override the value.
 */
module.exports.objectMerge = function(obj1,obj2) {
    var ret = {} ;
    for (var key in obj1 ) {
        ret[key] = obj1[key] ;
    }
    for (var key in obj2 ) {
        ret[key] = obj2[key] ;
    }
    return ret ;
}
