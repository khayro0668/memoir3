function generateDivOfClock() {

}

function generateDivHome(id, numberOfFloors, numberOfRooms, minNumberOfBeds, maxNumberOfBeds) {
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
    <div class="setParameters">
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
        </div>
    </div>
    <div class="showInformation" id="showInformation">
    </div>
  `;
    document.getElementById(id).innerHTML = UI;
}

function getValueOfSelectionDropdown(value, flag) {
    if (flag) {
        return (value === "All" ? -1 : parseInt(value));
    } else {
        return (value === "All" ? -1 : value);
    }
}

function generateTableOfRooms(id , listOfRooms , valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn) {
    var table = '<table>';
    let i = 0;
    while(i < listOfRooms.length) {
        table += '<tr>';
        let j = i;
        let k = 0;
        while(k < 7 && j < listOfRooms.length) {
            if (isDesiredRoom(listOfRooms[j], valueOfReservedDropdawn, valueOfBedsNumberDropdawn, valueOfFloorNumberDropdawn, valueOfRoomNumberDropdawn)) {
                table += '<td>' + generateDiv(listOfRooms[j]) + '</td>';
                k++;
            }
            j++;
        }
        table += '</tr>';
        i = j;
    }

    table += '</table>';
    document.getElementById(id).innerHTML = table;
}