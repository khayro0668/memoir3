//view availabel rooms
function generateTableOfRooms(listOfRooms, valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn) {
    names = [];
    var table = '<table>';
    let i = 0;
    while (i < listOfRooms.length) {
        table += '<tr>';
        let j = i;
        let k = 0;
        while (k < 9 && j < listOfRooms.length) {
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
     <button onclick="showInformationOfResidentInSelectedRoom()"><i class="fa-solid fa-person"></i></button>
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

    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    if (name && isValidEmail(email) && bookingDate && bookingDuration) {
        displayInfoBtn.disabled = false;
    } else {
        displayInfoBtn.disabled = true;
    }
}

function displayInfo() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var bookingDate = document.getElementById("bookingDate").value;
    var bookingDuration = document.getElementById("bookingDuration").value;

    selectedRoom.setResident(name);
    selectedRoom.setResidentEmail(email);
    selectedRoom.setDurationOfReservation(bookingDuration);
    selectedRoom.setStartDate(bookingDate);
    selectedRoom.setIsReserved('Reserved');
    selectedRoom.setDurationOfReservation(bookingDuration);

    hotel.addEventInArchives(currentUser, 'iuiyyu');

    generateTableOfRooms(hotel.listOfRooms, valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn);
}

/////////////      genearte page of settings      //////////////
function generatePageOfSettings() {
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    document.getElementById(currentIdInModifysettings).style.display = 'none';
    document.getElementById(currentPage).style.display = 'none';
    currentPage = 'page-of-settings';
    document.getElementById(currentPage).style.display = 'flex';
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
    document.getElementById(currentPage).style.display = 'flex';
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

    var UI = `
    <div class="price-settings-container">
    <h2>Room Price Settings</h2>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <div class="price-dropdown-wrapper">
            <button class="action-button" id="button1">Floor</button>
            <select class="price-dropdown" id="dropdown-of-floor">
                ${divOfFloors}
            </select>
            <button class="action-button" id="button2">Room</button>
            <select class="price-dropdown" id="dropdown-of-room">
                ${divOfRooms}
            </select>
        </div>
    </div>
    <div>
        <label for="new-price-from-settings">New Price:</label>
        <input type="number" id="new-price-from-settings" step="1">
    </div>
    <div class="button-container">
        <button onclick="setPriceOfRooms()" class="action-button">Save</button>
        <button onclick="getPageOfPriceSettings()" class="action-button">Ignore</button>
    </div>
</div>


    `;

    document.getElementById('page-of-price-of-rooms-settings').innerHTML = UI;

    function initializeDropdown(ID) {
        document.getElementById(ID).addEventListener('change', function () {
            const getValueOfSelectionDropdown = (value) => parseInt(value) || -1;
            const selectedValue = this.value;
            switch (this.id) {
                case 'dropdown-of-floor': valueOfFloorNumberDropdownInSettings = getValueOfSelectionDropdown(selectedValue); break;
                case 'dropdown-of-room': valueOfRoomNumberDropdownInSettings = getValueOfSelectionDropdown(selectedValue); break;
            }
        });
    }

    initializeDropdown('dropdown-of-floor');
    initializeDropdown('dropdown-of-room');
}


//function to set price of selected rooms from settings
function setPriceOfRooms() {
    const isDesiredRoomInSettings = (room, floorNumber, roomNumber) => {

        const checkEquality = (firstValue, secondValue) => {
            return secondValue === -1 || firstValue === secondValue;
        }

        var ans = true;
        ans &= checkEquality(room.floorNumber, floorNumber);
        ans &= checkEquality(room.roomNumber, roomNumber);

        return ans;
    }

    for (let i = 0; i < hotel.listOfRooms.length; i++) {
        if (isDesiredRoomInSettings(hotel.listOfRooms[i], valueOfFloorNumberDropdawnInSettings, valueOfRoomNumberDropdawnInSettings)) {
            hotel.listOfRooms[i].setPrice(document.getElementById('new-price-from-settings').value);
        }
    }

    hotel.addEventInArchives(currentUser, 'set price');
    // generatePageOfArchives();
    generateTableOfRooms(hotel.listOfRooms, valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn);
}


//convert string to pdf
function textIntoPDF(text) {

}

//send email
function sendEmail(file, dest) {

}

//generate page of archive
function generatePageOfArchives() {
    var page = ``;
    for (let i = 0; i < hotel.archives.length; i++) {
        page += `<div class = "event-in-archive"><h1>${hotel.archives[i].employe}</h1><h1>${hotel.archives[i].event}</h1></div>`;
    }

    document.getElementById('page-of-archives').innerHTML = page;
}

//show page of archives
function getPageOfArchives() {
    generatePageOfArchives();
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    document.getElementById(currentIdInModifysettings).style.display = 'none';
    document.getElementById(currentPage).style.display = 'none';
    currentPage = 'page-of-archives';
    document.getElementById(currentPage).style.display = 'block';
}

//generate page of accounte
function generatePageOfAccount() {
    var page = '<table>';
    for (let i = 0; i < accounts.length; i += 4) {
        page += '<tr>';
        let k = 1;
        for (let j = i; j < i + 4 && j < accounts.length; j++) {
            let valueOfMargin = (k === 1 ? 0 : 47);
            page += '<td>'
            page += `<div class="card-acc" style="margin-left: ${valueOfMargin}px;">
                      <div class="card-of-acc"style="background-image: url('f${j + 1}.png');"></div>
                      <p>${accounts[j].name}</p>
                      <div class="submit" onclick="showPopup(${JSON.stringify(accounts[j]).replace(/"/g, '&quot;')})"><button>Enter</button></div>
                    </div>`;
            page += '</td>';
            k++;
        }
        page += '<tr>';
    }

    page += '</table>';

    document.getElementById('account-of-employes').innerHTML = page;
}
//////////////////////////////////
function showPopup(account) {
    const overlay = document.querySelector('.overlay');
    const popup = document.querySelector('.popup');
    overlay.style.display = 'block';
    popup.style.display = 'block';
    window.currentAccount = account;
}
function closePopup() {
    const overlay = document.querySelector('.overlay');
    const popup = document.querySelector('.popup');
    overlay.style.display = 'none';
    popup.style.display = 'none';
    document.getElementById("result").textContent = '';
}

function checkPassword() {
    const inputPassword = document.getElementById("passwordInput").value;
    const resultDiv = document.getElementById("result");
    if (inputPassword === window.currentAccount.password) {
        currentUser = window.currentAccount.name;
        const popup = document.querySelector('.popup');
        popup.style.display = 'none';
        document.getElementById('popup').style.display = 'none';
        document.getElementById('accounts').style.display = 'none';
        document.getElementById('passwordInput').style.display = 'none';
        document.getElementById('result').style.display = 'none';
        showCurrentUser();
        generateMenuOfButtons();
        goToPMS();
    } else {
        resultDiv.textContent = "wrong password";
    }
}
/////////////////////////////////

//show page of acc
function getPageOfAccount() {
    document.getElementById(currentPage).style.display = 'none';
    currentPage = 'account-of-employes';
    document.getElementById(currentPage).style.display = 'block';
}


const http = {
    createServer: (handler) => {
        const server = {
            listen: (port, callback) => {
                callback();
            }
        };

        const req = {
            url: ''
        };

        const res = {
            writeHead: () => { },
            write: () => { },
            end: () => { }
        };

        handler(req, res);
        return server;
    }
};

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/generate-pdf') {
        // Sample PDF content
        const pdfContent = "This is a sample PDF document generated by Node.js.";

        // Set response headers for PDF file
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=output.pdf'
        });

        // Write PDF content to response
        res.write(pdfContent);
        res.end();
    } else {
        // Handle other routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


document.addEventListener('DOMContentLoaded', function () {
    const generatePdfButton = document.getElementById('generate-pdf-button');
    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', function () {
            fetch('http://localhost:3000/generate-pdf')
                .then(response => {
                    if (response.ok) return response.blob();
                    throw new Error('Network response was not ok.');
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'output.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    alert('PDF downloaded successfully!');
                })
                .catch(error => console.error('Error downloading the PDF:', error));
        });
    }
});

