function handleTab() {
  // make sure that when they tab back to the current word,
  // the screen reader lets them know
  if (currentWordSpan.classList.contains("current-word")) {
    let srCurrentWord = currentWordSpan.querySelector(".sr-current-word")
    if (srCurrentWord === null) {
      srCurrentWord = document.createElement('span')
      srCurrentWord.classList.add("sr-current-word")
      srCurrentWord.classList.add("sr-only")
      srCurrentWord.innerText = "Current word: "
      currentWordSpan.insertBefore(srCurrentWord, currentWordSpan.firstChild)
    }
  }

  // get rid of correctness readout in the current word, so
  // that when they tab back it's not read out again
  const correctnessReadout = currentWordSpan.querySelector('.correctness-readout')
  if (correctnessReadout !== null) {
    correctnessReadout.remove()
  }
}

function cleanupTemporaryScreenReaderText(span) {
  const correctnessReadout = span.querySelector('.correctness-readout')
  if (correctnessReadout !== null) {
    correctnessReadout.remove()
  }
  const srCurrentWord = span.querySelector('.sr-current-word')
  if (srCurrentWord !== null) {
    srCurrentWord.remove()
  }
}

function sayCorrectOrIncorrect(span, correct) {
  const srCorrectOrIncorrect = document.createElement('span')
  srCorrectOrIncorrect.classList.add("sr-only")
  srCorrectOrIncorrect.classList.add("correctness-readout")
  srCorrectOrIncorrect.innerText = correct ? "correct , " : "incorrect , "
  currentWordSpan.insertBefore(srCorrectOrIncorrect, span.firstChild)
}

function handleSpace() {
  // check the text has even been loaded
  if (comparisonWord !== null) {
    const inputTextbox = document.querySelector('#input-textbox')

    currentWordSpan.classList.remove("current-word")

    const correct = comparisonWord === inputTextbox.value

    inputTextbox.value = ''

    if (correct) {
      currentWordSpan.classList.add("correct")
      totalCorrectWords++
      console.log(totalCorrectWords)
    } else {
      currentWordSpan.classList.add("incorrect")
      totalInCorrectWords++
      console.log(totalInCorrectWords)
    }

    cleanupTemporaryScreenReaderText(currentWordSpan)

    // get the next word
    currentWordSpan = wordSpanArray.shift()
    comparisonWord = comparisonWordsArray.shift()

    currentWordSpan.classList.add("current-word")

    // say what happened with the last word
    sayCorrectOrIncorrect(currentWordSpan, correct)

    currentWordSpan.focus()
  }
}
