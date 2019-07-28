console.log('called setting.js')
$(() => {
  $('#active').on('change', (val) => {
    chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        color: 'black'
      })
    })
  })

  $('#black').on('click', () => {
    console.log('balck')
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        color: 'black'
      })
    })
  })

  $('#red').on('click', () => {
    console.log('red')
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        color: 'red'
      })
    })
  })
})
