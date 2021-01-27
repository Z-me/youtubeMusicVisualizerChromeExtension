class Circle2D {
  audio
  context
  analyser
  barNum = 200
  barWeight = 2
  barHight = 0
  source
  analyser
  frequencyArray = []
  width = 0
  height = 0
  center = {
    x: 0,
    y: 0
  }
  locate = {
    x: 0,
    y: 0,
    xEnd: 0,
    yEnd: 0
  }
  ctx
  r

  constructor(width, height){
    this.setWindowSize(width, height)
    this.audio = new Audio()
    this.context = new (window.AudioContext || window.webkitAudioContext)()
    this.analyser = this.context.createAnalyser()

    this.source = this.context.createMediaElementSource(this.audio)
    this.source.connect(this.analyser)
    this.analyser.connect(this.context.destination)

    this.frequencyArray = new Uint8Array(this.analyser)

    console.log('this')
    console.log(this)
    this.loop()
  }

  setWindowSize(width, height) {
    this.width = width
    this.height = height
    this.center = {
      x: width / 2,
      y: height / 2
    }
  }

  loop() {
    // $('#ymv').width = this.width
    // $('#ymv').height = this.height
    this.ctx = $('#ymv')[0].getContext('2d')

    this.r = 150

    var backColor = this.ctx.createLinearGradient(0, 0, 0, this.height)
    backColor.addColorStop(0, 'rgba(100, 100, 200, 1)')
    backColor.addColorStop(1, 'rgba(0, 0, 50, 1)')
    this.ctx.fillStyle = backColor
    this.ctx.fillRect(0, 0, this.width, this.height)

    this.beginPath()
    this.ctx.arc(this.center.x, this.center.y, this.r, 0, 2 * Math.PI)
    this.ctx.stroke()

    this.analyser.getByteFreaquencyDta(frequencyArray)
    for(let i = 0; i < this.barNum; i++){
      this.r = Math.Pi * 2 / this.barNum
      this.barHight = frequencyArray[i] * 0.7
      this.locate = {
        x: this.center.x + Math.cos(r * i) * r,
        y: this.center.y + Math.sin(r * i) * r,
        xEnd: this.center.x + Math.cos(r * i) * (r + this.barHight),
        yEnd: this.center.y + Math.sin(r * i) * (r + this.barHight)
      }
      drawBar(this.frequencyArray[i])
    }
    window.requestAnimationFrame(loop)
  }

  drawBar(d) {
    var lineColor = `rgb(${d}, ${d}, 205)`
    this.ctx.strokeStyle = lineColor
    this.ctx.lintWidth = this.barWeight
    this.ctx.beginPath()
    this.ctx.moveTo(this.locate.x, this.locate.y)
    this.ctx.lineTo(this.locate.xEnd, this.locate.yEnd)
    this.ctx.stroke()
  }
}