//show current user
function showCurrentUser() {
    var ui = `
        <div class="image-of-current-user">
            <img src="f1.png">
        </div>
        <h1 style="width: 70%;">name</h1>
  `;

    //   document.getElementById('current-user').innerHTML = ui;
}

//generate page of quantite setting
function getPageOfQuantiteSettings() {
    document.getElementById(currentPage).style.display = 'none';
    currentPage = 'page-of-quantite-settings';
    document.getElementById(currentPage).style.display = 'flex';
}

//generate clock
function generateClock() {
    var serchTy
    var page = ``;
    for (let i = 0; i < hotel.listOfRooms.length; i++) {
        if (hotel.listOfRooms[i].isReserved === 'Reserved') {
            page += `
            <div class="current-resident" onclick="getInfoOfSelectedResident(${JSON.stringify(hotel.listOfRooms[i].id).replace(/"/g, '&quot;')})">
               <div class="part-of-name-resident">
                 <h2>
                 ${hotel.listOfRooms[i].resident}
                 </h2>
               </div>
               <div class="part-of-room">
                   <h2>
                     floor : ${hotel.listOfRooms[i].floorNumber} , room : ${hotel.listOfRooms[i].roomNumber}
                   </h2>
               </div>
               <div class="part-of-contdown">
                  <h2>
                   ${getRemaningDays(hotel.listOfRooms[i].endDate)} Days left
                  </h2>
               </div>
            </div>`
        }
    }

    document.getElementById('show-current-residents').innerHTML = page;
}

