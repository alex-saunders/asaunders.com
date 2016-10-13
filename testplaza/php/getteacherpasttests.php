<?php
// Connect to the database
require_once("dbconnect.php");

// Flag to hold whether any past tests have ben found
$testsfound = false;

// Get all past tests associated with the teacher currently logged in
$query = "SELECT DISTINCT ClassTest.testNo
          FROM ClassTest
          INNER JOIN Class
          On Class.classNo = ClassTest.classNo
          AND Class.teacherNo = ?
          AND ClassTest.dateTime <= CURDATE()";

// Prepare the mysqli statement
$stmt = mysqli_prepare($con, $query);
mysqli_stmt_bind_param($stmt, 'i', $no);

// Attempt to execute the statement
$success = mysqli_stmt_execute($stmt);
$success || die("Database access failed: ".mysqli_stmt_error($stmt));

mysqli_stmt_store_result($stmt);

mysqli_stmt_bind_result($stmt, $testNo);

// For each test found
if (mysqli_stmt_num_rows($stmt) > 0) {
    // Update the tests found flag to be true
    $testsfound = true;

    // Get the title of the test
    while (mysqli_stmt_fetch($stmt)) {
        $query = "SELECT DISTINCT title FROM Test WHERE testNo = ?";

        // Prepare the mysqli statement
        $innerstmt = mysqli_prepare($con, $query);
        mysqli_stmt_bind_param($innerstmt, 'i', $testNo);

        // Attempt to execute the statement
        $success = mysqli_stmt_execute($innerstmt);
        $success || die("Database access failed: " . mysqli_stmt_error($innerstmt));

        mysqli_stmt_bind_result($innerstmt, $testTitle);

        // Return the test number and title of each test
        while (mysqli_stmt_fetch($innerstmt)) {
            echo '<option testid="' . $testNo . '">' . $testTitle . '</option>';
        }

        mysqli_stmt_close($innerstmt);
    }
}

mysqli_stmt_close($stmt);

// If no tests are found, inform the user
if (!$testsfound) {
    echo '</select><br /><br/><span class="error"><i class="fa fa-times"></i> No Tests Found!</span><br />';
} else {
    // If at least one test is found
    echo '</select><br/>
            <div class="loading-spinner"></div>
            <div class="class-select-container"></div>
            <div class="" id="results-summary"></div>
            <div class="canvas-container"><br />
            <label class="class-list"><i class="fa fa-bar-chart"></i> Results Per Question</label>
            <canvas id="testresults" width="500"></canvas>
            <br/><br/>
            <label class="class-list"><i class="fa fa-line-chart"></i> Average % Correct Per Question</label>
            <canvas id="testaverages" width="500"></canvas>
            </div>
            <div id="padding"></div>
            <div id="accordion"></div>';
}

?>