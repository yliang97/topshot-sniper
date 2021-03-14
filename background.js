chrome.runtime.onInstalled.addListener(() => {
  console.log("Initialized");
});

// Check loaded or not
console.log('loaded');


// Listen to messages from the payload.js script and write to index.html
chrome.runtime.onMessage.addListener(function (message) {
  document.getElementById('pagetitle').innerHTML = message;
});