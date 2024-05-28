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