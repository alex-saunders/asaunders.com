<?php
// Keep the current session going, or start one if none is already started
session_start();
if (isset($_SESSION['USER'])) {
    // If user is already logged in, redirect them to the profile page
    header("location: profile.php");
    exit;
}

// connect to the database
require_once("php/dbconnect.php");

// function to print custom error message
function printError($message)
{
    echo '<span class="error">
            <i class="fa fa-times"></i> ' . $message . '</span>
            <br /><br /><br />';
}

// If user has got to page via a post request (has completed the login form)
if (isset($_SERVER['REQUEST_METHOD']) && ($_SERVER['REQUEST_METHOD'] == "POST")) {
    // If the user has entered a value for both the username and password field
    if ((isset($_REQUEST['username'])) && (isset($_REQUEST['password']))) {
        // If the submitted username matches the format
        if (preg_match('/^[st][a-z][0-9][a-z][a-z][0-9]$/', $_REQUEST['username'])) {

            // If user has attempted to login to a student account
            if ($_REQUEST['username'][0] == 's') {
                // Select password of entered student's username
                $query = "SELECT password FROM Student WHERE username = ?";
            }
            // If user has attempted to login to a teacher account
            else {
                // Select password of entered teacher's username
                $query = "SELECT password FROM Teacher WHERE username = ?";
            }
            // Prepare the mysqli statement
            $stmt = mysqli_prepare($con, $query);
            mysqli_stmt_bind_param($stmt, 's', $_REQUEST['username']);

            // Attempt to execute the statement
            $success = mysqli_stmt_execute($stmt);
            $success || die("Database access failed: " . mysqli_stmt_error($stmt));

            mysqli_stmt_bind_result($stmt, $password);

            mysqli_stmt_store_result($stmt);

            $rowCount = mysqli_stmt_num_rows($stmt);

            // If an account with the submitted username exists
            if ($rowCount > 0) {
                while (mysqli_stmt_fetch($stmt)) {
                    // And their password matches the submitted password
                    if ($password == hash("sha256", $_REQUEST['password'])) {
                        // Set the session variable for the username
                        $_SESSION['USER'] = $_REQUEST['username'];
                        // And redirect them to the profile page
                        header("Location: profile.php");
                        exit;
                    } else
                        // Else set the error message
                        $error = "Incorrect Username or Password";
                }
            } else {
                // Else set the error message
                $error = "Incorrect Username or Password";
            }

            mysqli_stmt_close($stmt);

        } else {
            // Else set the error message
            $error = "Incorrect Username Format";
        }
    }
}
?>
<html>
   <head>
      <title>Test Plaza</title>
      <link rel="icon" href="images/favicon.ico">
      <link href='https://fonts.googleapis.com/css?family=Work+Sans:400,300,700' rel='stylesheet' type='text/css'>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="css/style.css">
   </head>
   <body>
      <main class="index">
         <div class="container login">
            <div class="title">
               <img src="images/TestPlazaLogo.png" class="logo">Welcome to TestPlaza
            </div>
            <br /><br />
            <form id="form1" action="" method="POST" class="login-container">
               <div class="field">
                  <input type="text" id="fieldUser" name="username" class="input" required />
                  <label for="fieldUser" class="label">Username</label>
               </div>
               <div class="field">
                  <input type="password" id="fieldPassword" name="password" class="input" required />
                  <label for="fieldPassword" class="label">Password</label>	
               </div>
               <?php
                  // If an error message has been set
                  if (isset($error)) {
                    // Print it to the user using the custom error message function
                    printError($error);
                  }
                  ?>
               <input type="submit" value="Login" class="btn">
            </form>
         </div>
         <div class="footer-pointer">
            <i class="fa fa-chevron-down fa-2x"></i>
         </div>
      </main>
      <footer>
         <table border="0" class="footer-table" cellspacing="5">
            <tr>
               <td>
                  "TestPlaza is a student created test room system <br />
                  that allows teachers to make tests that their <br />
                  students can then sit across a secure network.." <br/> <br />
                  <a href="#" onclick="alert('Page Coming Soon, Sorry!');"><button class="btn footer">More</button></a>
               </td>
               <td>
                  <span class="footer-title">
                  Main Navigation
                  </span> 
                  <br />
                  <a href="Index.php" class="a footer">Login</a> <br />
                  <a href="profile.php" class="a footer">Profile </a><br />
                  <a href="#" class="a footer" onclick="alert('Page Coming Soon, Sorry!');">About </a><br />
               </td>
               <td>
                  <a href="#" class="a footer" onclick="alert('Page Coming Soon, Sorry!');">CONTACT US</a>
               </td>
            </tr>
         </table>
      </footer>
   </body>
</html>