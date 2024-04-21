//view availabel rooms
function generateTableOfRooms(listOfRooms, valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn) {
    names = [];
    var table = '<table>';
    let i = 0;
    while (i < listOfRooms.length) {
        table += '<tr>';
        let j = i;
        let k = 0;
        while (k < 10 && j < listOfRooms.length) {
            if (isDesiredRoom(listOfRooms[j], valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn)) {
                table += '<td>' + createCardOfRoom(listOfRooms[j]) + '</td>';
                names.push(listOfRooms[j].resident);
                k++;
            }
            j++;
        }
        table += '</tr>';
        i = j;
    }

    table += '</table>';

    document.getElementById('view-rooms').innerHTML = '';
    document.getElementById('view-rooms').innerHTML = table;
}

//a function to determine whether the room is user-defined or not
function isDesiredRoom(room, reserved, numberOdBeds, floorNumber, roomNumber) {
    const checkEquality = (firstValue, secondValue) => {
        return secondValue === -1 || firstValue === secondValue;
    }

    var ans = true;
    ans &= checkEquality(room.numberOfBeds, numberOdBeds);
    ans &= checkEquality(room.isReserved, reserved);
    ans &= checkEquality(room.floorNumber, floorNumber);
    ans &= checkEquality(room.roomNumber, roomNumber);
    return ans;
}

//function to create needed dropdowns
function createCardOfRoom(room) {
    return `
        <div class="box" onclick="selectRoom(${JSON.stringify(room).replace(/"/g, '&quot;')})">
            <p class="status" style="background-color:${(room.isReserved === 'Unbooked' ? 'red' : 'green')}">${(room.isReserved === 'Unbooked' ? 'Unbooked' : 'Reserved')}</p>
            <p class="pr">floor ${room.floorNumber}<br>room ${room.roomNumber}</p>
            <button onclick="selectRoom(${JSON.stringify(room).replace(/"/g, '&quot;')})" id="button-of-card">${(room.isReserved === 'Unbooked' ? 'Boooked' : 'Visit')}</button>  
        </div>`;
}

//create needed dropdowns
function createNeededDropDowns(numberOfFloors, numberOfRooms, maxNumberOfBeds, minNumberOfBeds) {
    var divOfFloors = '<option value="0">All</option>';
    for (let i = 1; i <= numberOfFloors; i++) {
        divOfFloors += `<option value="${i}">${i}</option>`;
    }

    var divOfRooms = '<option value="0">All</option>';
    for (let i = 1; i <= numberOfRooms; i++) {
        divOfRooms += `<option value="${i}">${i}</option>`;
    }

    var divOfBads = '<option value="0">All</option>';
    for (let i = minNumberOfBeds; i <= maxNumberOfBeds; i++) {
        divOfBads += `<option value="${i}">${i}</option>`;
    }

    var UI = `
        <div class="dropdown-container">
            <div class="dropdown-wrapper">
                <button class="dropdown-button" id="button1">Floor</button>
                <select class="dropdown" id="dropdown1">
                   ${divOfFloors}
                </select>
            </div>
            <div class="dropdown-wrapper">
                <button class="dropdown-button" id="button2">Room</button>
                <select class="dropdown" id="dropdown2">
                   ${divOfRooms}
                </select>
            </div>
            <div class="dropdown-wrapper">
                <button class="dropdown-button" id="button3">Beds</button>
                <select class="dropdown" id="dropdown3">
                    ${divOfBads}
                </select>
            </div>
            <div class="dropdown-wrapper">
                <button class="dropdown-button" id="button4">Reserved</button>
                <select class="dropdown" id="dropdown4">
                    <option value="0">All</option>
                    <option value="1">Reserved</option>
                    <option value="2">Unbooked</option>
                </select>
            </div>
            <input type="text" id="searchInput" oninput="searchNames()" placeholder="find someone...">
            <ul id="nameList"></ul>
        </div>
  `;

    document.getElementById('main-selection-bar').innerHTML = UI;

    const initilaizeDropdawn = (ID) => {
        document.getElementById(ID).addEventListener('change', function () {
            const getValueOfSelectionDropdown = (value, flag) => {
                if (flag) {
                    return (value === "All" ? -1 : parseInt(value));
                } else {
                    return (value === "All" ? -1 : value);
                }
            }
            const selectedOption = this.options[this.selectedIndex].text;
            switch (this.id) {
                case 'dropdown1': valueOfFloorNumberDropdawn = getValueOfSelectionDropdown(selectedOption, true); break;
                case 'dropdown2': valueOfRoomNumberDropdawn = getValueOfSelectionDropdown(selectedOption, true); break;
                case 'dropdown3': valueOfBedsNumberDropdawn = getValueOfSelectionDropdown(selectedOption, true); break;
                case 'dropdown4': valueOfReservedDropdawn = getValueOfSelectionDropdown(selectedOption, false); break;
            }
            generateTableOfRooms(hotel.listOfRooms, valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn);
        });
    }

    initilaizeDropdawn('dropdown4');
    initilaizeDropdawn('dropdown3');
    initilaizeDropdawn('dropdown2');
    initilaizeDropdawn('dropdown1');
}

