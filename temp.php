<?php
$filename = 'temp.json';
$f = fopen($filename, 'r');

if ($f) {
    $contents = fread($f, filesize($filename));
    fclose($f);
	$json = $contents;
	$obj = json_decode($json);
	$ip = $obj->{'ip'};
	$datetime = $obj->{'timestamp'};
}	
?>

<html>

<script type="text/javascript">
function getTemp() {

fetch('http://<?php echo $ip ?>:3000/temp')
	.then(response => response.json())
	.then(data => {
		var resp = JSON.parse(this.response);
		document.getElementById('result').innerHTML = resp.temp/1000;
	});

}
window.setInterval(getTemp,5000);
getTemp();
</script>
<body>
<div>
<label for="result">Temp</label>
<span id="result"/>
</div>
</body>
</html>

