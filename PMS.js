//variabels needed
var hotel;
var valueOfFloorNumberDropdawn = -1;
var valueOfRoomNumberDropdawn = -1;
var valueOfBedsNumberDropdawn = -1;
var valueOfReservedDropdawn = -1;
var valueOfFloorNumberDropdawnInSettings = -1;
var valueOfRoomNumberDropdawnInSettings = -1;
var numberOfFloors = 40;
var numberOfRooms = 100;
var minNumberOfBeds = 2;
var maxNumberOfBeds = 4;
var currentIdInDisplayInformation;
var currentIdInModifysettings;
var currentPage;
var selectedRoom;
var currentUser;
var names = [];
var admin = {id : 0 , name : "admin" , password : "12"};
var accounts = [
    { id: 1, name: "wassim", password: "1" },
    { id: 2, name: "mostafa", password: "1" },
    { id: 3, name: "khayrou", password: "1" },
    { id: 4, name: "younes", password: "1" }
  ];
var statusOfLogIn;

//onload function
window.onload = function () {
    hotel = new Hotel();
    currentPage = 'login-page';
    createBarOfOptionsOfselectedRoom();
    generateTableOfRooms(hotel.listOfRooms, valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn);
    createNeededDropDowns(numberOfFloors, numberOfRooms, maxNumberOfBeds, minNumberOfBeds);
    createSettingPricePage(numberOfFloors, numberOfRooms);
    generatePageOfArchives();
    generatePageOfAccount();
    generateClock();
    generateFirstPage();
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
        <form id="bookingForm">
        <label for="name">name:</label>
        <input type="text" id="name" name="name" oninput="validateForm()"><br><br>
        
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" oninput="validateForm()"><br><br>
        
        <label for="bookingDate">start date :</label>
        <input type="date" id="bookingDate" name="bookingDate" oninput="validateForm()"><br><br>
        
        <label for="bookingDuration"> duration :</label>
        <input type="number" id="bookingDuration" name="bookingDuration" oninput="validateForm()"><br><br>
        
        <button type="button" id="displayInfoBtn" onclick="displayInfo()" disabled> Boocked </button>
    </form>
        `;
    currentIdInModifysettings = 'unbookedRoom-selection-bar';
    document.getElementById(currentIdInModifysettings).style.display = 'block';
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    currentIdInDisplayInformation = 'reservation-of-room';
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
        <input type="text" id="durationOfReservation" value="${selectedRoom.durationOfreservation} nights" readonly>
    </div>
    `;

    document.getElementById('view-resident-information').innerHTML = pageOfInformation;
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    currentIdInDisplayInformation = 'view-resident-information';
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
}

//create a page to display the selected room information
function showInformationOfSelectedRoom() {
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

        
        <label for="keyStatus">Key Status:</label>
        <input type="text" id="keyStatus" value="${getKeyStatusBasedOnReservation(selectedRoom.isReserved)}" readonly>
        
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

//get information of payment
function getInformationOfPayment() {
    // arwa7 hna zatchi
}

//////////////////////

//page of edit some information
function setInformation() {
}

// create page to modify information of selected room
 function modifyInformationOfSelectedRoom() {
    var pageOfModifyInformationOfSelectedRoom = `
   <div class="page-of-modify-information-of-selected-room"> <form id="reservationForm">
    <label for="name" style="display:'block';margin:10px 0">name:</label>
    <input type="text" id="name" name="name" value="${selectedRoom.resident}" style="margin:5px 0;display:block;padding:10px;border: 1px solid #005A9C;border-radius:5px;">

    <label for="email" style="display:'block';margin:10px 0">E-mail:</label>
    <input type="email" id="email" name="email" value="${selectedRoom.residentEmail}" style="margin:5px 0;display:block;padding:10px;border: 1px solid #005A9C;border-radius:5px;">

    <label for="startDate" style="display:'block';margin:10px 0">start date:</label>
    <input type="date" id="startDate" name="startDate" ${selectedRoom.startDate} style="margin:5px 0;display:block;padding:10px;border: 1px solid #005A9C;border-radius:5px;">

    <label for="duration" style="display:'block';margin:10px 0">reservation period(in days):</label>
    <input type="number" id="duration" name="duration" ${selectedRoom.durationOfreservation} style="margin:5px 0;display:block;padding:10px;border: 1px solid #005A9C;border-radius:5px;">

    <label for="pillows" style="display:'block';margin:10px 0">pillows number:</label>
    <input type="number" id="pillows" name="pillows" min="1" style="margin:5px 0;display:block;padding:10px;border: 1px solid #005A9C;border-radius:5px;">

    <button type="button" onclick="cancelReservation() style="cursor:pointer;margin:5px 0;display:block;padding:10px;border: 1px solid #005A9C;border-radius:5px;">cancel resrvation</button>
    <button type="button" onclick="submitForm() style="cursor:pointer;margin:5px 0;display:block;padding:10px;border: 1px solid #005A9C;border-radius:5px;"">show infos</button>
</form></div>


`;

    document.getElementById('view-room-information').style.display = 'none';
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
    // هنا يمكنك إضافة الكود اللازم لإلغاء الحجز، مثل تنظيف النموذج أو تنفيذ طلب إلى الخادم
    document.getElementById('reservationForm').reset();
    alert('تم إلغاء الحجز بنجاح.');
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
