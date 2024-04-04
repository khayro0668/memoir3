//variabels needed
var hotel;
var valueOfFloorNumberDropdawn = -1;
var valueOfRoomNumberDropdawn = -1;
var valueOfBedsNumberDropdawn = -1;
var valueOfReservedDropdawn = -1;
var numberOfFloors = 10;
var numberOfRooms = 20;
var minNumberOfBeds = 2;
var maxNumberOfBeds = 4;
var currentIdInDisplayInformation;
var currentIdInModifysettings;
var selectedRoom;

//onload function
window.onload = function () {
    hotel = new Hotel();
    createBarOfOptionsOfselectedRoom();
    currentIdInDisplayInformation = "view-rooms";
    currentIdInModifysettings = "main-selection-bar";
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
    document.getElementById(currentIdInModifysettings).style.display = 'block';
    generateTableOfRooms(hotel.listOfRooms, valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn);
    createNeededDropDowns(numberOfFloors, numberOfRooms, maxNumberOfBeds, minNumberOfBeds);
}

function selectRoom(room) {
    selectedRoom = hotel.listOfRooms.find(r => r.id === room.id);
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    document.getElementById(currentIdInModifysettings).style.display = 'none';
    currentIdInModifysettings = 'room-selection-bar';
    document.getElementById(currentIdInModifysettings).style.display = 'block';
}

//create a page to display the selected room information
function showInformationOfSelectedRoom() {
    var pageOfInformation = `
    <div class="room-details">
     <h2>Room Details</h2>
     <p><strong>Floor Number:</strong> <span id="floorNumber">${selectedRoom.floorNumber}</span></p>
     <p><strong>Room Number:</strong> <span id="roomNumber">${selectedRoom.roomNumber}</span></p>
     <p><strong>ID:</strong> <span id="id">${selectedRoom.id}</span></p>
     <p><strong>Resident:</strong> <span id="resident">${selectedRoom.resident}</span></p>
     <p><strong>Reserved:</strong> <span id="isReserved">${selectedRoom.isReserved}</span></p>
     <p><strong>Price:</strong> <span id="price">${selectedRoom.price}</span></p>
     <p><strong>Duration of Reservation:</strong> <span id="durationOfReservation">${selectedRoom.durationOfreservation} nights</span></p>
     <p><strong>Start Date:</strong> <span id="startDate">${selectedRoom.startDate}</span></p>
     p><strong>End Date:</strong> <span id="endDate">${selectedRoom.endDate}</span></p>
     <p><strong>Countdown:</strong> <span id="countdown">${selectedRoom.countdown} days left</span></p>
     <p><strong>Key Status:</strong> <span id="keyStatus">${getStatusOfKey(selectedRoom)}</span></p>
     <p><strong>Booking Link:</strong> <a href="#" id="bookingLink">Book Now</a></p>
     <p><strong>Number of Beds:</strong> <span id="numberOfBeds">${selectedRoom.numberOfBeds}</span></p>
  </div>
  `;
    document.getElementById('view-room-information').innerHTML = pageOfInformation;
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    currentIdInDisplayInformation = 'view-room-information';
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
}

//function to back to home page
function backToHome() {
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    document.getElementById(currentIdInModifysettings).style.display = 'none';
    currentIdInDisplayInformation = "view-rooms";
    currentIdInModifysettings = "main-selection-bar";
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
    document.getElementById(currentIdInModifysettings).style.display = 'block';
}

