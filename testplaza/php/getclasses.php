<?php
// Connect to the database
require_once("dbconnect.php");

// Get whether a teacher or student is logged in
$accountType = $_SESSION['ACCOUNT_TYPE'];

// Query the classes associated with either the teacher or student (dependent on who is logged in)
if ($accountType == 'teacher') {
    $query = "SELECT DISTINCT name FROM Class WHERE teacherNo = ?";
} else {
    $query = "SELECT DISTINCT Class.name
              FROM Class
              INNER JOIN StudentClass
              ON StudentClass.classNo = Class.classNo
              AND StudentClass.studentNo = ?";
}

// Prepare the mysqli statement
$stmt = mysqli_prepare($con, $query);
mysqli_stmt_bind_param($stmt, 'i', $no);
$success = mysqli_stmt_execute($stmt);
$success || die("Database access failed: ".mysqli_stmt_error($stmt));

mysqli_stmt_store_result($stmt);

mysqli_stmt_bind_result($stmt, $className);

// Print the classes found
if (mysqli_stmt_num_rows($stmt) > 0) {
    while (mysqli_stmt_fetch($stmt)) {
        echo '<div class="class-list"> ' . $className . '</div>';
    }
} else {
    // Print that there are no classes found fi this is the case
    echo '<span class="error"><i class="fa fa-times"></i> No Classes Found!</span><br />';
}

mysqli_stmt_close($stmt);
