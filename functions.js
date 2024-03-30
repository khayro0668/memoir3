function generateDivOfClock() {

}

function generateDivHome(id, numberOfFloors, numberOfRooms) {
    var divOfFloors = "";
    for (let i = 1; i <= numberOfFloors; i++) {
        divOfFloors += '<option value="">1</option>';
    }

    var divOfRoooms = "";
    for (let i = 1; i <= numberOfRooms; i++) {
        divOfFloors += '<option value="${i - 1}">${i}</option>';
    }

    var UI = ` 
    <div class="setParameters">
        <div class="dropdown-container">
            <div class="dropdown-wrapper">
                <button class="dropdown-button" id="button1">Floor</button>
                <select class="dropdown" id="dropdown1">
                   ` + divOfFloors + `
                </select>
            </div>
            <div class="dropdown-wrapper">
                <button class="dropdown-button" id="button2">Room</button>
                <select class="dropdown" id="dropdown2">
                   ` + divOfRoooms + `
                </select>
            </div>
            <div class="dropdown-wrapper">
                <button class="dropdown-button" id="button3">Beds</button>
                <select class="dropdown" id="dropdown3">
                    <option value="0">Option 0</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
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
        </div>
    </div>
    <div class="showInformation" id="showInformation">
    </div>
`;
    document.getElementById(id).innerHTML = UI;
}
