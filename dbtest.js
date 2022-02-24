var s = require("sqlite3").verbose();
var db = new s.Database("temp.db");

const args = process.argv.slice(2);
if(args[0]==='drop') {
	db.run("drop table tempdata;");
	console.log("table dropped");
} else if(args[0]==='create') {
	db.run("CREATE TABLE tempdata(id INTEGER PRIMARY KEY AUTOINCREMENT, temperature REAL, humidity REAL, date DATETIME);");
	console.log("table created");
} else if(args[0]==='insert') {
	db.run("insert into tempdata (temperature, date) values(" + args[1] + ",datetime('now'));");
	console.log("data insert");
} else if(args[0]==='get') {
	db.each("SELECT id, temperature, date from tempdata;", function(err, row) {
		console.log("data : "+row.id +" " + row.temperature + " " + row.date);
	});

}

db.close();

