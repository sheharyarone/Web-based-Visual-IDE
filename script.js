var dragItem = document.querySelectorAll(".snippet-item");
var generatedCode = document.getElementById("generated-code");

for (var i = 0; i < dragItem.length; i++) {
  dragItem[i].addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text/plain", e.target.textContent);
  });
}

generatedCode.addEventListener("dragover", function (e) {
  e.preventDefault();
});

generatedCode.addEventListener("drop", function (e) {
  e.preventDefault();
  var data = e.dataTransfer.getData("text/plain");
  var codeToAdd = "";
  switch (data) {
    case "Define variables":
      var variableName = prompt("Enter variable name:");
      if (variableName) {
        codeToAdd = "$" + variableName + ";";
      }
      break;
    case "Arithmetic operations":
      // Display dropdown menu for arithmetic operations
      var operation = prompt(
        "Choose an arithmetic operation: \n1. Addition \n2. Subtraction \n3. Multiplication \n4. Division"
      );
      var variableName = prompt("Enter variable name to store result:");
      var leftSide = prompt(
        "Enter left side value (numeric or variable name):"
      );

      // Generate code based on selected operation
      switch (operation) {
        case "1":
          codeToAdd = "$" + variableName + " = " + leftSide + " + $value;";
          break;
        case "2":
          codeToAdd = "$" + variableName + " = " + leftSide + " - $value;";
          break;
        case "3":
          codeToAdd = "$" + variableName + " = " + leftSide + " * $value;";
          break;
        case "4":
          codeToAdd = "$" + variableName + " = " + leftSide + " / $value;";
          break;
        default:
          codeToAdd = "";
          break;
      }
      break;
    case "Function creation":
      var functionName = prompt("Enter function name:");
      if (functionName) {
        var param1 = prompt("Enter parameter 1 name:");
        var param2 = prompt("Enter parameter 2 name:");
        codeToAdd =
          "function " +
          functionName +
          "($" +
          param1 +
          ", $" +
          param2 +
          ") {\n\t// Code here\n}";
      }
      break;
    case "Loops":
      var loopVarName = prompt("Enter loop variable name:");
      if (loopVarName) {
        codeToAdd =
          "for ($" +
          loopVarName +
          " = 0; $" +
          loopVarName +
          " < 10; $" +
          loopVarName +
          "++) {\n\t// Code here\n}";
      }
      break;
    case "Conditional statements":
      var conditionVarName = prompt("Enter condition variable name:");
      if (conditionVarName) {
        codeToAdd =
          "if ($" +
          conditionVarName +
          ") {\n\t// Code here\n} else {\n\t// Code here\n}";
      }
      break;
    default:
      codeToAdd = "";
      break;
  }
  generatedCode.value += codeToAdd + "\n";
});
