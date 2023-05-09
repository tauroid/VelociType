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
  if (comparisonWord !== null && gameOver == false) {
    const inputTextbox = document.querySelector('#input-textbox')

    if (currentWordSpan) {
      currentWordSpan.classList.remove("current-word")
    }
    const correct = comparisonWord === inputTextbox.value

    inputTextbox.value = ''

    if (correct && currentWordSpan) {
      currentWordSpan.classList.add("correct")
      totalCorrectWords++
    } else if (currentWordSpan) {
      currentWordSpan.classList.add("incorrect")
      totalIncorrectWords++
    }

    if (currentWordSpan) {
      cleanupTemporaryScreenReaderText(currentWordSpan)

      // get the next word
      currentWordSpan = wordSpanArray.shift()
      comparisonWord = comparisonWordsArray.shift()
    }

    if (currentWordSpan) {
      currentWordSpan.classList.add("current-word")

      // say what happened with the last word
      sayCorrectOrIncorrect(currentWordSpan, correct)

      currentWordSpan.focus()
    }

  }
}

function startAndStopTimer() {
  if (!countdownStarted) {
    countdownStarted = true
    const countdownForDisplay = setInterval(() => {
      timer.innerHTML = countdown
      countdown--
    }, 1000)
    const countdownForInput = setTimeout(() => {
      timer.innerHTML = 0
      clearInterval(countdownForDisplay)
      resultsContainer.style.display = 'block'
      let totalWordsTyped = totalCorrectWords + totalIncorrectWords
      totalWordsDisplay.innerHTML = totalWordsTyped + '.'
      totalCorrectWordsDisplay.innerHTML = totalCorrectWords + '.'
      totalIncorrectWordsDisplay.innerHTML = totalIncorrectWords + '.'
      let accuracy = Math.round(totalCorrectWords / (totalWordsTyped) * 100)
      accuracyDisplay.innerHTML = accuracy + '%'
      scrollPixels = 0
      if (currentWordSpan) {
        currentWordSpan.blur()
      }
      resultsContainer.focus()
      gameOver = true
    }, 60000,)
  }
}
