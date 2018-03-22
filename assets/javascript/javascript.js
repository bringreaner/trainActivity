// Initialize Firebase
var config = {
  apiKey: "AIzaSyBBQBhLaCS4md6SzGXJar1qe7orcdH_lKg",
  authDomain: "trainactivity-46b00.firebaseapp.com",
  databaseURL: "https://trainactivity-46b00.firebaseio.com",
  projectId: "trainactivity-46b00",
  storageBucket: "",
  messagingSenderId: "387548193402"
};

firebase.initializeApp(config);

//   created database var
var database = firebase.database();
var trainRef = database.ref("/trains");
var newTrainRef = trainRef.push();


$("#submitBtn").on("click", function () {
  var trainName = 0;
  var destination = "";
  var firstTrainDate = 0;
  var frequency = 0;

  event.preventDefault();
  console.log("buttonclicked");
  trainName = $("#trainName").val();
  console.log(trainName);
  destination = $("#destination").val();
  console.log(destination);
  firstTrainDate = $("#firstTrainDate").val();
  console.log(firstTrainDate);
  frequency = $("#frequency").val();
  console.log(frequency);

  newTrainRef.set({
    name: trainName,
    dest: destination,
    trainTime: firstTrainDate,
    freq: frequency
  })

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainDate").val("");
  $("#frequency").val("");

});//closes submit button click

database.ref("/trains").on("child_added", function (childSnapshot) {
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrainDate = childSnapshot.val().trainTime;
  var frequency = childSnapshot.val().freq;

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTrainDate, "HH:mm");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment(); //gets the current time
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); //can switch the moment(). part to currentTime
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = Math.abs(diffTime % frequency); //easiest way is to use Math.absolute: Math.abs(diffTime) % tFrequency; before
      console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $(".table").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  moment(nextTrain).format("hh:mm") + "</td><td>" + frequency + "</td><td>" + tMinutesTillTrain);
  console.log(trainName);


});





  // console.log(childSnapshot.val())

  // console.log(childSnapshot.val().trainName)

  // var newEntry = $("<tr>")
  // // name column
  // var nameTd = $("<td>")
  // nameTd.text(trainName)
  // newEntry.append(nameTd)
  // $("#trainData").append(newEntry)

  // // role column
  // var destinationTd = $("<td>")
  // destinationTd.text(destination)
  // newEntry.append(destinationTd)

  // // // start date column
  // // var dateTd = $("<td>")
  // // dateTd.text(startDate)
  // // newEntry.append(dateTd)

  // //first train column
  // var firstTrainTd = $("<td>")
  // firstTrainTd.text(firstTrainDate)
  // newEntry.append(firstTrainTd)

  // //frequency column
  // var frequencyTd = $("<td>")
  // frequencyTd.text(frequency)
  // newEntry.append(frequencyTd)


