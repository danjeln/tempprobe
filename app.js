const ul = require("./tempset");
const cron = require('cron')
const path = require('path');
const fs = require('fs');
const db = require('./db');
const sensor = require("node-dht-sensor").promises;

sensor.setMaxRetries(20);
sensor.initialize(22,4); //dht22 on pin4

const job = cron.job('*/6 * * * *', () => {
	setTemp();
});
job.start()


var setTemp = () => {
//	fs.readFile('/sys/bus/w1/devices/28-00000546fd4b/temperature',(err, content) => {
	sensor.read(22,4).then((res) => {
		var c = res.temperature.toFixed(3);
		var h = res.humidity.toFixed(2);
		db.insert(c, h).then(()=> {
			ul.doSend();
		});
	});
}

setTemp();
console.log("Started");

