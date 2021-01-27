const hideVideo = () => {
  $('video').hide()
}

const showVideo = () => {
  $('video').show()
}

const init = () => {
  console.log('called init contents')
  // $('.html5-video-container').append('<canvas id="ymv"></canvas>');
  // NOTE: show sample images
  $('.html5-video-container').append(`<img id="ymv" src="${chrome.extension.getURL('/images/sample/sample01.gif')}"></img>`);
  attr = syncVideoAttr()
  // new Circle2D(attr.width, attr.height)
}

const syncVideoAttr = () => {
  var attrObj = {}
  var attrs = $('video').attr('style').split(';').map((data) => {
    var d = data.split(':')
    attrObj[String(d[0]).replace(/\s+/g, '')] = String(d[1]).replace(/\s+/g, '')
  })
  delete attrObj['']
  $('#ymv').css(attrObj)
  return attrObj
}

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  // console.log('data', data)
  data.isActive ? hideVideo() : showVideo()

  sendResponse('update Content')
})

var attr = {}
var canvas = null
init()
