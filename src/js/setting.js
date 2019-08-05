$(() => {
  var isActive = false,
      type = 'Visualizer_01'

  $('#active').on('change', (val) => {
    $('#active:checked').each(() => {
      changeActive(true)
    })
    $('#active:not(:checked)').each(() => {
      changeActive(false)
    })
  })

  const sendData2Content = (type, d) => {
    var data = {}
    data[type] = d
    // NOTE: chrome.tabs.sendMessage will Deprecated since Chrome 33...
    chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, data, () => {
        console.log('update Content' )
      })
    })
  }

  const sendData2Background = (type = 'get',dType = '', d = '') => {
    var data = {}
    if (type === 'set') data[dType] = d
    data['type'] = type
    chrome.runtime.sendMessage(data, (res) => {
      console.log('send Background: ', res)
    })
  }

  const init = () => {
    var bgData = chrome.extension.getBackgroundPage()
    console.log('bgData', bgData)
    changeActive(bgData.ymv.isActive)
  }

  const changeActive = (flag) => {
    sendData2Content('isActive', flag)
    sendData2Background('set', 'isActive', flag)
    $('#active').prop('checked', flag)
  }

  init()
})
