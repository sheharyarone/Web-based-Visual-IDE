<!DOCTYPE html>
<html>

<head>
	<title>Drag and Drop Code Snippets</title>
	<link rel="stylesheet" type="text/css" href="style.css">
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
	</script>
</head>

<body>
	<div class="snippet-container">
		<div class="snippet-header">Code Snippets</div>
		<div class="snippet-group">
			<div class="snippet-item" draggable="true" data-operation="variables">Define variables</div>
			<div class="snippet-item" draggable="true" data-operation="arithmetic">Arithmetic operations</div>
			<div class="snippet-item" draggable="true" data-operation="functions">Function creation</div>
			<div class="snippet-item" draggable="true" data-operation="loops">Loops</div>
			<div class="snippet-item" draggable="true" data-operation="conditionals">Conditional statements</div>
			<div class="snippet-item" draggable="true" data-operation="loops">Call user-defined function</div>
			<div class="snippet-item" draggable="true" data-operation="loops">Print statement</div>
			<div class="snippet-item" draggable="true" data-operation="loops">Print variable</div>

		</div>
	</div>

	<div class="output-container">
		<div class="output-header">Generated Code</div>
		<textarea id="generated-code"></textarea>
		<button type="button" onclick="executeCode()">Execute Code</button>
		<div class="output-header">Output</div>
		<div id="output-container"></div>
	</div>

	<script src="script.js"></script>
</body>

</html>