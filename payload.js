console.log("here1");
let sniper = document.getElementById("Sniper");

sniper.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true });
    // send the page title as a chrome message
    chrome.runtime.sendMessage(tab.title, function(response) {
        console.log(tab.title);
    });
});
