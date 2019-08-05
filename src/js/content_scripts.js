const hideVideo = () => {
  $('video').hide()
}

const showVideo = () => {
  $('video').show()
}

const init = () => {
  console.log('called init contents')
  $('.html5-video-container').append('<canvas id="ymv"></canvas>');
  syncVideoAttr()
}

const syncVideoAttr = () => {
  var attrObj = {}
  var attrs = $('video').attr('style').split(';').map((data) => {
    var d = data.split(':')
    attrObj[String(d[0]).replace(/\s+/g, '')] = String(d[1]).replace(/\s+/g, '')
  })
  delete attrObj['']
  $('#ymv').css(attrObj)
}

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  // console.log('data', data)
  data.isActive ? hideVideo() : showVideo()

  sendResponse('update Content')
})

init()
