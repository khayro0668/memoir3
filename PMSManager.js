
var hotel;

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
    var image = "216719593.jpg"; // assuming this is a static image for now
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
                <button>Add</button>
            </div>
        </div>`;
}

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

    constructor(floorNumber, roomNumber) {
        this.floorNumber = floorNumber;
        this.roomNumber = roomNumber;
        this.id = this.floorNumber.toString() + '-' + this.roomNumber.toString();
        this.resident = getRandomResident();
        this.isReserved = true;
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