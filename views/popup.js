let count = 0;
document.getElementById('changeColor').addEventListener('click', (event) => {
  event.target.innerText = `clicked ${count++}`
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "green";'});
  });
}, false);