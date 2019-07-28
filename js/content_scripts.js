console.log('content_scripts called');
chrome.runtime.onMessage.addListener((msg) => {
  chrome .tabs.executeScript({
    code: "$('body').css('background-color', msg.color)"
  })
  console.log('msg', msg)
  $('body').css('background-color', msg.color)
})
