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

// Check if the hotel name is provided
if(isset($_GET['name'])) {
    $hotelName = $_GET['name'];

    // Prepare and execute the query to retrieve hotel information
    $stmt = $conn->prepare("SELECT floors FROM hotel WHERE name = ?");
    $stmt->bind_param("s", $hotelName);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch the result as an associative array
    $row = $result->fetch_assoc();

    // Return the result as JSON
    echo json_encode($row);

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    // If hotel name is not provided, return an error message
    echo "Error: Hotel name not provided";
}
?>
