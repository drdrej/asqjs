/**
 * Created by asiebert on 12.01.17.
 */

module.exports = function( query, params ) {
    var Handlebars = require( "handlebars" );

    console.log( "> register hdb helper table. " );

    Handlebars.registerHelper('db-table-name', function(items, options) {
        // var tab = options.data.root.table;
        var tab = items;
        return ( '"' + tab[0] + '"' + '.' + '"' + tab[1] + '"' );
    });

    /*
    Handlebars.registerHelper('list', function(items, options) {
        var out = "<ul>";

        for(var i=0, l=items.length; i<l; i++) {
            out = out + "<li>" + options.fn(items[i]) + "</li>";
        }

        return out + "</ul>";
    });
    */


    console.log( "> compile hdb query: " + query);
    var template = Handlebars.compile(query);

    var result = template(params);
    console.log( "> compiled hdb result: " + result);

    return result;
};