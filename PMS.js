//variabels needed
var hotel;
var valueOfFloorNumberDropdawn = -1;
var valueOfRoomNumberDropdawn = -1;
var valueOfBedsNumberDropdawn = -1;
var valueOfReservedDropdawn = -1;
var valueOfFloorNumberDropdawnInSettings = -1;
var valueOfRoomNumberDropdawnInSettings = -1;
var numberOfFloors;
var numberOfRooms;
var minNumberOfBeds = 2;
var maxNumberOfBeds = 4;
var currentIdInDisplayInformation;
var currentIdInModifysettings;
var currentPage;
//
var selectedRoom;
//

var roomtypes = [
'vip' , '8 bed mixed room' , '6 bed female room' , '6 bed mixed room' ,
 '4 bed mixed room'
];

/////////
var currentUser = 'admin';
var names = [];
var admin = { id: 0, name: "admin", password: "12" };
var accounts = [
    { id: 1, name: "wassim", password: "1" },
    { id: 2, name: "mostafa", password: "1" },
    { id: 3, name: "khayrou", password: "1" },
    { id: 4, name: "younes", password: "1" }
];

var statusOfLogIn = 'admin';
var valueOfFirstDateInPeriode = -1;
var valueOfSecondeDateInPeriode = -1;
var valueOfDate = -1;
var selectedCountry = -1;
var selectedGender = -1;
var typeOfSort = -1;
var listOfNames = [];

var valueOfTypeRoomDropDown = -1;
var valueOfMixedStatus = -1;

var arrayOfRoomTypes = [
    {type : "All" , femaleBeds :-1 , maleBeds :-1 , isMixed : true} ,
    {type : "Private mixed room" , femaleBeds :1 , maleBeds :1 , isMixed : true} ,
    {type : "Private un mixed room" , femaleBeds :2 , maleBeds :2 , isMixed : false} ,
    {type : "8 bed mixed room" , femaleBeds :8 , maleBeds :8 , isMixed : true} ,
    {type : "6 bed female room" , femaleBeds : 6 , maleBeds : 0 , isMixed : false} ,
    {type : "6 bed mixed room" , femaleBeds : 6 , maleBeds : 6 , isMixed : true} ,
    {type : "4 bed mixed room" , femaleBeds : 4 , maleBeds : 4 , isMixed : false} ,
];

//onload function
window.onload = function () {
    hotel = new Hotel();
    numberOfFloors = hotel.numberOfFloors;
    numberOfRooms = hotel.numberOfRooms;
    currentPage = 'login-page';
    createBarOfOptionsOfselectedRoom();
    generateTableOfRooms(hotel.listOfRooms, valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn);
    createNeededDropDowns(numberOfFloors, numberOfRooms, maxNumberOfBeds, minNumberOfBeds);
    createSettingPricePage(numberOfFloors, numberOfRooms);
    generatePageOfArchives();
    generatePageOfAccount();
    generateFirstPage();
    generatePageOfOthersPrice();
    generateCalendar();
    initilaizeNames();
    generatePageOfPayment();
    rempleID();
    goToPMS();
}


function initilaizeNames() {
    for (let i = 0; i < hotel.listOfRooms.length; i++) {
        if (hotel.listOfRooms[i].isReserved === 'Reserved') {
            listOfNames.push(hotel.listOfRooms[i].resident);
        }
    }
}

// go to PMS
function goToPMS() {
    document.getElementById('pms-app').style.display = 'flex';
    document.getElementById(currentPage).style.display = 'none';
    currentIdInDisplayInformation = "view-rooms";
    currentIdInModifysettings = "main-selection-bar";
    currentPage = 'container';
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
    document.getElementById(currentIdInModifysettings).style.display = 'block';
    document.getElementById('menu-of-options').style.display = 'block';

    if(currentUser === 'admin'){
        document.getElementById('remaning-div').style.height = '98px';
    }
}

