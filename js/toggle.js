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
    console.log("toggled - globalStatus is " + globalStatus);
    toggle("toggle");
}); 

// run this if functon off of chrome storage

function toggle(id_name) {
    if (!globalStatus) {
        document.getElementById(id_name).checked = true;
        globalStatus = true;
    } else if (globalStatus) {
        document.getElementById(id_name).checked = false;
        globalStatus = false;
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