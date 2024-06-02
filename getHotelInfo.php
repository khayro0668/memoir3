<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "PMS";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute the query to retrieve hotel information
$stmt = $conn->prepare("SELECT floors FROM hotel WHERE name = 'moris'");
   
$stmt->execute();
$result = $stmt->get_result();



// Fetch the result as an associative array
$row = $result->fetch_assoc();

echo $row['floors'];

// Return the result as JSON
//echo json_encode($row);

// Close the statement and connection
$stmt->close();
$conn->close();
?>
