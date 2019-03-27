var config = {
    apiKey: "AIzaSyAo-PhLLszku2pTE3aVF-wwbRA982c2iCw",
    authDomain: "count-down-e06a9.firebaseapp.com",
    databaseURL: "https://count-down-e06a9.firebaseio.com",
    projectId: "count-down-e06a9",
    storageBucket: "count-down-e06a9.appspot.com",
    messagingSenderId: "498087627060"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = 0;
var trainArrival = 0;
var trainMinutes = 0;
var nameInput = $("#train-name");
var destinationInput = $("#destination");
var timeInput = $("#train-time");
var frequencyInput = $("#frequency");

function getValues () {
    trainName = nameInput.val().trim();
    trainDestination = destinationInput.val().trim();
    trainTime = timeInput.val().trim();
    trainFrequency = frequencyInput.val().trim();


}

$("button").on("click", function (event) {
    event.preventDefault();
    getValues();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log("new train name " + newTrain.name);
    console.log("new train destination " + newTrain.destination);
    console.log("new first train time " + newTrain.time);
    console.log("new train frequency " + newTrain.frequency);

    $("input").val("");
})

addTrain();

function addTrain () {
    database.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;
        
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFrequency);

 
        var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
        console.log("converted first train " + trainTimeConverted);        
        
        var nowTime = moment();
        console.log("now " + moment(nowTime).format("HH:mm"));

        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("time difference " + diffTime);
     
        var trainRemain = diffTime % trainFrequency;
        console.log("remainder " + trainRemain);

        var trainMinutes = trainFrequency - trainRemain;
        console.log("minutes away " + trainMinutes);

        var nextArrival = moment().add(trainMinutes, "minutes");
        console.log("next arrival " + moment(nextArrival).format("HH:mm"));

        var trainArriveTime = moment(nextArrival).format("HH:mm");


        var trainDisplay = $("#display");
        var displayTrain = $("<tr>");
        var nameSpot = $("<th>").attr("scope", "row");
        var displayName = nameSpot.html(trainName);
        var displayDestination = $("<td>").html(trainDestination);
        var displayArrival = $("<td>").html(trainArriveTime);
        var displayFrequency = $("<td>").html(trainFrequency);
        var displayMinutes = $("<td>").html(trainMinutes);
        
        trainDisplay.prepend(displayTrain);
        displayTrain.append(displayName);
        displayTrain.append(displayDestination);
        displayTrain.append(displayFrequency);
        displayTrain.append(displayArrival);
        displayTrain.append(displayMinutes);
    });
}