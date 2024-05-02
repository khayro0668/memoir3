class Hotel {
    nameOfHotel;
    listOfRooms;
    listOfAvailablePillows;
    listOfAvailableMattresses;
    listOfAvailabelServices;
    archives;
    listOfAccount;
    numberOfFloors;
    numberOfRooms;

    constructor() {
        this.nameOfHotel = "wassim hotel";
        this.generateListOfRooms();
        this.generateListOfAvailableMattresses();
        this.generateListOfAvailableMattresses();
        this.generateListOfAvailabelServices();
        this.generateArchive();
        this.generateListOfAccount();
        this.numberOfFloors = 10;
        this.numberOfRooms = 30;
    }

    generateListOfAccount() {
        this.listOfAccount = [];
        this.addAccount('mostafa' , '1');
        this.addAccount('mohamed' , '1');
        this.addAccount('wassim' , '1');
        this.addAccount('younes' , '1');
        this.addAccount('khayro' , '1');
    }

    generateListOfRooms() {
        this.listOfRooms = [];
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 30; j++) {
                var room = new Room(i, j);
                this.listOfRooms.push(room);
            }
        }
    }

    generateArchive() {
        this.archives = [];
    }

    addEventInArchives(employe, event) {
        var newEvent = new Event(employe, event);
        this.archives.push(newEvent);
    }

    addAccount(userName, password) {
        var newAccount = new Account(userName, password);
        this.listOfAccount.push(newAccount);
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

    generateListOfAvailabelServices() {
        this.listOfAvailabelServices = [];
        this.listOfAvailabelServices.push({ type: 'vip-room', number: 2000, price: 0 });
        this.listOfAvailabelServices.push({ type: 'normal-room', number: 2000, price: 0 });
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
    Corrections;
    resident;
    countryOfResident;
    genderOfResident;
    residentEmail;
    isReserved;
    price;
    totalPayment;
    remaningPayment;
    paidPayment;
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
        this.Corrections = Math.floor(Math.random()*100);
        this.roomNumber = roomNumber;
        this.id = this.floorNumber.toString() + '-' + this.roomNumber.toString();
        this.isReserved = getStatusOfReserved();
        this.resident = getRandomResident(this.isReserved);
        this.price = 0;
        this.numberOfBeds = 2 + Math.floor(Math.random() * 2);
        this.startDate = getRandomStartDate();
        this.endDate = getRandomEndDate();

        if(isDate1GreaterThanDate2(this.startDate , this.endDate)){
            var temp = this.startDate;
            this.startDate = this.endDate;
            this.endDate = temp;
        }
        
        this.durationOfReservation = calculateDaysBetweenDates(this.startDate, this.endDate);
        this.countdown = getCountdown();
        this.keyStatus = this.isReserved;
        this.bookingLink = getRandomBookingLink();
        this.residentEmail = '';
        this.wayOfReservation = getwayOfResarvation(this);
        this.typeOfRoom = 'normal';
        this.listOfAvailableMattresses = [];
        this.listOfAvailablePillows = [];
        this.countryOfResident = getRandomCountry();
        this.genderOfResident = getRandomGender();
        this.totalPayment = 100 + Math.floor(Math.random() * 900);
        this.remaningPayment = Math.floor(Math.random() * this.totalPayment);
        this.paidPayment = this.totalPayment - this.remaningPayment;
    }

    setIsReserved(value) {
        this.isReserved = value;
        this.keyStatus = value;
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
        this.durationOfReservation = 90;
    }

    setStartDate(date) {
        this.startDate = date;
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
      var start = new Date(startDate);
      var end = new Date(endDate);
  
      // حساب الفرق بالملي ثانية
      var difference = end - start;
  
      // تحويل الفرق من الملي ثانية إلى أيام
      var days = difference / (1000 * 3600 * 24);
  
      // إرجاع عدد الأيام المحصورة
      return Math.round(days);  // استخدم Math.round للحصول على قيمة صحيحة
  
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

//calculateEndDate
function calculateEndDate(startDate, period) {
    // Create a new Date object from the startDate
    let endDate = new Date(startDate);

    // Add the period (in days) to the startDate
    endDate.setDate(endDate.getDate() + parseInt(period));

    // Return the new endDate
    return endDate;
}

function getRandomCountry() {
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
        "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
        "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
        "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
        "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde",
        "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
        "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
        "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
        "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica",
        "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
        "Equatorial Guinea", "Eritrea", "Estonia", "Swaziland",
        "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
        "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
        "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
        "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
        "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
        "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
        "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
        "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
        "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia",
        "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
        "Niger", "Nigeria", "North Korea", "North Macedonia",
        "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
        "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
        "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
        "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
        "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
        "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan",
        "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
        "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
        "United States of America", "Uruguay", "Uzbekistan", "Vanuatu",
        "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    return countries[(Math.floor(Math.random() * countries.length))];
}

function getRandomGender() {
    const Gender = ['Female' , 'Male'];
    return Gender[Math.floor(Math.random() * Gender.length)];
}
class Event {
    employe;
    event;

    constructor(employe, event) {
        this.employe = employe;
        this.event = event;
    }
}


class Account {
    userName;
    password;

    constructor(userName, password) {
        this.userName = userName;
        this.password = password;
    }
}
