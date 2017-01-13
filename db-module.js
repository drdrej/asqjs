/**
 * Created by asiebert on 11.01.17.
 */

module.exports = function ( config ) {

    this.exec = function( queryFnc, params, userHandleResultFnc) {

        /*
         var Promise = require("bluebird");

         return new Promise( function(resolve, reject) {
         console.log( "> exec connect()-promise.");

         var self = this;
         */

        var handler = require( "./db-exec-module" );
        handler().exec(queryFnc, params, userHandleResultFnc);
    };

    return this;
};