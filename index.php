<!DOCTYPE html>
<html>

<head>
	<title>Drag and Drop Code Snippets</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<script>
		function executeCode() {
			var generatedCode = document.getElementById("generated-code").value;

			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById("output-container").innerHTML = this.responseText;
				}
			};
			xhr.open("POST", "execute.php", true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send("generated_code=" + encodeURIComponent(generatedCode));
		}

		function clearAll() {
			document.getElementById("generated-code").value = "";
			document.getElementById("output-header").innerHTML = "";
		}
	</script>
</head>

<body>
	<div class="snippet-container">
		<div class="snippet-header">Code Snippets</div>
		<div class="snippet-group">
			<div class="snippet-item" draggable="true">Define variables</div>
			<div class="snippet-item" draggable="true">Arithmetic operations</div>
			<div class="snippet-item" draggable="true">Function creation</div>
			<div class="snippet-item" draggable="true">Loops</div>
			<div class="snippet-item" draggable="true">Conditional statements</div>
			<div class="snippet-item" draggable="true">Call user-defined function</div>
			<div class="snippet-item" draggable="true">Print statement</div>
			<div class="snippet-item" draggable="true">Print variable</div>
			<div class="snippet-item" draggable="true" >Read a file</div>
			<div class=" snippet-item" draggable="true" >Write to a file</div>
		</div>
	</div>
	<button id=" clear-btn" type="button" onclick="clearAll()">Clear</button>

				<div class="row mt-4">
					<div class="output-container col-6 ms-4">
						<div class="output-header">Generated Code</div>
						<textarea id="generated-code"></textarea>
						<button type="button" onclick="executeCode()">Execute Code</button>
					</div>
					<div class="output-container col-5">
						<p class="output-header">Output</p>
						<p id="output-container"></p>
					</div>
				</div>
</body>
<script src="script.js"></script>

</html>