window.addEventListener('keydown', (event) => {
  let key = event.key

  if (key === 'Tab') {
    handleTab()
    return
  }

  if (key === 'Shift' || key === 'Control' || key === 'Alt') { return }

  // above here, keys we want to let through to the page
  event.preventDefault()
  // below here, keys we want to block and handle ourselves

  if (key === 'Escape') {
    // As described in the HTML
    document.querySelector('.title-container').focus()
    return
  }

  const inputTextbox = document.querySelector('#input-textbox')

  if (key === 'Backspace') {
    // need to do this manually as we allow input even when the
    // text box isn't focussed
    inputTextbox.value = inputTextbox.value.slice(0, -1)
    return
  }

  // If it's longer than one character we're pretty sure it
  // shouldn't go in the text box
  if (key.length > 1) { return }

  // start timer for space or keypress
  if (!countdownStarted && !timerFinished) {
    startAndStopTimer()
  }

  if (key === ' ') {
    handleSpace()
    return
  }

  // by now, `key` is considered to be textual input
  key = transformCharacter(key)
  inputTextbox.value += key
})

fetch('https://tauro.id/flipsum.php')
  .then(response => response.json())
  .then(processFetchedText)
