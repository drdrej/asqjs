/**
 * Created by asiebert on 11.01.17.
 */

module.exports = function () {

    var pg = require('pg');

    var pool = new pg.Pool(config);
    console.log("> pool initialized!");

    this.exec = function ( queryFnc, params, userHandleResultFnc ) {
        var Promise = require("bluebird");

        return new Promise( function(resolve, reject) {
            _exec(queryFnc, params,
                function( result ) {
                    userHandleResultFnc( result );
                    resolve( result );
                }, reject);
        });
    };

    var _close = function( client, done ) {
        console.log( "> close db connection." );
        client.end();
        done();
    };

    var _exec = function(queryFnc, params, userHandleResultFnc, reject) {
        pool.connect(
            function(err, client, done) {

                if(err) {
                    console.error('[!] error fetching client from pool', err);

                    reject(err);
                    _close( client, done );

                    return;
                }

                var _ = require( 'underscore' );

                if( queryFnc && (_.isFunction(queryFnc) || _.isString(queryFnc)) ) { // && is function?
                    var _exec = require( "./db-query-module" );
                    var callback = userHandleResultFnc;

                    _exec( queryFnc, params, client, function(result, client) {
                        console.log( "> handle result");

                        if( callback && _.isFunction(callback) ) {
                            callback(result);
                        }

                        _close( client, done );
                    });
                } else {
                    console.log( "> kill connection, nothing todo.");

                    _close( client, done );
                }
            }
        );
    };

    return this;
};