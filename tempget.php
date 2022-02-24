<?php
$filename = 'temp.json';
$f = fopen($filename, 'r');

if ($f) {
    $contents = fread($f, filesize($filename));
    fclose($f);
	$json = $contents;
	$obj = json_decode($json);
} ?>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/moment@2.27.0"></script>
	<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@0.1.1"></script>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<script type="text/javascript">
		var data = <?php echo json_encode($obj) ?>;
		function getTemp() {

			document.getElementById('temp').innerHTML = Math.round(data[0].temperature*100)/100;
			document.getElementById('humidity').innerHTML = Math.round(data[0].humidity*100)/100;
			document.getElementById('timestamp').innerHTML = data[0].date;
		}
		window.onload = function() {getTemp();}
	
	</script>

</head>
<body>

<div class="container-fluid">
	<div>
		<label for="temp">Temp</label>
		<span id="temp"></span>
	</div>
	<div>
		<label for="humidity">Humidity</label>
		<span id="humidity"></span>
	</div>
	<div>
		<label for="timestamp">Timestamp</label>
		<span id="timestamp"></span>
	</div>
	
	<div>
		<canvas id="chrt"></canvas
	</div>
	
</div>

<script>
	var c = document.getElementById("chrt").getContext("2d");
	const labels = data.map((obj)=>{return new moment(obj.date, 'YYYY-MM-DD HH:mm:ss')});
	const chartdata = {
		labels: labels,
		datasets: [{
			label: 'Temperature',
			data: data.map((obj)=>{
				return obj.temperature;
			}),
			backgroundColor: '#0000cc',
			yAxisID: 'y'			
		},{
			label: 'Humidity',
			data: data.map((obj)=>{
				return obj.humidity;
			}),
			backgroundColor: '#00cc00',
			yAxisID: 'y1',
		}]
	};
	const options = {
		elements: {
			line: {
				tension: 0.5
			}
		},
        scales: {
			y: {
				type: 'linear',
				display: true,
				position: 'left',
				suggestedMin: Math.min(...data.map((tt)=>tt.temperature))-2,
				suggestedMax: Math.max(...data.map((tt)=>tt.temperature))+2
			},
			y1: {
				type: 'linear',
				display: true,
				position: 'right',
				suggestedMin: Math.min(...data.map((tt)=>tt.humidity))-2,
				suggestedMax: Math.max(...data.map((tt)=>tt.humidity))+2
			},
			x: {
				type: 'time',
				time: {
                    unit: 'hour',
					displayFormats: {
						hour: 'HH:mm'
					},
					tooltipFormat: 'YYYY-MM-DD HH:mm'
                }
			}
			
        }

	}
	
	const config = {
		type: 'line',
		data: chartdata,
		options: options
	};
  
	var ch = new Chart(c, config);
  
</script>



</script>


</body>
</html>