//create bar of settings of selected room
function createBarOfOptionsOfselectedRoom() {
    var barOfReservedRoom = `
    <div class="buuton-of-room-selection-bar">
    <button onclick="backToHome()"><i class="fa-solid fa-left-long"></i></button>
     <button onclick="showInformationOfSelectedRoom()"><i class="fa-solid fa-circle-info"></i></button>
     <button onclick="getInformationOfPament()"><i class="fa-solid fa-credit-card"></i></button>
     <button onclick="modifyInformationOfSelectedRoom()"><i class="fa-solid fa-screwdriver-wrench"></i></button>
    </div>
    `;
    var barOfUnbookedRoom = `
    <div class="buuton-of-room-selection-bar">
    <button onclick="backToHome()"><i class="fa-solid fa-left-long"></i></button>
    <button onclick="reserveSelectedRoom()"><i class="fa-solid fa-user-plus"></i></button>
     <button onclick="showInformationOfSelectedRoom()"><i class="fa-solid fa-circle-info"></i></button>
    </div>
    `;
    document.getElementById('room-selection-bar').innerHTML = barOfReservedRoom;
    document.getElementById('unbookedRoom-selection-bar').innerHTML = barOfUnbookedRoom;
}

//get status of key
function getStatusOfKey(room) {
    return (room.keyStatus === true ? "Active" : "Stopped");
}

////////////////////////////
// script.js
function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var bookingDate = document.getElementById("bookingDate").value;
    var bookingDuration = document.getElementById("bookingDuration").value;
    var displayInfoBtn = document.getElementById("displayInfoBtn");

    if (name && email && bookingDate && bookingDuration) {
        displayInfoBtn.disabled = false; // تفعيل الزر
    } else {
        displayInfoBtn.disabled = true; // تعطيل الزر
    }
}

function displayInfo() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var bookingDate = document.getElementById("bookingDate").value;
    var bookingDuration = document.getElementById("bookingDuration").value;

    alert("الاسم: " + name + "<br>البريد الإلكتروني: " + email + "<br>تاريخ الحجز: " + bookingDate + "<br>مدة الحجز: " + bookingDuration);
}

/////////////      genearte page of settings      //////////////
function generatePageOfSettings() {
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    document.getElementById(currentIdInModifysettings).style.display = 'none';
    document.getElementById(currentPage).style.display = 'none';
    currentPage = 'page-of-settings';
    document.getElementById(currentPage).style.display = 'block';
}

//go to page of rooms
function goToPageOfRooms() {
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    document.getElementById(currentIdInModifysettings).style.display = 'none';
    document.getElementById(currentPage).style.display = 'none';
    currentIdInDisplayInformation = "view-rooms";
    currentIdInModifysettings = "main-selection-bar";
    currentPage = 'container';
    document.getElementById(currentPage).style.display = 'block';
    document.getElementById(currentIdInDisplayInformation).style.display = 'block';
    document.getElementById(currentIdInModifysettings).style.display = 'block';
}

