console.log('content_scripts called');
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.result) {
    $('video').hide()
  } else {
    $('video').show()
  }
})
