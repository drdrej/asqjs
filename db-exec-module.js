/**
 * Created by asiebert on 11.01.17.
 */

module.exports = function (config) {

    var pg = require('pg');

    var pool = new pg.Pool(config);
    console.log("> pool initialized!");

    this.exec = function ( queryFnc, params ) {
        var Promise = require("bluebird");

        return new Promise( function(resolve, reject) {
            _exec(queryFnc, params,
                function( result ) {
                    resolve( result );
                },
                reject);
        });
    };

    var _close = function( client, done ) {
        console.log( "> close db connection." );
        client.end();
        done();
    };

    var _exec = function(queryFnc, params, resolve, reject) {
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

                    _exec( queryFnc, params, client, function(result, client) {
                        console.log( "> handle result");

                        if( resolve ) {
                            resolve(result);
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