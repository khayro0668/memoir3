function generateDivOfClock() {
    document.getElementById('showInformationOfRoom').innerHTML = (`
   <p>Start Date / Time:<br /> 
     <input type = "date" id="start_dt" class='datepicker' size='11' title='D-MMM-YYYY' /> 
      <input id="start_tm" class='timepicker' size='5'  title='HH:MM' /> 
   </p> 
  
   <p>End Date:<br /> 
     <input id="end_dt" class='datepicker' size='11' title='D-MMM-YYYY' /> 
     <input id="end_tm" class='timepicker' size='5'  title='HH:MM' /> 
   </p> 
    `);
}