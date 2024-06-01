function getNumberOfFloor() {
    var hotelName = "moris"; // Assuming this is the hotel name you want to retrieve information for

    // AJAX call to retrieve the number of floors
    $.ajax({
        url: "getHotelInfo.php",
        method: "GET",
        data: { name: hotelName },
        success: function (response) {
            
            console.log("Number of floors:", response.floors);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

function getNumberOfRoom() {
    var hotelName = "moris"; // Assuming this is the hotel name you want to retrieve information for

    // AJAX call to retrieve the number of rooms
    $.ajax({
        url: "getHotelInfo.php",
        method: "GET",
        data: { name: hotelName },
        success: function (response) {
            alert(response.rooms);
            console.log("Number of rooms:", response.rooms);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}
