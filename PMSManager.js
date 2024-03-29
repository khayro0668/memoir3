var hotel;
var listOfActions = [];

window.onload = function () {
    hotel = new Hotel();
        generateTableOfRooms('showInformation');
};

function generateTableOfRooms(id) {
    var table = '<table>'
    for (let i = 0; i < hotel.listOfRooms.length - 8; i += 8) {
        table += '<tr>'
        for (let j = i; j < i + 8; j++) {
            table += '<td>' + generateDiv(hotel.listOfRooms[j]) + '</td>';
        }
        table += '</tr>'
    }

    table += '</table>';
    document.getElementById(id).innerHTML = table;
}

function generateDiv(room) {
    var title = room.id;
    var isreserved = room.isReserved;
    return `
        <div class="box">
            
            <p class="status">TAKEN</p>
            <p class="pr">${title}</p>
            <button onclick="showInformationOfSelectedRoom(${JSON.stringify(room).replace(/"/g, '&quot;')})" id="button-of-card">visit</button>
            
        </div>`;
}


function showInformationOfSelectedRoom(room) {
    const foundRoom = hotel.listOfRooms.find(r => r.id === room.id);

    if (!foundRoom) {
        console.error("Room not found.");
        return;
    }

    var informationDiv = `
        <div class="eventBar">
            <button onclick="goBacktoLastAction()"><i class="fa-solid fa-turn-up"></i></button>
            <button><i class="fa-solid fa-clock"></i></button>
        </div>
        <div class="showInformationOfRoom">
    <h2>${room.id}</h2>
    <div class="roomInfo">
        <label>Price:</label>
        <input type="number" value="${room.price}">
    </div>
    <div class="roomInfo">
        <label>Number of Beds:</label>
        <input type="number" value="${room.numberOfBeds}">
    </div>
    <div class="roomInfo">
        <label>Resident:</label>
        <input type="text" value="${room.resident}">
    </div>
    <div class="roomInfo">
        <label>Is Reserved:</label>
        <input type="checkbox" ${room.isReserved ? 'checked' : ''}>
    </div>
    <div class="roomInfo">
        <label>Rating:</label>
        <input type="number" value="${room.rating}">
    </div>
    <div class="roomInfo">
        <label>Duration of Reservation:</label>
        <input type="number" value="${room.durationOfReservation}">
    </div>
    <div class="roomInfo">
        <label>Start Date:</label>
        <input type="date" value="${room.startDate}">
    </div>
    <div class="roomInfo">
        <label>End Date:</label>
        <input type="date" value="${room.endDate}">
    </div>
    <div class="roomInfo">
        <label>Countdown:</label>
        <input type="number" value="${room.countdown}">
    </div>
    <div class="roomInfo">
        <label>Key Status:</label>
        <input type="text" value="${room.keyStatus}">
    </div>
    <div class="roomInfo">
        <label>Booking Link:</label>
        <input type="text" value="${room.bookingLink}">
    </div>
    <!-- Add more room information here as needed -->
    <button onclick="saveRoomInformation(${JSON.stringify(room).replace(/"/g, '&quot;')})">Save</button>

</div>
`;

    document.getElementById('container').innerHTML = informationDiv;
}

function saveRoomInformation(room) {
    console.log("Saving room information...");
    
    // Log initial room object
    console.log("Initial room object:", room);

    var inputs = document.querySelectorAll('.roomInfo input');
    inputs.forEach(input => {
        var label = input.previousElementSibling.textContent.trim();
        var value = input.value;

        // Update room object based on label
        switch(label) {
            case 'Price:':
                room.price = parseFloat(value);
                break;
            case 'Number of Beds:':
                room.numberOfBeds = parseInt(value);
                break;
            case 'Resident:':
                room.resident = value;
                break;
            case 'Is Reserved:':
                room.isReserved = input.checked;
                break;
            case 'Rating:':
                room.rating = parseInt(value);
                break;
            case 'Duration of Reservation:':
                room.durationOfReservation = parseInt(value);
                break;
            case 'Start Date:':
                room.startDate = value;
                break;
            case 'End Date:':
                room.endDate = value;
                break;
            case 'Countdown:':
                room.countdown = parseInt(value);
                break;
            case 'Key Status:':
                room.keyStatus = value;
                break;
            case 'Booking Link:':
                room.bookingLink = value;
                break;
        }
    });

 // Log updated room object
 console.log("Updated room object:", room);

 // Find the index of the room in the hotel list
 const index = hotel.listOfRooms.findIndex(r => r.id === room.id);
 // Update the room object in the hotel list
 hotel.listOfRooms[index] = room;

 // Log updated hotel list
 console.log("Updated hotel list:", hotel.listOfRooms);

 // Now the room object has been updated with the new values in the hotel list
 console.log("Room information saved successfully.");
 showMessage("Room information saved successfully.");
}



