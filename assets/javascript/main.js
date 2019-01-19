// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgwu6AxZhWjUxMbVCm_cUzahXGXhUd_Zc",
    authDomain: "it-s-a-project-b7479.firebaseapp.com",
    databaseURL: "https://it-s-a-project-b7479.firebaseio.com",
    projectId: "it-s-a-project-b7479",
    storageBucket: "it-s-a-project-b7479.appspot.com",
    messagingSenderId: "843912277893"
};

firebase.initializeApp(config);
    
var dataRef = firebase.database();
    
    // train button
    $("#submit-btn").on("click", function(event) {
        event.preventDefault();
        
        // user input
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").format("LT");
        var trainFrequency = $("#frequency-input").val().trim();
        
        // object for holding train info
        var newTrain = {
            train: trainName,
            destination: trainDestination,
            firstTrainTime: firstTrain,
            frequency: trainFrequency
        };
    
        //shares train data with database
        dataRef.ref().push(newTrain);
            

        console.log(newTrain.train);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrainTime);
        console.log(newTrain.frequency);

        //train time
        var tTime = "00:00";

        //formats train time
        var firstTrainSchedule = moment.unix(tTime).format("HH:mm");
        
        // Clear text boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#firstTrain-input").val("");
        $("#frequency-input").val("");
        
    });
    
    dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
  
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().firstTrainTime;
    var trainFrequency = childSnapshot.val().frequency;
  
    var startTimeConverted = moment(trainStart, "HH:mm")
    var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
    var timeRemainder = timeDiff % trainFrequency;
    var minToTrain = trainFrequency - timeRemainder;
    var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  
  console.log(minToTrain);
      // Add each train's data into the table
      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>"  + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minToTrain + "</td></tr>");
    
    
    });