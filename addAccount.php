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

    // Prepare an SQL statement with placeholders
    $stmt = $conn->prepare("INSERT INTO accounts (userName, userPassword, status) VALUES (?, ?, ?)");

    if (false === $stmt) {
        die('MySQL prepare error: ' . $conn->error);
    }

    // Bind parameters to the prepared statement
    $stmt->bind_param("sss", $userName, $userPassword, $status);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
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