function showMessage(message) {
    // Display the message in an alert box or any other UI element
    alert(message);
}


function goBacktoLastAction() {
   generateDivHome('container');
   generateTableOfRooms('showInformation');
}

/*                                dropdown function                             */
// JavaScript for Dropdown
document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownContent = document.querySelector(".dropdown-content");
    const dropdownOptions = document.querySelectorAll(".dropdown-content a");

    dropdownBtn.addEventListener("click", function () {
        dropdownContent.classList.toggle("show");
    });
    
    // Event listener for each option
    dropdownOptions.forEach(function (option) {
        option.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default action of the link
            const selectedOption = event.target.textContent;
            dropdownBtn.textContent = selectedOption; // Set button text to selected option
        });
    });

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches(".dropdown-btn")) {
            const dropdowns = document.querySelectorAll(".dropdown-content");
            dropdowns.forEach(function (dropdown) {
                if (dropdown.classList.contains("show")) {
                    dropdown.classList.remove("show");
                }
            });
        }
    }
});

/********************************************************/
/********************************************************/

/********************************************************************************/

/*                            classes                                 */
class Hotel {
    listOfRooms;
    constructor() {
        this.listOfRooms = [];
        this.generateListOfRooms();
    }

    generateListOfRooms() {
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 20; j++) {
                var room = new Room(i, j);
                this.listOfRooms.push(room);
            }
        }
    }
}

class Room {

    floorNumber;
    roomNumber;
    id;
    resident;
    isReserved;
    rating;
    price;
    durationOfreservation;
    startDate;
    endDate;
    countdown;
    keyStatus;
    BookingLink;
    numberOfBeds;

    constructor(floorNumber, roomNumber) {
        this.floorNumber = floorNumber;
        this.roomNumber = roomNumber;
        this.id = this.floorNumber.toString() + '-' + this.roomNumber.toString();
        this.resident = getRandomResident();
        this.isReserved = true;
        this.price = 0;
        this.numberOfBeds = 2 + Math.floor(Math.random() * 2);
        this.rating = getRandomRating();
        this.durationOfReservation = getRandomDuration();
        this.startDate = getRandomStartDate();
        this.endDate = getRandomEndDate();
        this.countdown = getRandomCountdown();
        this.keyStatus = getRandomKeyStatus();
        this.bookingLink = getRandomBookingLink();
    }
}

// Sample functions to generate random values for properties
function getRandomRating() {
    // Generate random rating between 0 and 5
    return Math.floor(Math.random() * 6);
}

function getRandomDuration() {
    // Generate random duration between 1 and 10 days
    return Math.floor(Math.random() * 10) + 1;
}

function getRandomStartDate() {
    // Generate random start date (year-month-day)
    const year = 2024;
    const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
    const day = Math.floor(Math.random() * 28) + 1; // Random day between 1 and 28
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}
function getRandomEndDate() {
    // Generate random end date (year-month-day)
    const startDate = new Date(getRandomStartDate());
    const endDate = new Date(startDate.getTime() + (Math.floor(Math.random() * 10) + 1) * 24 * 60 * 60 * 1000); // Add random duration in milliseconds
    return endDate.toISOString().split('T')[0];
}


function getRandomCountdown() {
    // Generate random countdown (days)
    return Math.floor(Math.random() * 10) + 1;
}

function getRandomKeyStatus() {
    // Generate random key status
    const statuses = ['Available', 'Occupied', 'Out of Service'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomBookingLink() {
    // Generate random booking link
    return "https://example.com/booking"; // Replace with actual booking link generation logic
}


function getRandomResident() {
    const names = [
        "Alice",
        "Bob",
        "Charlie",
        "David",
        "Eva",
        "Frank",
        "Grace",
        "Hannah",
        "Ivan",
        "Julia",
        "Kevin",
        "Linda",
        "Michael",
        "Nancy",
        "Olivia"
    ];
    return names[Math.floor(Math.random() * names.length)];
}