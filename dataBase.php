<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "PMS";

// Check if the POST data is set
if(isset($_POST['user']) && isset($_POST['event'])) {
    // Assign POST data to variables
    $name = $_POST['user'];
    $event = $_POST['event'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Enable error reporting for mysqli
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare an SQL statement with placeholders
    $stmt = $conn->prepare("INSERT INTO events (User, Events, Tiime, Status) VALUES (?, ?, ?, ?)");

    if (false === $stmt) {
        die('MySQL prepare error: ' . $conn->error);
    }

    // Data to insert
    $time = date("Y-m-d H:i:s");  // Corrected for proper datetime format

    // Bind parameters to the prepared statement
    $stmt->bind_param("ssss", $name, $event, $time, $name);  // Corrected the types to match the new data structure

    // Execute the statement
    if ($stmt->execute()) {
        echo "New records created successfully";
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