class Hotel {
    listOfRooms;
    constructor() {
        this.listOfRooms = [];
        this.generateListOfRooms();
    }

    generateListOfRooms() {
        for (let i = 1; i <= 40; i++) {
            for (let j = 1; j <= 100; j++) {
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
    residentEmail;
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
        this.isReserved = getStatusOfReserved();
        this.resident = getRandomResident(this.isReserved);
        this.price = 0;
        this.numberOfBeds = 2 + Math.floor(Math.random() * 2);
        this.startDate = getRandomStartDate();
        this.endDate = getRandomEndDate();
        this.durationOfReservation = calculateDaysBetweenDates(this.startDate , this.endDate);
        this.countdown = getCountdown();
        this.keyStatus = this.isReserved;
        this.bookingLink = getRandomBookingLink();
        this.residentEmail = '';
    }
}

function getStatusOfReserved() {
    var val = ['Reserved', 'Unbooked'];
    return val[Math.floor(Math.random() * 2)];
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

function calculateDaysBetweenDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // عدد الثواني في يوم واحد
    const oneDay = 24 * 60 * 60 * 1000;
    // قم بحساب فارق الوقت بين التاريخين بالثواني
    const diffDays = Math.round(Math.abs((start - end) / oneDay));
    return diffDays;
}

function getCountdown() {
    // Generate random countdown (days)
    return Math.floor(Math.random() * 10) + 1;
}

function getRandomBookingLink() {
    // Generate random booking link
    return "https://example.com/booking"; // Replace with actual booking link generation logic
}
function getKeyStatusBasedOnReservation(isReserved) {
    return isReserved === "Reserved" ? "Active" : "Inactive";
}


function getRandomResident(isReserved) {
    if(isReserved === 'Unbooked'){
       return "Not booked";
    }

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