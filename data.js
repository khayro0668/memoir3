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
        this.durationOfReservation = getRandomDuration();
        this.startDate = getRandomStartDate();
        this.endDate = getRandomEndDate();
        this.countdown = getRandomCountdown();
        this.keyStatus = getRandomKeyStatus();
        this.bookingLink = getRandomBookingLink();
    }
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