/////////////////////
function selectRoom(room) {
    selectedRoom = hotel.listOfRooms.find(r => r.id === room.id);
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    document.getElementById(currentIdInModifysettings).style.display = 'none';

    if (selectedRoom.isReserved === 'Unbooked') {
        reserveSelectedRoom();
    } else {
        currentIdInModifysettings = 'room-selection-bar';
        document.getElementById(currentIdInModifysettings).style.display = 'block';
        showInformationOfSelectedRoom();
    }
}

//function to get a page to reserve room
function reserveSelectedRoom() {
    document.getElementById('reservation-of-room').innerHTML = `
    <div class="container11">
    <div class="container22">
        <div class="column-container">
            <div class="column">
                <label class="label-of-reserve" for="input1">First name</label>
                <input class="input-of-reserve" type="text" id="input1">
                <label class="label-of-reserve" for="input2">Last name</label>
                <input class="input-of-reserve" type="text" id="input2">
                <label class="label-of-reserve" for="input3">Duration (in days)</label>
                <input class="input-of-reserve" type="number" id="input3">
                <label class="label-of-reserve" for="input4">Start date</label>
                <input class="input-of-reserve" type="date" id="input4">
            </div>
            <div class="column">
                <label class="label-of-reserve" for="input5">Email</label>
                <input class="input-of-reserve" type="email" id="input5">
                <label class="label-of-reserve" for="input6">Arrival time</label>
                <input class="input-of-reserve" type="time" id="input6" style="width:200px;">
                <label class="label-of-reserve" for="input7" style="padding:8px;margin-top:10px;">Credit card number</label>
                <input class="input-of-reserve" type="text" id="input7">
                <label class="label-of-reserve" for="input8" >Country</label>
                <select class="select-of-reserve" id="input8"></select>
            </div>
        </div>
        <div class="button-container1">
            <button class="btn-of-reserve" type="button" onclick="ReserverThisRoom(selectedRoom)" id="reserveButton" >Reserve</button>
            <button class="btn-of-reserve" type="button">Cancel</button>
        </div>
    </div>
</div>
        `;

    currentIdInModifysettings = 'unbookedRoom-selection-bar';
    document.getElementById(currentIdInModifysettings).style.display = 'block';
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    currentIdInDisplayInformation = 'reservation-of-room';
    populateCountries();
    document.getElementById('reservation-of-room').querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', checkForm);
    });

    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
}

//create a page to display the resident information of selected room
function showInformationOfResidentInSelectedRoom() {
    var pageOfInformation = `
    <div class="room-details">
        <h2>Resident Details</h2>
        
        <label for="resident">Resident:</label>
        <input type="text" id="resident" value="${selectedRoom.resident}" readonly>
        
        <label for="floorNumber">E-mail:</label>
        <input type="text" id="floorNumber" value="${selectedRoom.residentEmail}" readonly>
        <label for="startDate">Start Date:</label>
        <input type="text" id="startDate" value="${selectedRoom.startDate}" readonly>
        
        <label for="endDate">End Date:</label>
        <input type="text" id="endDate" value="${selectedRoom.endDate}" readonly>
        
        <label for="durationOfReservation">Duration of Reservation:</label>
        <input type="text" id="durationOfReservation" value="${selectedRoom.durationOfReservation} nights" readonly>
    </div>
    `;

    document.getElementById('view-resident-information').innerHTML = pageOfInformation;
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    currentIdInDisplayInformation = 'view-resident-information';
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
}