//get info of selected resident
function getInfoOfSelectedResident(id) {
    for (let i = 0; i < hotel.listOfRooms.length; i++) {
        if (hotel.listOfRooms[i].id === id) {
            alert(hotel.listOfRooms[i].endDate);
            break;
        }
    }
}
//get page of clock
function getPageOfClock() {
    document.getElementById(currentIdInDisplayInformation).style.display = 'none';
    document.getElementById(currentIdInModifysettings).style.display = 'none';
    document.getElementById(currentPage).style.display = 'none';
    currentPage = 'page-of-clock';
    document.getElementById(currentPage).style.display = 'block';
}

//generate menu of buttons
function generateMenuOfButtons() {
    var menu = `
    <div class="logo"></div>
        <hr class="hr-of-menu">
        <div class="menu-item" id="rooms" onclick="goToPageOfRooms()"><div class="icon-of-button"><i class="fa-solid fa-door-closed"></i></div><div class="text-of-button">Rooms</div></div>
        <div class="menu-item" id="clock" onclick="getPageOfClock()"><div class="icon-of-button"><i class="fa-solid fa-calendar-days"></i></div><div class="text-of-button">Clock</div></div>
        <div class="menu-item" id="settings" onclick="generatePageOfSettings()"><div class="icon-of-button"><i class="fa-solid fa-gear"></i></div><div class="text-of-button">Settings</div></div>
            `;

    if (currentUser === 'admin') {
        menu += `
        <div class="menu-item" id="historique" onclick="getPageOfArchives()"><div class="icon-of-button"><i class="fa-solid fa-box-archive"></i></div><div class="text-of-button">Archive</div></div>`;
    }

    menu += `
    <div class="menu-item" id="payment" onclick=""><div class="icon-of-button"><i class="fa-solid fa-cart-shopping"></i></div><div class="text-of-button">Payment</div></div>
    <hr class="hr-of-menu">
    <div class="menu-item" id="log-out" onclick=""><div class="icon-of-button"><i class="fa-solid fa-right-from-bracket"></i></div><div class="text-of-button">Log out</div></div>
    <div id="div-of-acc">
        <div class="current-user" id="current-user"></div>
    </div>
    `;

    document.getElementById('menu-of-options').innerHTML = menu;

}

//get page of others price
function generatePageOfOthersPrice() {
    var page =
        `
    <div class="scroll-container">
        <div class="container">
            <div class="card">
                <div class="label">vip pillow</div>
                <input type="number" placeholder="get new price">
                <button class="btn-of-others">ok</button>
            </div>
            <div class="card">
                <div class="label">vip bed</div>
                <input type="number" placeholder="get new price" >
                <button class="btn-of-others">ok</button>
            </div>
            <div class="card">
                <div class="label">vip spa</div>
                <input type="number" placeholder="get new price">
                <button class="btn-of-others">ok</button>
            </div>
            <div class="card">
                <div class="label">vip pool</div>
                <input type="number" placeholder="get new price">
                <button class="btn-of-others">ok</button>
            </div>
            <div class="card">
                <div class="label">vip lounge access</div>
                <input type="number" placeholder="get new price">
                <button class="btn-of-others">ok</button>
            </div>
            <div class="card">
                <div class="label">vip yacht Charters</div>
                <input type="number" placeholder="get new price">
                <button class="btn-of-others">ok</button>
            </div>
            <div class="card">
                <div class="label">vip gym</div>
                <input type="number" placeholder="get new price">
                <button class="btn-of-others">ok</button>
            </div>
           
        </div>
    </div>
    `;
    document.getElementById('page-of-price-of-others-settings').innerHTML = page;
}

// get page of others setting
function getPageOfOthers() {
    document.getElementById(currentPage).style.display = 'none';
    currentPage = 'page-of-price-of-others-settings';
    document.getElementById(currentPage).style.display = 'block';
}

//calculate remaning days
function getRemaningDays(endDate) {
    var dateInput = endDate; // الحصول على القيمة من الحقل
    var today = new Date();
    var targetDate = new Date(dateInput);


    var timeDiff = targetDate - today;
    var daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff >= 0)
        return daysDiff;

}


// search bar
function searchBar() {

}

//set status of button after clicked
function setStatus(id) {
   var listOfID = [
    '',
    '',
    '',
   ];
}