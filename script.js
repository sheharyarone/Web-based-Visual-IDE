// Regex pattern for a valid PHP variable name
var validVariableName = /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/;

// Array to store defined variable names
var definedVariableNames = [];

// Function to validate a variable name
function isValidVariableName(name) {
  return validVariableName.test(name);
}

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
      while (!isValidVariableName(variableName)) {
        alert("Invalid variable name! Please try again.");
        variableName = prompt("Enter variable name:");
      }
      definedVariableNames.push(variableName);
      var variableValue = prompt("Enter variable value:");
      codeToAdd = "$" + variableName + " = '" + variableValue + "';";
      break;

    case "Arithmetic operations":
      var variableName = prompt("Enter variable name to store result:");
      while (!isValidVariableName(variableName)) {
        alert("Invalid variable name! Please try again.");
        variableName = prompt("Enter variable name to store result:");
      }
      var operation = prompt("Enter arithmetic operation (+, -, *, /, %):");
      while (!["+", "-", "*", "/", "%"].includes(operation)) {
        alert("Invalid arithmetic operation! Please try again.");
        operation = prompt("Enter arithmetic operation (+, -, *, /, %):");
      }
      var leftSide1 = prompt(
        "Enter left side of operation (variable name or number):"
      );
      var leftSide2 = prompt(
        "Enter another left side of operation (variable name or number):"
      );

      // Check if variable names on the right side are valid
      var validRightSide = true;
      [leftSide1, leftSide2].forEach(function (rightSide) {
        if (isNaN(rightSide) && !definedVariableNames.includes(rightSide)) {
          validRightSide = false;
        }
      });

      if (validRightSide) {
        codeToAdd =
          "$" +
          variableName +
          " = " +
          leftSide1 +
          " " +
          operation +
          " " +
          leftSide2 +
          " ;";
      } else {
        alert(
          "Invalid arithmetic operation! Variable names on the right side must be defined first."
        );
      }

      break;

    case "Function creation":
      var functionName = prompt("Enter function name:");
      while (!isValidVariableName(functionName)) {
        alert("Invalid function name! Please try again.");
        functionName = prompt("Enter function name:");
      }
      var params = prompt("Enter comma-separated list of parameters:");
      codeToAdd =
        "function " + functionName + "(" + params + ") {\n\t// Code here\n}";
      break;
    case "Loops":
      var loopVar = prompt("Enter loop variable name:");
      while (!isValidVariableName(loopVar)) {
        alert("Invalid variable name! Please try again.");
        loopVar = prompt("Enter loop variable name:");
      }
      var loopLimit = prompt("Enter loop limit:");
      codeToAdd =
        "for ($" +
        loopVar +
        " = 0; $" +
        loopVar +
        " < " +
        loopLimit +
        "; $" +
        loopVar +
        "++) {\n\t// Code here\n}";
      break;
    case "Conditional statements":
      var condition = prompt("Enter condition:");
      codeToAdd =
        "if (" + condition + ") {\n\t// Code here\n} else {\n\t// Code here\n}";
      break;
    default:
      codeToAdd = "";
      break;
  }
  generatedCode.value += codeToAdd + "\n";
});
