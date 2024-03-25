class Hotel {
    listOfRooms;
    constructor() {
        this.listOfRooms = [];
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

export { Hotel };
export { Room };