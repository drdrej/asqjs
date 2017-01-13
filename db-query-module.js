/**
 * Created by asiebert on 11.01.17.
 */
module.exports = function ( queryFnc, params, client, handleResultFnc ) {
    console.log( "> exec query: " + queryFnc );

    // if query is string, dann direkt zuweisen: ...
    var query = null;
    var useParams = params;

    var _ = require( 'underscore' );

    var prepared = null;
    if(_.isFunction(queryFnc)) {
        prepared = queryFnc(params);
    } else if( _.isString(queryFnc) ) {
        prepared = queryFnc;
    } else
        throw "Only string and function accepted as first argument";

    if( _.isString(prepared) ) {
        query = prepared;
    } else if( _.isObject( prepared ) ) {
        query = prepared.query;
        useParams = prepared.params ? prepared.params : params;
    } else throw "Illegal result of query-preparation. Only String and Object are accepted.";

    console.log( "> use params = " + useParams);

    var template  = require( "./db-query-template-module" );
    var sqlQuery = template(query, useParams);

    client.query( sqlQuery, null, function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }

        // console.log(result /*.rows[0].number*/);
        //output: 1

        if( handleResultFnc ) {
            console.log( "> call `done()` to release the client back to the pool." );
            handleResultFnc(result, client);
        }
    });
};