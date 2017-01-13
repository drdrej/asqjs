/**
 * Created by asiebert on 11.01.17.
 */

module.exports = function () {

    var pg = require('pg');

    var pool = new pg.Pool(config);
    console.log("> pool initialized!");

    this.exec = function ( queryFnc, params, userHandleResultFnc ) {
        pool.connect(
            function(err, client, done) {

                if(err) {
                    console.error('[!] error fetching client from pool', err);

                    done();
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

                        client.end();
                        done();
                    });
                } else {
                    console.log( "> kill connection, nothing todo.");

                    client.end();
                    done();
                }
            }
        );
    };

    return this;
};