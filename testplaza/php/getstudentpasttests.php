<?php
// Connect to the database
require_once("dbconnect.php");

// Flag to hold whether tests have been found for the student
$testsFound = false;

// Get all classes associated the student
$query = "SELECT classNo FROM StudentClass WHERE studentNo = ?;";

// Prepare the mysqli statement
$stmt = mysqli_prepare($con, $query);
mysqli_stmt_bind_param($stmt, 'i', $no);

// Attempt to execute the statement
$success = mysqli_stmt_execute($stmt);
$success || die("Database access failed: ".mysqli_stmt_error($stmt));

mysqli_stmt_store_result($stmt);

mysqli_stmt_bind_result($stmt, $classNo);

// If student has associated classes
if (mysqli_stmt_num_rows($stmt) > 0) {
    echo '<div id="accordion">';

    while (mysqli_stmt_fetch($stmt)) {

        // Find any past tests associated with those classes
        $query = "SELECT testNo, dateTime FROM ClassTest WHERE classNo = ? AND dateTime <= CURDATE()";

        // Prepare the mysqli statement
        $innerstmt = mysqli_prepare($con, $query);
        mysqli_stmt_bind_param($innerstmt, 'i', $classNo);

        // Attempt to execute the statement
        $success = mysqli_stmt_execute($innerstmt);
        $success || die("Database access failed: " . mysqli_stmt_error($innerstmt));

        mysqli_stmt_store_result($innerstmt);

        mysqli_stmt_bind_result($innerstmt, $testNo, $dateTime);

        // If past test have been found
        if (mysqli_stmt_num_rows($innerstmt) > 0) {
            // Change the flag to true
            $testsFound = true;

            while (mysqli_stmt_fetch($innerstmt)) {
                // Get the title of each test
                $query = "SELECT title FROM Test WHERE testNo = ?";

                // Prepare the mysqli statement
                $innerstmt2 = mysqli_prepare($con, $query);
                mysqli_stmt_bind_param($innerstmt2, 'i', $testNo);

                // Attempt to execute the statement
                $success = mysqli_stmt_execute($innerstmt2);
                $success || die("Database access failed: " . mysqli_stmt_error($innerstmt2));

                mysqli_stmt_bind_result($innerstmt2, $testTitle);

                while (mysqli_stmt_fetch($innerstmt2)) {
                    // Print accordion sections for each test
                    echo '<h3 studentid="' . $no . '" testid="' . $testNo . '">' . $testTitle . ' (' . $dateTime . ')</h3><div></div>';
                }

                mysqli_stmt_close($innerstmt2);
            }
        }
        mysqli_stmt_close($innerstmt);
    }
    echo '</div>';
}

// Indicate that no tests were found if the flag is still false
if (!$testsFound) {
    echo '<br /><span class="error"><i class="fa fa-times"></i> No Tests Found!</span><br /><br />';
}

mysqli_stmt_close($stmt);
?>