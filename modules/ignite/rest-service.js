var q = require('q');
var _ = require('underscore');
var logger = global.logger;
var request = require("request");
var r = process.env.IGNITE_REST;
//var rootUrl = r !== undefined ? "http://" + process.env.IGNITE_REST + "/ignite?cmd=" : "http://localhost:8080/ignite?cmd=";
var rootUrl = "http://54.209.43.144/ignite?cmd="


module.exports = function() {
    this.proxyCall = function(methodName, query){
        var deferred = q.defer();

        console.log("rootUrl:", rootUrl);
        console.log("query:", query);

        //TODO: If method is TOP: S3 List, Iterate
        //else update rootUrl per a dictionary or array

        request({
            method:"GET",
            uri: rootUrl + methodName,
            qs: query
            } , function (error, response, body) {
            if (error) {
                logger.info(error);
                deferred.reject(error);
            } else {
                logger.info("Resolved");
                deferred.resolve(body);
            }
        });

        return deferred.promise;
    }
};
