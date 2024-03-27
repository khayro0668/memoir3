
var hotel;
var listOfActions = [];

window.onload = function () {
    hotel = new Hotel();
    console.log(hotel.listOfRooms);
    generateTableOfRooms();
};

function generateTableOfRooms() {
    var table = '<table>'
    for (let i = 0; i < hotel.listOfRooms.length - 5; i += 5) {
        table += '<tr>'
        for (let j = i; j < i + 5; j++) {
            table += '<td>' + generateDiv(hotel.listOfRooms[j]) + '</td>';
        }
        table += '</tr>'
    }

    table += '</table>';
    document.getElementById('showInformation').innerHTML = table;
}

function generateDiv(room) {
    var image = "216719593.jpg";
    var title = room.id;
    var price = room.price;
    return `
        <div class="box">
            <div class="img-box">
                <img class="images" src="${image}" alt="Room Image">
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>$${price}.00</h2>
                <button onclick="showInformationOfSelectedRoom('${room}')" id = "button-of-card">visit</button>
            </div>
        </div>`;
}

function showInformationOfSelectedRoom(room) {
    var informationDiv = `
    <div class = "eventBar">
      <button onclick="goBacktoLastAction('container')"><i class="fa-solid fa-turn-up"></i></button>
      <button onclick = "generateDivOfClock()"><i class="fa-solid fa-clock"></i></button>
   </div>
   <div class = "showInformationOfRoom">
      <h1></h1>
   </div>
    `;

    listOfActions.push(document.getElementById('container').innerHTML);
    document.getElementById('container').innerHTML = informationDiv;
}

function goBacktoLastAction(id) {
    document.getElementById(id).innerHTML = listOfActions[listOfActions.length - 1];
    listOfActions.pop();
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
    }
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