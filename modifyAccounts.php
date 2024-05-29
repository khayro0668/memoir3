<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "PMS";

// Check if the POST data is set
if(isset($_POST['userName']) && isset($_POST['userPassword']) && isset($_POST['status'])) {
    // Assign POST data to variables
    $userName = $_POST['userName'];
    $userPassword = $_POST['userPassword'];
    $status = $_POST['status'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Enable error reporting for mysqli
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare an SQL statement with placeholders for updating an existing account
    $stmt = $conn->prepare("UPDATE accounts SET userPassword = ?, status = ? WHERE userName = ?");

    if (false === $stmt) {
        die('MySQL prepare error: ' . $conn->error);
    }

    // Bind parameters to the prepared statement
    $stmt->bind_param("sss", $userPassword, $status, $userName);

    // Execute the statement
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "Account updated successfully";
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
