<?php
// Connect to the database
require_once("dbconnect.php");

// Get the classes associated with the teacher logged in
$query = "SELECT classNo FROM Class WHERE teacherNo = ?";

// Prepare the mysqli statement
$stmt = mysqli_prepare($con, $query);
mysqli_stmt_bind_param($stmt, 'i', $no);

// Attempt to execute the statement
$success = mysqli_stmt_execute($stmt);
$success || die("Database access failed: ".mysqli_stmt_error($stmt));

mysqli_stmt_store_result($stmt);

mysqli_stmt_bind_result($stmt, $classNo);

$output = "";

// For each class
while (mysqli_stmt_fetch($stmt)) {

    // Get the tests associated with that class
    $query = "SELECT DISTINCT ClassTest.testNo, ClassTest.dateTime, Class.name
              FROM ClassTest
              INNER JOIN Class
              ON Class.classNo = ClassTest.classNo
              AND ClassTest.classNo = ?";

    // Prepare the mysqli statement
    $innerstmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($innerstmt, 'i', $classNo);

    // Attempt to execute the statement
    $success = mysqli_stmt_execute($innerstmt);
    $success || die("Database access failed: ".mysqli_stmt_error($innerstmt));

    mysqli_stmt_store_result($innerstmt);

    mysqli_stmt_bind_result($innerstmt, $testNo, $dateTime, $className);

    // For each test
    if (mysqli_stmt_num_rows($innerstmt) > 0) {
        while (mysqli_stmt_fetch($innerstmt)) {
            // Get the title of the test
            $query = "SELECT title FROM Test WHERE testNo = ?";

            // Prepare the mysqli statement
            $innerstmt2 = mysqli_prepare($con, $query);
            mysqli_stmt_bind_param($innerstmt2, 'i', $testNo);

            // Attempt to execute the statement
            $success = mysqli_stmt_execute($innerstmt2);
            $success || die("Database access failed: " . mysqli_stmt_error($innerstmt2));

            mysqli_stmt_bind_result($innerstmt2, $testTitle);

            // Return the test title, Class name and start time for each test
            while (mysqli_stmt_fetch($innerstmt2)) {
                $output = $output."{ title: '" . $testTitle . " (Class: ".$className.")', ";
                $output = $output."start: '" . $dateTime . "'},";
            }

            mysqli_stmt_close($innerstmt2);
        }
    }

    mysqli_stmt_close($innerstmt);
}

mysqli_stmt_close($stmt);

echo $output;

?>