//get page of settings price
function getPageOfPriceSettings() {
    document.getElementById(currentPage).style.display = 'none';
    currentPage = 'page-of-price-settings';
    document.getElementById(currentPage).style.display = 'block';
}

// get page of price rooms settings
function getPageOfPriceRoomsSettings() {
    document.getElementById(currentPage).style.display = 'none';
    currentPage = 'page-of-price-of-rooms-settings';
    document.getElementById(currentPage).style.display = 'block';
}

// get needed dropdowns in page setting price
function createSettingPricePage(numberOfFloors, numberOfRooms) {
    var divOfFloors = '<option value="0">All</option>';
    for (let i = 1; i <= numberOfFloors; i++) {
        divOfFloors += `<option value="${i}">${i}</option>`;
    }

    var divOfRooms = '<option value="0">All</option>';
    for (let i = 1; i <= numberOfRooms; i++) {
        divOfRooms += `<option value="${i}">${i}</option>`;
    }

    var divOfProducts = ``;

    var UI = `
    <button onclick="getPageOfPriceSettings()">Back</button>
        <div class="dropdown-container">
            <div class="dropdown-wrapper">
                <button class="dropdown-button" id="button1">Floor</button>
                <select class="dropdown" id="dropdown-of-floor">
                   ${divOfFloors}
                </select>
            </div>
            <div class="dropdown-wrapper">
                <button class="dropdown-button" id="button2">Room</button>
                <select class="dropdown" id="dropdown-of-room">
                   ${divOfRooms}
                </select>
            </div>
        </div>
        <div style="width: 100%;height: 70%;border: 1px solid black;">
           <label>get the new price</label>
           <input type="number" id="new-price-from-settings" step="0.01">
           <div style="display: flex;width: 100%;height: 30%;border: 1px solid black;align-items: center;">
             <button onclick="setPriceOfRooms()" style="margin: 10px;">save</button>
             <button onclick="getPageOfPriceSettings()" style="margin: 10px;">ignore</button>
           </div>
       </div>
  `;

    document.getElementById('page-of-price-of-rooms-settings').innerHTML = UI;

    const initilaizeDropdawn = (ID) => {
        document.getElementById(ID).addEventListener('change', function () {
            const getValueOfSelectionDropdown = (value, flag) => {
                if (flag) {
                    return (value === "All" ? -1 : parseInt(value));
                } else {
                    return (value === "All" ? -1 : value);
                }
            }
            const selectedOption = this.options[this.selectedIndex].text;
            switch (this.id) {
                case 'dropdown-of-floor': valueOfFloorNumberDropdawnInSettings = getValueOfSelectionDropdown(selectedOption, true); break;
                case 'dropdown-of-room': valueOfRoomNumberDropdawnInSettings = getValueOfSelectionDropdown(selectedOption, true); break;
            }
        });
    }

    initilaizeDropdawn('dropdown-of-floor');
    initilaizeDropdawn('dropdown-of-room');
}


//function to set price of selected rooms from settings
function setPriceOfRooms() {
    const isDesiredRoomInSettings = (room , floorNumber, roomNumber) => {
    
        const checkEquality = (firstValue, secondValue) => {
            return secondValue === -1 || firstValue === secondValue;
        }

        var ans = true;
        ans &= checkEquality(room.floorNumber, floorNumber);
        ans &= checkEquality(room.roomNumber, roomNumber);

        return ans;
    }
   
    for(let i = 0 ; i < hotel.listOfRooms.length ; i++){
        if(isDesiredRoomInSettings(hotel.listOfRooms[i] , valueOfFloorNumberDropdawnInSettings , valueOfRoomNumberDropdawnInSettings)){
            hotel.listOfRooms[i].setPrice(document.getElementById('new-price-from-settings').value);
        }
    }
    generateTableOfRooms(hotel.listOfRooms, valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn);
}