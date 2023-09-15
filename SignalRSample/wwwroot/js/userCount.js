//create connection
var connectionUserCount = new signalR
    .HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Trace)
    .withUrl("/hubs/userCount",signalR.HttpTransportType.WebSockets)
    .build();

//connect to methods that hub invokes aka(also known as) receive notifications from hub
connectionUserCount.on('updateTotalUserViews', (value) => {
    let newCountSpan = document.getElementById('totalViewsCounter');
    newCountSpan.textContent = value.toString();
})

connectionUserCount.on('updateTotalUsers', (value) => {
    let newCountSpan = document.getElementById('totalUsersCounter');
    newCountSpan.textContent = value.toString();
});

//invoke hub methods aka(also known as) send notification to hub
function newWindowLoadedOnClient() {
    //To get values that invokes from here we must call the invoke method
    connectionUserCount.invoke("NewWindowLoadedAsync","Onur").then((value) =>console.log(value));
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



