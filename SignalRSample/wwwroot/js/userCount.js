//create connection
var connectionUserCount = new signalR
    .HubConnectionBuilder()
    .withUrl("/hubs/userCount")
    .build();

//connect to methods that hub invokes aka(also known as) receive notifications from hub
connectionUserCount.on('updateTotalUserViews', (value) => {
    let newCountSpan = document.getElementById('totalViewsCounter');
    newCountSpan.textContent = value.toString();
})

connectionUserCount.on('updateTotalUsers', (value) => {
    console.log(value);
    let newCountSpan = document.getElementById('totalUsersCounter');
    newCountSpan.textContent = value.toString();
});

//invoke hub methods aka(also known as) send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoadedAsync");
}
//document.addEventListener('DOMContentLoaded', function () {
//    newWindowLoadedOnClient();
//})
//start connection

function fullFilled() {
    //do something on start
    console.log("Connection to User Hub is successfull.");
    newWindowLoadedOnClient();
}
function rejected()
{
    //rejected logs
    console.error("Something went wrong whilst connecting to User Hub");
}

connectionUserCount
    .start()
    .then(fullFilled, rejected)



