<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $generatedCode = $_POST["generated_code"];

    ob_start();
    eval($generatedCode);
    $output = ob_get_contents();
    ob_end_clean();

    echo $output;
}
?>
