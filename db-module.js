/**
 * Created by asiebert on 11.01.17.
 */

module.exports = function ( config ) {

    this.exec = function( queryFnc, params) {
         var handler = require( "./db-exec-module" );
         return handler(config).exec(queryFnc, params);
    };

    return this;
};