chrome.runtime.onInstalled.addListener((details) => {
  console.log(details)
  $("body").css("background-color", details.color);
})
