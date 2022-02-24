
module.exports = {

	doSend:() => {

		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
		const https = require('https')
		const db = require('./db');
		db.getLatest().then((d)=> {
			data = JSON.stringify(d);
				
			const options = {
			  hostname: 'danjel.se',
			  port: 443,
			  path: '/tempset.php',
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
				'Content-Length': data.length
			  }
			}

			const req = https.request(options, res => {
			  console.log("sent: " + res.statusCode);

			  res.on('data', d => {
				process.stdout.write(d)
			  })
			})

			req.on('error', error => {
			  console.error(error)
			})


			req.write(data);
			req.end();
			
			
		});

	}


};