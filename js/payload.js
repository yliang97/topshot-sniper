var globalStatus;

// initialize globalStatus
chrome.storage.sync.get(['value'], function (status) {
    globalStatus = status.value;
    console.log('Initialized status: ' + globalStatus);
}); 

// initial load if globalStatus = true
window.addEventListener ("load", function() {
    if (globalStatus) {
        myMain();
    }
});

// get current URL
var currentURL = location.href;

window.onclick=function(){
    // refresh Status
    // chrome.storage.sync.get(['value'], function (status) {
    //     console.log('Toggle is currently ' + status.value);
    //     globalStatus = status.value;
    // });
    urlReset();
}

// function getStatus (_callback) {
//     chrome.storage.sync.get(['value'], function (status) {
//         console.log('Toggle is currently ' + status.value);
//         globalStatus = status.value;
//     });
//     _callback();
// }

function urlReset () {
    if(currentURL!=location.href){
        console.log("Clicked new link");
        console.log("Status is: " + globalStatus);
        if (document.getElementById("moment-detailed-serialNumber") != null && globalStatus) {
            console.log("here -- running main");
            myMain();
        }
        currentURL = location.href;
      }
}

function myMain () {
    console.log("Initializing");

    // Grab New Listing Array with struct Listing
    var scrapedListings = GetListings("moment-detailed-serialNumber");

    // sort listings in ascending order by price
    scrapedListings.sort((x,y) => (x.price > y.price ? 1 : -1));

    // make new options set with the sorted list
    var newOptions = [];
    newOptions.push("<option value>" + "-- Select a Serial Number --" + "</option>");
    for (i = 0; i < scrapedListings.length; i++) {
        if (scrapedListings[i] != null) {
            scrapedListings[i].text = rewriteText(scrapedListings[i].serial, scrapedListings[i].price);
            newOptions.push("<option value='" + scrapedListings[i].serial + "'>" + scrapedListings[i].text + "</option>");
        }
    }

    // replace options in DOM
    if (document.getElementById("moment-detailed-serialNumber") != null) {
        document.getElementById("moment-detailed-serialNumber").innerHTML = newOptions.join();
    }
    // scrapedListings.forEach( function(entry) {
    //     console.log(entry);
    // });
}

function Listing(serial, price, text) {
    this.serial = serial;
    this.price = price;
    this.text = text;
}

function rewriteText(serial, price) {
    var listing = "#" + serial + " - $" + price;
    return listing;
}

function getPrice(str) {
    var price = str.split('$')[1];
    var price2 = price.replace(",", "");
    var cleanedPrice = price2.split('.')[0];
    return Number(cleanedPrice);
}

function GetListings(containerID) {
    var listingsArray = new Array();
    var listings = document.getElementById(containerID);
    if (listings != null) {
        for (i = 0; i < listings.options.length; i++) {
            if (listings.options[i].value != "") {
                var price = getPrice(listings.options[i].text);
                var serial = listings.options[i].value;
                listingsArray[i] = new Listing(serial, price, "");
            }
        }
    }
    return listingsArray;
}
