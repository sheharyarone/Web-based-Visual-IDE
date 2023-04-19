// Regex pattern for a valid PHP variable name
var validVariableName = /^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/;

// Array to store defined variable names
var definedVariableNames = [];
var definedFuncNames = [];

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
        "Enter right side of operation (variable name or number):"
      );
      var leftSide2 = prompt(
        "Enter another right side of operation (variable name or number):"
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
      if (!isValidVariableName(functionName)) {
        alert("Invalid function name! Please try again.");
        break;
      }
      definedFuncNames.push(functionName);
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
        params += "$" + paramName;
        if (i < numParams - 1) {
          params += ", ";
        }
      }
      var codeToAdd =
        "function " + functionName + "(" + params + ") {\n\t\n\n}";
      break;

    case "Loops":
      var loopType = prompt(
        "Select a loop type:\n1. for\n2. while\n3. do-while"
      );
      var loopVar = prompt("Enter loop variable name:");
      var codeToAdd = "";

      switch (loopType) {
        case "1":
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
          var operator = prompt(
            "Enter operator (\n1. < \n2.> \n3.<= \n4.>= \n5.== \n6.==="
          );
          while (isNaN(operator) && operator in Range(1, 5)) {
            alert("INVALID CHOICE !");
            operator = prompt(
              "Enter operator (\n1. < \n2.> \n3.<= \n4.>= \n5.==):"
            );
          }
          switch (operator) {
            case "1":
              // Code for option 1
              operator = "<";
              break;
            case "2":
              // Code for option 2
              operator = ">";
              break;
            case "3":
              // Code for option 3
              operator = "<=";
              break;
            case "4":
              // Code for option 4
              operator = ">=";
              break;
            case "5":
              // Code for option 5
              operator = "==";
            case "6":
              // Code for option 5
              operator = "===";
              break;
            default:
              alert("Invalid option selected!");
          }
          var value = prompt("Enter value (number or string for comparison):");
          value = "'value'";

          if (loopType == "2") {
            codeToAdd =
              "while ($" +
              loopVar +
              " " +
              operator +
              " " +
              value +
              ") {\n\n\t// Code here\n\n}";
          } else if (loopType == "3") {
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
      var variableName = prompt("Enter variable name:");
      if (!definedVariableNames.includes(variableName)) {
        alert("Variable not defined! Please enter a valid variable name.");
        break;
      }

      var operator = prompt("Enter operator (<, >, <=, >=, ==, !=):");
      var value = prompt("Enter value:");
      if (!isNaN(value)) {
        value = parseInt(value);
      }

      var codeIf = "\n\t// Code for if block goes here\n";
      var codeElse = "\n\t// Code for else block goes here\n";

      codeToAdd = "if ($" + variableName + " " + operator + " ";

      if (isNaN(value)) {
        codeToAdd += "'" + value + "'";
      } else {
        codeToAdd += value;
      }

      codeToAdd += ") {" + codeIf + "} else {" + codeElse + "}";
      break;

    // Code for calling user-defined function
    case "Call user-defined function":
      var functionName = prompt("Enter function name:");
      if (!definedFuncNames.includes(functionName)) {
        alert("FUNCTION NOT DEFINED !");
        break;
      }
      var numParams = parseInt(prompt("Enter number of parameters:"));
      var params = "";

      for (var i = 1; i <= numParams; i++) {
        var paramValue = prompt("Enter parameter " + i + ":");
        var validVariable = definedVariableNames.includes(loopVar);
        if (!isNaN(paramValue)) {
          // Check if input is a number
          params += paramValue + ",";
        } else if (validVariable) {
          // Check if input is a defined variable
          params += "$" + paramValue + ",";
          break;
        } else {
          // Input is not a valid number or variable
          alert("Invalid input for parameter " + i);
          return;
        }
      }

      params = params.slice(0, -1); // Remove last comma

      var codeToAdd = functionName + "(" + params + ");";
      codeToAdd = codeToAdd + ";"; // generate PHP code

      break;

    // CODE FOR PRINTING A STATEMENT
    case "Print statement":
      var variableName = prompt(
        "Enter the statement ( having sting / numbers ):"
      );
      codeToAdd = "echo " + "'" + variableName + "'" + ";";

      break;
    // Code for printing a variable
    case "Print variable":
      var variableName = prompt("Enter variable name:");
      if (!definedVariableNames.includes(variableName)) {
        break;
      }
      codeToAdd = "echo $" + variableName + ";";
      break;
    //Code for reading a file
    case "Read a file":
      var filePath = prompt("Enter the path: ");
      // codeToAdd = "$fileContents = file_get_contents(" + filePath + ")";
      // codeToAdd = "echo $" + "fileContents" + ";";
      break;
    // CODE FOR WRITING INTO THE FILE
    case "Write to a file":
      var filename = prompt("Enter file name:");
      var fileContent = prompt("Enter text to write to file:");
      var codeToAdd = "";
      codeToAdd += "var filename = prompt('Enter file name:');\n";
      codeToAdd +=
        "var fileContent = prompt('Enter text to write to file:');\n";
      codeToAdd +=
        'var file = fopen(filename, "w") or die("Unable to open file!");\n';
      codeToAdd += "fwrite(file, fileContent);\n";
      codeToAdd += "fclose(file);\n";
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
  console.log(generatedCode.value);
});
