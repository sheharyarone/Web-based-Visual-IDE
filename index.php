<!DOCTYPE html>
<html>

<head>
	<title>Drag and Drop Code Snippets</title>
	<link rel="stylesheet" type="text/css" href="style.css">
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
		</div>
	</div>

	<div class="output-container">
		<div class="output-header">Generated Code</div>
		<textarea id="generated-code"></textarea>
		<form method="post" action="">
			<input type="hidden" name="generated_code" id="generated-code-input">
			<button type="submit" name="submit">Save Code</button>
		</form>
	</div>

	<script src="script.js"></script>
</body>

</html>