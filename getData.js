function getNumberOfFloor() {
    var hotelName = 'moris'; // Assuming this is the hotel name you want to retrieve information for

    // AJAX call to retrieve the number of floors
    $.ajax({
        url: "getHotelInfo.php",
        method: "GET",
        
        success: function (response) {
            // Decode URI if needed and assign it back to response
            response = decodeURI(response);
            
            // Alert the response (for testing)
            alert(response);
            
            // Log the response to the console
            console.log("Number of floors:", response);
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
            console.log("Number of rooms:", response.rooms);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });
}