//create a page to display the selected room information
function showInformationOfSelectedRoom() {
    var roomType;
    if(selectedRoom.statusOfMixed) {
        roomType = 'mixed';
    }else{
        roomType = 'unmixed';
    }

    var pageOfInformation = `
    <div class="room-details">
        <h2>Room Details</h2>
        <label for="floorNumber">Floor Number:</label>
        <input type="text" id="floorNumber" value="${selectedRoom.floorNumber}" readonly>
        
        <label for="roomNumber">Room Number:</label>
        <input type="text" id="roomNumber" value="${selectedRoom.roomNumber}" readonly>

        <label for="isReserved">Reserved:</label>
        <input type="text" value="${selectedRoom.isReserved}" readonly>

        
        <label for="price">Price:</label>
        <input type="text" id="price" value="${selectedRoom.price}" readonly>

        
        <label for="keyStatus">Room Type:</label>
        <input type="text" id="keyStatus" value="${roomType}" readonly>
        
        <label for="numberOfBeds">Number of Beds:</label>
        <input type="text" id="numberOfBeds" value="${selectedRoom.numberOfBeds}" readonly>
        
    </div>
    `;

    document.getElementById('view-room-information').innerHTML = pageOfInformation;
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    currentIdInDisplayInformation = 'view-room-information';
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
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

//////////////////////

//page of edit some information
function setInformation() {
}

// create page to modify information of selected room
function modifyInformationOfSelectedRoom() {
    var pageOfModifyInformationOfSelectedRoom = `
    <div class="container111">
    <div class="container222">
        <div class="column1">
            <label class="label-of-modify" for="last-name-modification">Last Name</label>
            <input class="lnput-of-modify" type="text" id="last-name-modification" name="input1">
            <label class="label-of-modify" for="email-modification">Email</label>
            <input class="lnput-of-modify" type="email" id="email-modification" name="input2">
            <label class="label-of-modify" for="duration-modification">Duration(in days)</label>
            <input class="lnput-of-modify" type="number" id="duration-modification" name="input3">
            <label class="label-of-modify" for="pillow-modification">Vip pillows number</label>
            <input class="lnput-of-modify" type="number" id="pillow-modification" name="input4">
            <button type="button" class="btn1" onclick="updateInformationOfResedent()">Update</button>
        </div>
        <div class="column1">
            <label class="label-of-modify" for="first-name-modification">First Name</label>
            <input class="lnput-of-modify" type="text" id="first-name-modification" name="input5">
            <label class="label-of-modify" for="chair-modification">Chairs number</label>
            <input class="lnput-of-modify" type="number" id="chair-modification" name="input6">
            <label class="label-of-modify" for="snack-modification">Snacks number</label>
            <input class="lnput-of-modify" type="number" id="snack-modification" name="input7">
            <label class="label-of-modify" for="beds-modification">Beds number</label>
            <input class="lnput-of-modify" type="number" id="beds-modification" name="input8">
            <button type="button" class="btn2">Cancel reservation</button>
        </div>
    </div>
</div>
`;

    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    currentIdInDisplayInformation = 'modify-room-information';
    document.getElementById(currentIdInDisplayInformation).innerHTML = pageOfModifyInformationOfSelectedRoom;
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
}

function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const startDate = document.getElementById('startDate').value;
    const duration = document.getElementById('duration').value;
    const pillows = document.getElementById('pillows').value;
    selectedRoom.setResident(name);
}


function cancelReservation() {
   
}

//generate account of admin
function generateFirstPage() {
    document.getElementById('container-of-cards-of-login-page').innerHTML = `
    <div class="card-of-login-type" onclick="showPopup(${JSON.stringify(admin).replace(/"/g, '&quot;')})">
                <div class="emoji">👨‍💼</div>
                <span class="label">Admin</span>
            </div>

            <div class="card-of-login-type" onclick="getPageOfAccount()" style="margin-left: 50px;">
                <div class="emoji">👨‍🔧</div>
                <span class="label">Employee</span>
            </div>
    `;

}
function ReserverThisRoom(selectedRoom){
    
    selectedRoom.setFirstName(document.getElementById('input1').value);
    selectedRoom.setLastName(document.getElementById('input2').value);
    selectedRoom.setDuration(parseInt(document.getElementById('input3').value));
    selectedRoom.setStartDate(new Date(document.getElementById('input4').value));
    selectedRoom.setEmail(document.getElementById('input5').value);
    selectedRoom.setArrivalTime(document.getElementById('input6').value);
    selectedRoom.setCreditCardNumber(document.getElementById('input7').value);
    selectedRoom.setCountry(document.getElementById('input8').value);
    selectedRoom.isReserved = 'Reserved';
    console.log('its done ');

}
