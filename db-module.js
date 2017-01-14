/**
 * Created by asiebert on 11.01.17.
 */

module.exports = function ( config ) {

    this.exec = function( queryFnc, params, userHandleResultFnc) {
         var handler = require( "./db-exec-module" );
         return handler().exec(queryFnc, params, userHandleResultFnc);
    };

    return this;
};