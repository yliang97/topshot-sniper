// initialize listener
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "MomentPrices",
      "title": "Moment Prices",
      "contexts": ["prices"]
    });
  });

// send the page title as a chrome message
chrome.runtime.sendMessage(document.title, function(response) {
    console.log(document.title);
});