// load stored selections
document.addEventListener('DOMContentLoaded', function () {
    restoreOptions();
    console.log("DOM Loaded");
});

// initially set toggle variable
var toggleOn = true;

// only toggle on click
document.getElementById("toggle").addEventListener("click", function (){
    toggle("toggle");
}); 

function toggle(id_name) {
  if (document.getElementById(id_name).value == "False" && toggleOn == false) {
    document.getElementById(id_name).value = "True"
    document.getElementById(id_name).checked = true;
    toggleOn = true;
  } else if (document.getElementById(id_name).value == "True" && toggleOn == true) {
    document.getElementById(id_name).value = "False";
    document.getElementById(id_name).checked = false;
    toggleOn = false;
  }

  // set stored selection
  var switchState = document.getElementById(id_name).checked;
    chrome.storage.sync.set({
        'value' : switchState
    }, function () {
        console.log("Switch Saved as " + switchState);
    });
}

// Restores checkbox state using the preferences stored in chrome.storage.sync
function restoreOptions() {
    // Use default value = true.
    chrome.storage.sync.get({
        value: true
    }, function (items) {
        document.getElementById('toggle').checked = items.value;
    });
}