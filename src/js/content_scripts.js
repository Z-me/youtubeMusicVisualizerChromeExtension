const hideVideo = () => {
  $('video').hide()
}

const showVideo = () => {
  $('video').show()
}

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  // console.log('data', data)
  data.isActive ? hideVideo() : showVideo()

  sendResponse('update Content')
})
