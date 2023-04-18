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
      var numParams;
      do {
        var input = prompt(
          "How many parameters do you want to pass to the function?"
        );
        numParams = parseInt(input);
      } while (isNaN(numParams) || input !== numParams.toString());
      var params = "";
      for (var i = 0; i < numParams; i++) {
        var paramName = prompt("Enter name for parameter " + (i + 1) + ":");
        while (!isValidVariableName(paramName)) {
          alert("Invalid parameter name! Please try again.");
          paramName = prompt("Enter name for parameter " + (i + 1) + ":");
        }
        params += paramName;
        if (i < numParams - 1) {
          params += ", ";
        }
      }
      var codeToAdd =
        "function " + functionName + "(" + params + ") {\n\t// Code here\n}";
      break;

    case "Loops":
      var loopType = prompt(
        "Select a loop type:\n1. for\n2. while\n3. do-while"
      );
      var loopVar = prompt("Enter loop variable name:");
      var loopLimit = prompt("Enter loop limit:");
      var codeToAdd = "";

      switch (loopType) {
        case "1":
          codeToAdd =
            "for ($" +
            loopVar +
            " = 0; $" +
            loopVar +
            " < " +
            loopLimit +
            "; $" +
            loopVar +
            "++) {\n\n\t// Code here\n\n}";
          break;

        case "2":
        case "3":
          var validVariable = false;
          var validVariable = definedVariableNames.includes(loopVar);
          if (!validVariable) {
            alert("Variable is not defined !");
            break;
          }

          var operator = prompt("Enter operator (<, >, <=, >=, =):");
          var value = prompt("Enter value:");

          if (loopType === "2") {
            codeToAdd =
              "while ($" +
              loopVar +
              " " +
              operator +
              " " +
              value +
              ") {\n\n\t// Code here\n\n}";
          } else if (loopType === "3") {
            codeToAdd =
              "do {\n\n\t// Code here\n\n} while ($" +
              loopVar +
              " " +
              operator +
              " " +
              value +
              ");";
          }
          break;

        default:
          alert("Invalid loop type selected!");
      }
      break;

    case "Conditional statements":
      var condition = prompt("Enter condition:");
      codeToAdd =
        "if (" +
        condition +
        ") {\n\t// Code here\n\n} else {\n\t// Code here\n\n}";
      break;
    default:
      codeToAdd = "";
      break;
  }
  codeToAdd = "\n" + codeToAdd + "\n";

  // Determine where in the generated code block the user dropped the code snippet
  var caretPosition = generatedCode.selectionStart;

  // Insert the new code snippet at the caret position
  var currentValue = generatedCode.value;
  var newValue =
    currentValue.slice(0, caretPosition) +
    codeToAdd +
    currentValue.slice(caretPosition);
  generatedCode.value = newValue;
});
