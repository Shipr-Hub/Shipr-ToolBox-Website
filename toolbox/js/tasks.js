var userId = getUserIDHere;
var tDatabase = firebase.database().ref("tasks/" + userId );

function createTask(name, desc, date) {
tDatabase.set({
    tName: name,
    tDesc: desc,
    tDate : date
  });
}

tDatabase.on("child_added", addTask);

function addTask(task) {
  var tTask = task.val();
  var tName = tTask.tName;
  var tDesc = tTask.tDesc;
  var tDate = tTask.tDate;

//Add it in a list
}
