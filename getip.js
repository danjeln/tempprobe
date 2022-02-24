module.exports = {
	getIP:() => {
		var Q = require("q");
		var deferred = Q.defer();
		var http = require('http');

		http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
		  resp.on('data', function(ip) {
			deferred.resolve(ip.toString());
		  });
		});
		return deferred.promise;
	}
}