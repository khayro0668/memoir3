//variabels needed
var hotel;
var valueOfFloorNumberDropdawn = -1;
var valueOfRoomNumberDropdawn = -1;
var valueOfBedsNumberDropdawn = -1;
var valueOfReservedDropdawn = -1;
var numberOfFloors = 40;
var numberOfRooms = 100;
var minNumberOfBeds = 2;
var maxNumberOfBeds = 4;
var currentIdInDisplayInformation;
var currentIdInModifysettings;
var selectedRoom;
var names = [];

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
    var pageOfInformation;
    if (selectedRoom.isReserved === 'Unbooked') {
        pageOfInformation = `
        <form id="bookingForm">
        <label for="name">الاسم:</label>
        <input type="text" id="name" name="name" oninput="validateForm()"><br><br>
        
        <label for="email">عنوان البريد الإلكتروني:</label>
        <input type="email" id="email" name="email" oninput="validateForm()"><br><br>
        
        <label for="bookingDate">تاريخ الحجز:</label>
        <input type="date" id="bookingDate" name="bookingDate" oninput="validateForm()"><br><br>
        
        <label for="bookingDuration">مدة الحجز (بالأيام):</label>
        <input type="number" id="bookingDuration" name="bookingDuration" oninput="validateForm()"><br><br>
        
        <button type="button" id="displayInfoBtn" onclick="displayInfo()" disabled>عرض المعلومات</button>
    </form>
        `;
    } else {
        pageOfInformation = `
    <div class="room-details">
        <h2>Room Details</h2>
        <label for="floorNumber">Floor Number:</label>
        <input type="text" id="floorNumber" value="${selectedRoom.floorNumber}" readonly>
        
        <label for="roomNumber">Room Number:</label>
        <input type="text" id="roomNumber" value="${selectedRoom.roomNumber}" readonly>
        
        <label for="id">ID:</label>
        <input type="text" id="id" value="${selectedRoom.id}" readonly>
        
        <label for="resident">Resident:</label>
        <input type="text" id="resident" value="${selectedRoom.resident}" readonly>
        
        <label for="isReserved">Reserved:</label>
        <input type="text" value="${selectedRoom.isReserved}" readonly>

        
        <label for="price">Price:</label>
        <input type="text" id="price" value="${selectedRoom.price}" readonly>
        
        <label for="durationOfReservation">Duration of Reservation:</label>
        <input type="text" id="durationOfReservation" value="${selectedRoom.durationOfreservation} nights" readonly>
        
        <label for="startDate">Start Date:</label>
        <input type="text" id="startDate" value="${selectedRoom.startDate}" readonly>
        
        <label for="endDate">End Date:</label>
        <input type="text" id="endDate" value="${selectedRoom.endDate}" readonly>
        
        <label for="countdown">Countdown:</label>
        <input type="text" id="countdown" value="${selectedRoom.countdown} days left" readonly>
        
        <label for="keyStatus">Key Status:</label>
        <input type="text" id="keyStatus" value="${getKeyStatusBasedOnReservation(selectedRoom.isReserved)}" readonly>
        
        <label for="numberOfBeds">Number of Beds:</label>
        <input type="text" id="numberOfBeds" value="${selectedRoom.numberOfBeds}" readonly>
        
    </div>
    `;
    }
    
    document.getElementById('view-room-information').innerHTML = pageOfInformation;
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    currentIdInDisplayInformation = 'view-room-information';
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
    document.getElementById('saveRoomDetailsButton').addEventListener('click', saveRoomDetails);
}
//save the changes of the selected room 
function saveRoomDetails() {
    // Logic to update the selectedRoom object with new values from the form
    selectedRoom.floorNumber = document.getElementById('floorNumber').value;
    selectedRoom.roomNumber = document.getElementById('roomNumber').value;
    selectedRoom.id = document.getElementById('id').value;
    selectedRoom.resident = document.getElementById('resident').value;
    selectedRoom.isReserved = document.getElementById('isReserved').value;
    selectedRoom.price = document.getElementById('price').value;
    selectedRoom.durationOfreservation = document.getElementById('durationOfReservation').value.split(' ')[0]; // Assuming input format includes "nights"
    selectedRoom.startDate = document.getElementById('startDate').value;
    selectedRoom.endDate = document.getElementById('endDate').value;
    selectedRoom.countdown = document.getElementById('countdown').value.split(' ')[0]; // Assuming input format includes "days left"
    selectedRoom.numberOfBeds = document.getElementById('numberOfBeds').value;

    // Here you would typically send the updated selectedRoom object to the server or handle it according to your application's architecture
    console.log('Updated room details:', selectedRoom);
    backToHome();
    // Optionally, provide feedback to the user that the details were saved or revert the view back to the non-editable state
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

