<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "PMS";

// Check if the POST data is set
if(isset($_POST['userName'])) {
    // Assign POST data to a variable
     
    $userName = $_POST['userName'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Enable error reporting for mysqli
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare an SQL statement with placeholders for deleting an account
    $stmt = $conn->prepare("DELETE FROM accounts WHERE userName = ?");

    if (false === $stmt) {
        die('MySQL prepare error: ' . $conn->error);
    }

    // Bind the username parameter to the prepared statement
    $stmt->bind_param("s", $userName);

    // Execute the statement
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "Account deleted successfully";
        } else {
            echo "No account found for the provided username";
        }
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    // If POST data is not set, provide an error message
    echo "Error: POST data not set";
}
?>
