<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "PMS";

// Check if the POST data is set
if(isset($_POST['idofroom'], $_POST['type'], $_POST['numberfloor'], $_POST['numberofroom'], $_POST['s1'], $_POST['s2'], $_POST['s3'], $_POST['s4'], $_POST['s5'], $_POST['s6'], $_POST['s7'], $_POST['s8'])) {
    // Assign POST data to variables
    $idofroom = $_POST['idofroom'];
    $type = $_POST['type'];
    $numberfloor = $_POST['numberfloor'];
    $numberofroom = $_POST['numberofroom'];
    $s1 = $_POST['s1'];
    $s2 = $_POST['s2'];
    $s3 = $_POST['s3'];
    $s4 = $_POST['s4'];
    $s5 = $_POST['s5'];
    $s6 = $_POST['s6'];
    $s7 = $_POST['s7'];
    $s8 = $_POST['s8'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Enable error reporting for mysqli
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare an SQL statement with placeholders for inserting data into the rooms table
    $stmt = $conn->prepare("INSERT INTO rooms (idofroom, type, numberfloor, numberofroom, s1, s2, s3, s4, s5, s6, s7, s8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if (false === $stmt) {
        die('MySQL prepare error: ' . $conn->error);
    }

    // Bind parameters to the prepared statement
    $stmt->bind_param("ssiiiiiiiiii", $idofroom, $type, $numberfloor, $numberofroom, $s1, $s2, $s3, $s4, $s5, $s6, $s7, $s8);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Data inserted successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    // If POST data is not set or incomplete, provide an error message
    echo "Error: POST data not set or incomplete";
}
?>
