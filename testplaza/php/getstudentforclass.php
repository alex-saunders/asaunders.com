<?php
// Connect to the database
require_once("dbconnect.php");

// Get the passed classid
$classNo = $_REQUEST["classid"];

// Get all students within that class
$query = "SELECT DISTINCT Student.studentNo, Student.fName, Student.lName
          FROM Student
          INNER JOIN StudentClass
          ON StudentClass.studentNo = Student.studentNo
          AND classNo = ?";

// Prepare the mysqli statement
$stmt = mysqli_prepare($con, $query);
mysqli_stmt_bind_param($stmt, 'i', $classNo);

// Attempt to execute the mysqli statement
$success = mysqli_stmt_execute($stmt);
$success || die("Database access failed: ".mysqli_stmt_error($stmt));

mysqli_stmt_store_result($stmt);

mysqli_stmt_bind_result($stmt, $studentNo, $studentFName, $studentLName);

$studentNoArray = array();
$i = 0;

// Store the results in a 2D array
while (mysqli_stmt_fetch($stmt)) {
    $studentNoArray[$i][0] = $studentNo;
    $studentNoArray[$i][1] = $studentFName." ".$studentLName;
    $i++;
}

mysqli_stmt_close($stmt);

// Return the created array
echo json_encode($studentNoArray);

?>