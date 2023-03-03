let countDown = document.querySelector('#countDown')
let countValue = parseInt(countDown.innerText)
let minutesId = document.querySelector('#minutes')
let secondsId = document.querySelector('#seconds')
let alarm = document.querySelector('#myAudio')
let decreasePause = document.querySelector('#decreasePause')
let decreaseTimer = document.querySelector('#decreaseTimer')
let spanNumberOfRounds = document.querySelector('#roundNumber')
let spanSessionLength = document.querySelector('#sessionLength')
let spanPauseLength = document.querySelector('#pauseLength')
let startButton = document.querySelector('#startButton')
// let minutes = 0
// let seconds = 12
let timerLengthMinutes = 25
let timerLengthSeconds = 0
let timerMinutes = timerLengthMinutes
let timerSeconds = timerLengthSeconds
let pauseLengthMinutes = 5
let pauseLengthSeconds = 0
let pauseMinutes = pauseLengthMinutes
let pauseSeconds = pauseLengthSeconds
var intervalId
let numberOfRounds = []

var breakIntervalId
let pause
spanSessionLength.innerText = `${timerLengthMinutes}`
spanPauseLength.innerText = `${pauseLengthMinutes}`

var whatIsOn = 'Timer'
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const increaseMinutesTimer = () => {
  if (timerLengthMinutes < 59) {
    timerLengthMinutes++
    spanSessionLength.innerText = timerLengthMinutes
    countDown.innerText = `${timerLengthMinutes}:0${timerLengthSeconds}`
  }
  // if (intervalId) {
  //   timerMinutes++
  //   console.log('Increasing time while running')
  // }
}

const decreaseMinutesTimer = () => {
  // if (timerLengthMinutes <= 0) {
  //   decreaseTimer.disabled = true
  // }
  console.log(timerLengthMinutes)
  if (timerLengthMinutes > 1) {
    timerLengthMinutes--
    spanSessionLength.innerText = timerLengthMinutes
    countDown.innerText = `${timerLengthMinutes}:0${timerLengthSeconds}`
    timerMinutes = timerLengthMinutes
  }
  // if (intervalId) {
  //   timerMinutes--
  //   console.log('Decreasing time while running')
  // }
}
const increaseMinutesPause = () => {
  if (pauseLengthMinutes < 59) {
    pauseLengthMinutes++
    spanPauseLength.innerText = pauseLengthMinutes
  }
  // if (intervalId) {
  //   pauseMinutes++
  //   console.log('Increasing pause while running')
  // }
}

const decreaseMinutesPause = () => {
  // if (pauseLengthMinutes <= 0) {
  //   decreasePause.disabled = true
  // }
  console.log(pauseLengthMinutes)
  if (pauseLengthMinutes > 1) {
    pauseLengthMinutes--
    spanPauseLength.innerText = pauseLengthMinutes
  }
  // if (intervalId) {
  //   pauseMinutes--
  //   console.log('Decreasing pause while running')
  // }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const reset = () => {
  myStop()
  timerLengthMinutes = 25
  timerLengthSeconds = 0
  // pauseLengthMinutes = 5
  // pauseLengthSeconds = 60
  timerMinutes = timerLengthMinutes
  timerSeconds = timerLengthSeconds
  countDown.innerText = `${timerMinutes}:${timerSeconds}0`
  spanSessionLength.innerText = 25
  spanPauseLength.innerText = 5
  numberOfRounds = []
  spanNumberOfRounds.innerText = numberOfRounds.join(' ')
}

const myTimer = () => {
  console.log('Now is Timer')
  whatIsOn = 'Timer'
  if (timerMinutes == 0 && timerSeconds == 0) {
    myStop()
    pauseMinutes = pauseLengthMinutes
    pauseSeconds = pauseLengthSeconds
    playAudio()
    countDown.innerText = 'PAUSE'
    setTimeout(myBreakInterval, 2500)
  } else {
    if (timerSeconds == 0) {
      timerMinutes--
      timerSeconds = 60
    }
    if (timerSeconds <= 10 && timerMinutes >= 10) {
      // console.log(timerMinutes)
      timerSeconds--
      countDown.innerText = `${timerMinutes}:0${timerSeconds}`
      console.log(`cond1 true`)
    } else if (timerSeconds > 10 && timerMinutes < 10) {
      timerSeconds--
      countDown.innerText = `0${timerMinutes}:${timerSeconds}`
      console.log(`cond2 true`)
    } else if (timerSeconds <= 10 && timerMinutes < 10) {
      timerSeconds--
      countDown.innerText = `0${timerMinutes}:0${timerSeconds}`
      console.log(`cond3true`)
    } else {
      timerSeconds--
      countDown.innerText = `${timerMinutes}:${timerSeconds}`
      console.log(`cond4 true`)
    }
    console.log(countDown.innerText)
    console.log(timerSeconds)
  }
}

const myInterval = () => {
  if (pause) {
  } else {
    timerMinutes = timerLengthMinutes
    timerSeconds = timerLengthSeconds
  }

  // if (intervalId) {
  //   clearInterval(intervalId)
  // }
  intervalId = setInterval(myTimer, 1000)
  startButton.disabled = true
}

const myBreakInterval = () => {
  if (pause) {
  } else {
    pauseMinutes = pauseLengthMinutes
    pauseSeconds = pauseLengthSeconds
    startButton.disabled = false
  }

  // if (breakIntervalId) {
  //   clearInterval(breakIntervalId)
  // }
  breakIntervalId = setInterval(startBreak, 1000)
  startButton.disabled = true
}

const myStop = () => {
  pause = true
  clearInterval(intervalId)
  clearInterval(breakIntervalId)
  startButton.disabled = false
}

const playAudio = () => {
  alarm.play()
}

const addTick = () => {
  numberOfRounds.push('✅')
  spanNumberOfRounds.innerText = numberOfRounds.join(' ')
}

const startBreak = () => {
  whatIsOn = 'Pause'
  console.log('Now is pause')
  if (pauseMinutes == 0 && pauseSeconds == 0) {
    myStop()
    timerMinutes = timerLengthMinutes
    timerSeconds = timerLengthSeconds
    playAudio()
    addTick()
    setTimeout(myInterval, 2500)
  } else {
    if (pauseSeconds == 0) {
      pauseMinutes--
      pauseSeconds = 60
    }
    if (pauseSeconds <= 10) {
      pauseSeconds--
      countDown.innerText = `${pauseMinutes}:0${pauseSeconds}`
    } else {
      pauseSeconds--
      countDown.innerText = `${pauseMinutes}:${pauseSeconds}`
    }
    console.log(pauseSeconds)
  }
}
