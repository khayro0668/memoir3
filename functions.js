function generateDivOfClock() {

}

function generateDivHome(id) {
    var UI = ` 
    <div class="container" id="container">
       <div class="setParameters">
         <div class="dropdown">
            <button class="dropdown-btn">Dropdown<i class="fa-regular fa-turn-left"></i></button>
            <div class="dropdown-content" id="dropdownContent">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </div>
        </div>
       </div>
       <div class="showInformation" id="showInformation">
      </div>
  </div>
`;

document.getElementById(id).innerHTML = UI;
}