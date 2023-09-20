var cloakSpan = document.getElementById('cloakCounter');
var stoneSpan = document.getElementById('stoneCounter');
var wandSpan = document.getElementById('wandCounter');



//create connection
var connectionDeathlyHallows = new signalR
    .HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Trace)
    .withUrl("/hubs/deathlyhallows",signalR.HttpTransportType.WebSockets)
    .build();

//connect to methods that hub invokes aka(also known as) receive notifications from hub
connectionDeathlyHallows.on('updateDeathlyHallowCount', (cloak,stone,wand) => {
    cloakSpan.textContent = cloak.toString();
    stoneSpan.textContent = stone.toString();
    wandSpan.textContent = wand.toString();
})
connectionDeathlyHallows.on('initialDeathlyHallowCount', (cloak, stone, wand) => {
    cloakSpan.textContent = cloak.toString();
    stoneSpan.textContent = stone.toString();
    wandSpan.textContent = wand.toString();
});
function fullFilled() {
    //do something on start
    console.log("Connection to Deathly Hallows Hub is successfull.");
    connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
        cloakSpan.textContent = raceCounter.cloak.toString();
        stoneSpan.textContent = raceCounter.stone.toString();
        wandSpan.textContent = raceCounter.wand.toString();
    });
}
function rejected()
{
    //rejected logs
    console.error("Something went wrong whilst connecting to User Hub");
}

connectionDeathlyHallows
    .start()
    .then(fullFilled, rejected)



