

window.addEventListener('keydown', (event) => {
  let key = event.key



  // vvv handling non-text key presses vvv
  // e.g. Escape to focus the title, Backspace to backspace,
  //      space bar, etc...

  if (key === 'Tab') {
    handleTab()
    return
  }

  if (key === 'Shift' || key === 'Control' || key === 'Alt') {
    // let em through, why not
    return
  }

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

  if (key === ' ') {
    handleSpace()
    return
  }

  // If it's longer than one character we're pretty sure it
  // shouldn't go in the text box
  if (key.length > 1) { return }

  // ^^^ end of handling non-text key presses ^^^




  // by now, `key` is considered to be textual input

  key = transformCharacter(key)

  inputTextbox.value += key
})

// ------------- Fetching words -------------

fetch('https://flipsum-ipsum.net/api/icw/v1/generate?ipsum=recipe-ipsum-text-generator&start_with_fixed=0&paragraphs=4')
  .then(response => response.json())
  .then((data) => {
    processFetchedText(data)

    // shift the first word span off the array and into `currentWordSpan`
    currentWordSpan = wordSpanArray.shift()
    // put the box around it
    currentWordSpan.classList.add("current-word")

    // shift the first comparison word off the array and into `comparisonWord`
    comparisonWord = comparisonWordsArray.shift()
  })
