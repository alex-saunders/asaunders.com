<?php
// Connect to the database
require_once("dbconnect.php");

// Get the passed test and student id numbers
$testID  = $_REQUEST["testID"];
$studentNo = $_REQUEST["studentID"];

// Split the passed student ids up
$studentNos = explode(",", $studentNo);

// Intialise an array to store the results for every student passed
$allResults = array();
$i = 0;

// For each student
foreach ($studentNos as $studentid) {

    // Get the questions for the passed test
    $query = "SELECT testQuestionNo FROM TestQuestion WHERE testNo = ?";

    // Prepare the mysqli statement
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, 'i', $testID);

    // Attempt to execute the statement
    $success = mysqli_stmt_execute($stmt);
    $success || die("Database access failed: " . mysqli_stmt_error($stmt));

    mysqli_stmt_store_result($stmt);

    // Bind the result of the statement to $testQuestionNo
    mysqli_stmt_bind_result($stmt, $testQuestionNo);

    $results = array();
    $j = 0;

    // For each question
    while (mysqli_stmt_fetch($stmt)) {

        // Get the students submission for that question
        $query = "SELECT correct FROM Answer Where answerNo = (SELECT answerNo FROM Submission WHERE studentNo = ? AND testQuestionNo = ?)";

        // Prepare the mysqli statement
        $innerstmt = mysqli_prepare($con, $query) or die(mysqli_error($conn));
        mysqli_stmt_bind_param($innerstmt, 'ii', $studentid, $testQuestionNo);

        // Attempt to execute the statement
        $success = mysqli_stmt_execute($innerstmt);
        $success || die("Database access failed: " . mysqli_stmt_error($innerstmt));

        mysqli_stmt_store_result($innerstmt);

        // if student has submitted results for this test
        if (mysqli_stmt_num_rows($innerstmt) > 0) {

            mysqli_stmt_bind_result($innerstmt, $correct);

            // Create an array of their results
            while (mysqli_stmt_fetch($innerstmt)) {
                $results[$j] = $correct;
                $j++;
            }
        }

        mysqli_stmt_close($innerstmt);
    }

    // Add the current students results array to the overall results array
    if ($results != []) {
        $allResults[$i] = $results;
        $i++;
    }
    mysqli_stmt_close($stmt);
}

// return the overall results array
echo json_encode($allResults);

?>