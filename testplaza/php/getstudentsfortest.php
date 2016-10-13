<?php
// Connect to the database
require_once("dbconnect.php");

// Get the passed test number
$testID  = $_REQUEST["testID"];

// Get the students for the test passed
$query = "SELECT DISTINCT StudentClass.studentNo
          FROM StudentClass
          INNER JOIN ClassTest
          ON ClassTest.classNo = StudentClass.classNo
          AND ClassTest.testNo = ?";

// Prepare the mysqli statement
$stmt = mysqli_prepare($con, $query);
mysqli_stmt_bind_param($stmt, 'i', $testID);

// Attempt to execute the statement
$success = mysqli_stmt_execute($stmt);
$success || die("Database access failed: ".mysqli_stmt_error($stmt));

mysqli_stmt_store_result($stmt);
mysqli_stmt_bind_result($stmt, $studentNo);

// Add the student numbers to the 1st entry in the created 2D array
$output = array();
$i = 0;
while (mysqli_stmt_fetch($stmt)) {
    $output[0][$i] = $studentNo;
    $i++;
}

mysqli_stmt_close($stmt);

// Get the classes associated with the test number passed
$query = "SELECT DISTINCT Class.classNo, Class.name
          FROM Class
          INNER JOIN ClassTest
          ON ClassTest.classNo = Class.classNo
          AND ClassTest.testNo = ?";

// Prepare the mysqli statement
$stmt = mysqli_prepare($con, $query);
mysqli_stmt_bind_param($stmt, 'i', $testID);

$success = mysqli_stmt_execute($stmt);
$success || die("Database access failed: ".mysqli_stmt_error($stmt));

mysqli_stmt_store_result($stmt);
mysqli_stmt_bind_result($stmt, $classNo, $className);

// Add the class numbers and names to the tail of the 2D array
$i = 1;
while (mysqli_stmt_fetch($stmt)) {
    $output[$i][0] = $classNo;
    $output[$i][1] = $className;
    $i++;
}

// Return the generated array
echo json_encode($output);

mysqli_stmt_close($stmt);


?>