// load stored selections
var globalStatus;

document.addEventListener('DOMContentLoaded', function () {
    getOptions();
    console.log("DOM Loaded");
    chrome.storage.sync.get(['value'], function (status) {
        globalStatus = status.value;
        console.log(status.value);
    }); 
});

// only toggle on click
document.getElementById("toggle").addEventListener("click", function (){
    console.log("toggled");
    toggle("toggle");
}); 

// run this if functon off of chrome storage

function toggle(id_name) {
//   if (document.getElementById(id_name).value == "False") {
//     document.getElementById(id_name).value = "True"
//     document.getElementById(id_name).checked = true;
//   } else if (document.getElementById(id_name).value == "True") {
//     document.getElementById(id_name).value = "False";
//     document.getElementById(id_name).checked = false;
//   }
  if (!globalStatus) {
      document.getElementById(id_name).checked = true;
  } else if (globalStatus) {
      document.getElementById(id_name).checked = false;
  }

  // set stored selection post toggle
  var switchState = document.getElementById(id_name).checked;
    chrome.storage.sync.set({
        'value' : switchState
    }, function () {
        console.log("Switch Saved as " + switchState);
    });
}

// gets current option value from Storage (in between DOM loads)
function getOptions() {
    chrome.storage.sync.get(['value'], function (status) {
        document.getElementById('toggle').checked = status.value;
    }); 
}