module.exports = {
	insert:(temp, hum) => {
		var q = require("q");
		var res = q.defer();
		var s = require("sqlite3");
		var db = new s.Database("temp.db");
		db.run("insert into tempdata (temperature, humidity, date) values(" + temp + "," + hum + ",datetime('now'));", () => {
			res.resolve(true);
		});
		db.close();
		console.log("data inserted: " + temp + " => " + new Date().toLocaleString());
		return res.promise;
	},
	getLatest:() => {
		var s = require("sqlite3");
		var db = new s.Database("temp.db");
		var q = require("q");
		var res = q.defer();
		var rows = [];
		db.each("select id, round(temperature,3) as temperature, round(humidity,3) as humidity, datetime(date, 'localtime') as date from tempdata order by date desc limit 100;",(err,row) => {
			if(err) {
				res.reject(err);
			}
			addrow = {};
			addrow.id = row.id;
			addrow.temperature = row.temperature.toFixed(3);
			addrow.humidity = row.humidity.toFixed(3);
			addrow.date = row.date;
			rows.push(addrow);
		}, (err) => {
			res.resolve(rows);
		});
		db.close();
		return res.promise;		
	}
}
