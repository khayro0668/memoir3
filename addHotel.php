<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "PMS";

// Check if the POST data is set
if(isset($_POST['userName']) && isset($_POST['floor']) && isset($_POST['rooms'])) {
    // Assign POST data to variables
    $userName = $_POST['userName'];
    $floors = $_POST['floor'];
    $roomsPerFloor = $_POST['rooms'];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the hotel exists in the database
    $stmt_check = $conn->prepare("SELECT * FROM hotel WHERE name = ?");
    $stmt_check->bind_param("s", $userName);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    // If the hotel exists, update its information
    if ($result->num_rows > 0) {
        $stmt_update = $conn->prepare("UPDATE hotel SET floors = ?, rooms = ? WHERE name = ?");
        $stmt_update->bind_param("iis", $floors, $roomsPerFloor, $userName);

        if ($stmt_update->execute()) {
            echo "Hotel information updated successfully";
        } else {
            echo "Error updating hotel information: " . $stmt_update->error;
        }

        $stmt_update->close();
    } else {
        // If the hotel doesn't exist, insert a new entry
        $stmt_insert = $conn->prepare("INSERT INTO hotel (name, floors, rooms) VALUES (?, ?, ?)");
        $stmt_insert->bind_param("sii", $userName, $floors, $roomsPerFloor);

        if ($stmt_insert->execute()) {
            echo "New hotel added successfully";
        } else {
            echo "Error adding new hotel: " . $stmt_insert->error;
        }

        $stmt_insert->close();
    }

    // Close the statement and connection
    $stmt_check->close();
    $conn->close();
} else {
    // If POST data is not set, provide an error message
    echo "Error: POST data not set";
}
?>
