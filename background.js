chrome.runtime.onInstalled.addListener(() => {
  // restoreOptions();
  console.log("Initialized");
  chrome.storage.sync.set({
    'value' : false
  }, function () {
      console.log("Switch initialized as " + false);
  });
});

// Check loaded or not
console.log('loaded');


// Listen to messages from the payload.js script and write to index.html
// chrome.runtime.onMessage.addListener(function (message) {
//   document.getElementById('pagetitle').innerHTML = message;
// });

// Restores checkbox state using the preferences stored in chrome.storage.sync
// function restoreOptions() {
//   // Use default value = false.
//   chrome.storage.sync.get({
//       value: false
//   }, function (initial) {
//       document.getElementById('toggle').checked = initial.value;
//   });
// }