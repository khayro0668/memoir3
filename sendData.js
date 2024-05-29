function sendData(name, event_changes) {
    console.log(currentUser);
    var newData = {
        user: name,
        event: event_changes,

    };
    $.ajax({
        url: "dataBase.php",
        method: "post",
        data: newData,
        success: function (res) {
            console.log("Response from PHP script1:", res);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });



}

function modifyAccount(name,password,status){
    var newData = {
        userName:name,
        userPassword:password,
        userStatus:status,
       
       
    };
    $.ajax({
        url: "modifyAccount.php",
        method: "post",
        data: newData,
        success: function (res) {
            console.log("Response from PHP script1:", res);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });







}

function deleteAccount(name){
    var newData = {
        userName:name,
       
       
    };
    $.ajax({
        url: "deleteAccount.php",
        method: "post",
        data: newData,
        success: function (res) {
            console.log("Response from PHP script1:", res);
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        }
    });







}

