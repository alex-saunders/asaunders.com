<?php
// Keep the current session going
session_start();
$user = $_SESSION['USER'];
// Destroy the current session
session_unset();
session_destroy();
// Redirect the user
header('Location: index.php');
?>
<!-- Basic HTML page in case redirect fails -->
<!DOCTYPE html>
<html>
<head>
    <title>Logout</title>
</head>
<body>
<h1>Logout</h1>
<b> Goodbye <i>
        <?php
        echo $user;
        ?>
    </i>
</b>
<br />
<b><a href="index.php">Login</a></b>
</body>
</html>

