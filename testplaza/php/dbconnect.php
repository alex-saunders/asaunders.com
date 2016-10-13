<?php
$db_hostname = "160.153.16.36";
$db_username   = "TestPlaza";
$db_password   = "p@ssword";
$db_database     = "TestPlaza";

// Attempt to connect to database
$con = mysqli_connect($db_hostname,$db_username,$db_password,
    $db_database);

// If unable to connect to database, kill the script and print the error message
if (!$con) die("Unable to connect to MySQL: ".mysqli_connect_error());
?>