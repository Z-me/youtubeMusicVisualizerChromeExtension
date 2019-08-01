var ymv = {
  'isActive': false,
  'type': 'Visualizer_01',
  'lang': 'ja'
}

const setData = (data = {}) => {
  updateTarget(data)
  return new Promise((resolve) => {
    chrome.storage.local.set(ymv, () => {
      console.log('saved!')
    })
    return resolve('Success Saving')
  }).then(() => {
    console.log(getData())
  })
}

const getData = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(ymv, (data) => {
      console.log('result', data)
      resolve(data)
    })
  })
}

const updateTarget = (data) => {
  if ('isActive' in data) ymv.isActive = data.isActive
  if ('type' in data) ymv.type = data.type
  if ('lang' in data) ymv.lang = data.lang
}

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  console.log('data', data)
  sendResponse(data.type = 'set' ? setData(data) : getData())
  return true
})
