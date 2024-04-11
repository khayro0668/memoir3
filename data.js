class Hotel {
    listOfRooms;
    listOfAvailablePillows;
    listOfAvailableMattresses;

    constructor() {
        this.generateListOfRooms();
        this.generateListOfAvailableMattresses();
        this.generateListOfAvailableMattresses();
    }

    generateListOfRooms() {
        this.listOfRooms = [];
        for (let i = 1; i <= 40; i++) {
            for (let j = 1; j <= 100; j++) {
                var room = new Room(i, j);
                this.listOfRooms.push(room);
            }
        }
    }

    generateListOfAvailablePillows() {
        this.listOfAvailablePillows = [];
        this.listOfAvailablePillows.push({ type: 'vip', number: 2000, price: 0 });
        this.listOfAvailablePillows.push({ type: 'normal', number: 2000, price: 0 });
    }

    generateListOfAvailableMattresses() {
        this.listOfAvailableMattresses = [];
        this.listOfAvailableMattresses.push({ type: 'vip', number: 2000, price: 0 });
        this.listOfAvailableMattresses.push({ type: 'normal', number: 2000, price: 0 });
    }

    borrowingPillows(typeOfPillow, numberOfBorrowingPillows) {
        for (let i = 0; i < this.listOfAvailablePillows.length; i++) {
            if (this.listOfAvailablePillows[i].type === typeOfPillow) {
                if (this.listOfAvailablePillows[i].number > 0) {
                    if (this.listOfAvailablePillows[i].number >= numberOfBorrowingPillows) {
                        this.listOfAvailablePillows[i].number -= numberOfBorrowingPillows;
                        return { resulte: true, rest: 0 };
                    } else {
                        numberOfBorrowingPillows -= this.listOfAvailablePillows[i].number;
                        this.listOfAvailablePillows[i].number = 0;
                        return { resulte: true, rest: numberOfBorrowingPillows };
                    }
                } else {
                    return { resulte: false, rest: 0 };
                }
            }
        }
    }

    returnPillows(typeOfPillow, numberOfRecoveredPillows) {
        for (let i = 0; i < this.listOfAvailablePillows.length; i++) {
            if (this.listOfAvailablePillows[i].type === typeOfPillow) {
                this.listOfAvailablePillows[i].number += numberOfRecoveredPillows;
                break;
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
    wayOfReservation;
    typeOfRoom;
    listOfAvailablePillows;
    listOfAvailableMattresses;

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
        this.durationOfReservation = calculateDaysBetweenDates(this.startDate, this.endDate);
        this.countdown = getCountdown();
        this.keyStatus = this.isReserved;
        this.bookingLink = getRandomBookingLink();
        this.residentEmail = '';
        this.wayOfReservation = getwayOfResarvation(this);
        this.typeOfRoom = 'normal';
        this.listOfAvailableMattresses = [];
        this.listOfAvailablePillows = [];
    }

    setIsReserved(value) {
        this.isReserved = value;
        this.keyStatus = value; // Assuming keyStatus should mirror isReserved
    }

    setResident(name) {
        this.resident = name;
    }

    setResidentEmail(email) {
        this.residentEmail = email;
    }

    setPrice(price) {
        this.price = price;
    }

    setDurationOfReservation(duration) {
        this.durationOfReservation = duration;
    }

    setStartDate(date) {
        this.startDate = date;
        // Optionally update durationOfReservation if endDate is set
        if (this.endDate) {
            this.durationOfReservation = calculateDaysBetweenDates(this.startDate, this.endDate);
        }
    }

    setEndDate(date) {
        this.endDate = date;
        // Optionally update durationOfReservation if startDate is set
        if (this.startDate) {
            this.durationOfReservation = calculateDaysBetweenDates(this.startDate, this.endDate);
        }
    }

    setCountdown(days) {
        this.countdown = days;
    }

    setKeyStatus(status) {
        this.keyStatus = status;
    }

    setBookingLink(link) {
        this.bookingLink = link;
    }

    setNumberOfBeds(number) {
        this.numberOfBeds = number;
    }

    setWayOfReservation(way) {
        this.wayOfReservation = way;
    }

    setTypeOfRoom(type) {
        this.typeOfRoom = type;
    }

    setListOfAvailablePillows(pillows) {
        this.listOfAvailablePillows = pillows;
    }

    setListOfAvailableMattresses(mattresses) {
        this.listOfAvailableMattresses = mattresses;
    }
}

//get way of resarvation
function getwayOfResarvation(room) {
    var ways = ['card', 'visa', 'bereau', 'ccp'];
    return ways[Math.floor(Math.random() * 4)];
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
    if (isReserved === 'Unbooked') {
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