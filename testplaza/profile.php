<?php
// Keep the session going
session_start ();
if (!isset($_SESSION['USER'])) {
    // User is not logged in, redirecting to login page
    header('Location:index.php');
} else {
    // Check there has been activity in the last 15 minutes
    if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION ['LAST_ACTIVITY'] > 900)) {
        // last request was more than 15 minutes ago
        session_destroy ();
        session_unset ();
        // Redirect to login page
        header('Location:index.php');
    } else {
        // update last activity time stamp
        $_SESSION ['LAST_ACTIVITY'] = time();
    }

    // Get the type of account logged in
    $username = $_SESSION['USER'];
    if ($username[0] == 's')
        $_SESSION['ACCOUNT_TYPE'] = 'student';
    else
        $_SESSION['ACCOUNT_TYPE'] = 'teacher';

    // Connect to the database
    require_once("php/dbconnect.php");

    // Get the users name and number
    if ($_SESSION['ACCOUNT_TYPE'] == 'student')
        $query = "SELECT fName, lName, studentNo FROM Student WHERE username = ?";
    else
        $query = "SELECT fName, lName, teacherNo FROM Teacher WHERE username = ?";

    // Prepare the mysqli statement
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, 's', $username);
    $success = mysqli_stmt_execute($stmt);
    $success || die("Database access failed: ".mysqli_stmt_error($stmt));

    // Bind the result of the statement to variables
    mysqli_stmt_bind_result($stmt, $fName, $lName, $no);

    mysqli_stmt_fetch($stmt);

    mysqli_stmt_close($stmt);
}
?>
<html>
<head>
    <title>Test Plaza</title>
    <!-- Stylesheet, icons and fonts links -->
    <link rel="icon" href="images/favicon.ico">
    <link href='https://fonts.googleapis.com/css?family=Work+Sans:400,300,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel='stylesheet' href='css/fullcalendar.css' />
    <link rel='stylesheet' media="print" href='css/fullcalendar.print.css' />
    <link rel="stylesheet" href="css/jquery.modal.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/jquery-ui.css">

    <!-- JS Script (framework) Imports -->
    <script src="scripts/jquery-1.12.2.min.js"></script>
    <script src="scripts/jquery-ui.js"></script>
    <script src="scripts/Chart.js"></script>
    <script src='scripts/moment.js'></script>
    <script src='scripts/fullcalendar.js'></script>
    <script src="scripts/jquery.modal.js" type="text/javascript" charset="utf-8"></script>
    <script src='scripts/main.js'></script>

    <script>
        // Calender (fullcalender.js) Initialisation
        $(document).ready(function() {
            // page is now ready, initialise the calendar...
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                eventClick: function(calEvent) {
                    alert('Test: ' + calEvent.title);
                },
                timeFormat: 'H:mm',
                eventMouseover: function() {
                    $(this).css('cursor', 'pointer');

                },
                // Fill the calender with retrieved data
                events: [ <?php
                    if ($_SESSION['ACCOUNT_TYPE'] == 'student') {
                        require_once("php/getstudentcalenderdates.php");
                    } else {
                        require_once("php/getteachercalenderdates.php");
                    } ?>
                ]
            });

        });
    </script>
</head>
<body>
<header>
    <div class="header title">

        <div class="header info">
            <a href="index.php">
                <img src="images/TestPlazaLogo.png" class="logo header">
            </a>
            <a href="profile.php">
                <button class="btn header">
                    <i class="fa fa-user"></i>
                    <?php
                    // Display custom menu button with users name and username
                    echo('<span class="name">'.$fName.' '.$lName.' ('.$_SESSION['USER'].')</span>');
                    ?>
                </button>
            </a>
            <button class="btn header logout" onclick="logout()">
                <i class="fa fa-power-off"></i>
                Logout
            </button>
        </div>
    </div>
</header>
<main>
    <div class="container">
        <table border='0' cellspacing="10" cellpadding="5" class="profile-view">
            <tr>
                <td width="50%">
                    <div class="info-box">
                        <div class="title">
                            <div class="section-title text">
                                Welcome to The TestPlaza Online Portal
                            </div>
                            <button class="btn">
                                <i class="fa fa-user"></i>
                                <?php
                                // Display custom welcome message with users name
                                echo('<span class="name">'.$fName.' '.$lName.'</span>');
                                ?>
                            </button>
                            <button class="btn">
                                <i class="fa fa-graduation-cap"></i>
                                <?php
                                // Display users account type
                                echo('<span class="name">');
                                echo $_SESSION['ACCOUNT_TYPE'];
                                echo '</span>';
                                ?>
                            </button>
                        </div>
                    </div>
                    <br />
                    <div class=" info-box">
                        <div class="section-title">
                           <span class="section-title text">
                           <i class="fa fa-calendar"></i>
                           &nbsp;TESTS CALENDER
                           </span>
                        </div>
                        <div id='calendar'></div>
                    </div>
                </td>
                <td>
                    <div class="info-box">
                        <div class="section-title">
                           <span class="section-title text">
                           <i class="fa fa-users"></i>
                           &nbsp;YOUR CLASSES
                           </span>
                        </div>
                        <?
                        // Get the classes associated with the user
                        require_once("php/getclasses.php");
                        ?>
                    </div>
                    <br />
                    <div class="info-box">
                        <div class="section-title">
                           <span class="section-title text">
                           <i class="fa fa-pencil"></i>
                           &nbsp;PAST TEST RESULTS
                           </span>
                        </div>
                        <?
                        // Get the past tests associated with the user
                        if ($_SESSION['ACCOUNT_TYPE'] == 'student') {
                            require_once("php/getstudentpasttests.php");
                        } else {
                            echo '<form name="form1" method="post" action="">
                                   <select name="testno" id="testselect" class="select-menu">
                                   <option value="None">Select a test</option>';
                            require_once("php/getteacherpasttests.php");
                        }
                        ?>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</main>
<div id="modal" class="modal" style="display:none">
    <p>
        <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
        <br/><br/>
        Retrieving results...
    </p>
</div>
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