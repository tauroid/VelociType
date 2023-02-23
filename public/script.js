// ------------ Text sanitisation ------------

// So the user doesn't have to type accents
const characterReplacements = {
  '\u00e9': 'e',
}

function transformCharacter (character) {
  if (character in characterReplacements) {
    return characterReplacements[character]
  }

  return character
}

// ------------ Processing the fetched text -------------

// The two following arrays are the same size, and any particular
// word has the same index in both
//
// Array of displayed word spans
const wordSpanArray = []
// Array of sanitised strings to compare user input to
const comparisonWordsArray = []

// For the screen reader
const punctuationPronunciation = {
  '.': 'Full stop',
  ',': 'Comma',
  '-': 'Hyphen',
  '\'': 'Apostrophe'
}

function createWordSpan(word) {
  const span = document.createElement('span')
  span.classList.add('word')

  { // add the contents to the word span, which are `word`,
    // but with a screen-reader-only sub-span before every
    // punctuation mark, containing the pronunciation of the mark
    const wordCharacters = word.split('')

    let restOfWordCharacters = wordCharacters

    let startOfWordSection = 0
    let nextPunctuationIndex = restOfWordCharacters.findIndex(
      (character) => character in punctuationPronunciation)

    while (nextPunctuationIndex !== -1) {
      const punctuation = restOfWordCharacters[nextPunctuationIndex]
      const pronunciation = punctuationPronunciation[punctuation]

      // --- update the loop variables ---
      const firstPartOfWord = restOfWordCharacters.slice(
        startOfWordSection, nextPunctuationIndex
      ).join('')

      startOfWordSection = nextPunctuationIndex+1

      restOfWordCharacters = restOfWordCharacters.slice(
        startOfWordSection, restOfWordCharacters.length)

      nextPunctuationIndex = restOfWordCharacters.findIndex(
        (character) => character in punctuationPronunciation)
      // --- end of updating the loop variables ---

      span.appendChild(document.createTextNode(firstPartOfWord))

      const pronunciationSpan = document.createElement('span')
      pronunciationSpan.classList.add('sr-only')
      pronunciationSpan.innerText = ' ' + pronunciation

      span.appendChild(pronunciationSpan)

      span.appendChild(document.createTextNode(punctuation))
    }

    let restOfWord = restOfWordCharacters.join('')
    span.appendChild(document.createTextNode(restOfWord))
  }

  span.tabIndex = "4"

  return span
}

function processFetchedText(data) {
  // fill up wordSpanArray and comparisonWordsArray, while also
  // adding the spans, grouped into <p> tags, to the
  // .source-text-container
  data.forEach((paragraphOfText) => {
    const p = document.createElement('p')
    paragraphOfText.split(" ").forEach((word) => {
      const span = createWordSpan(word)

      wordSpanArray.push(span)
      p.appendChild(span)
      p.appendChild(document.createTextNode(" "))

      comparisonWordsArray.push(word.split('').map(transformCharacter).join(''))
    })
    document.querySelector('.source-text-container').appendChild(p)
  })

  // puts the first word in the title for the screen reader
  firstWord = document.createElement('span')
  firstWord.id = 'first-word'
  firstWord.classList.add('sr-only')
  firstWord.innerText = 'The first word is: ' + wordSpanArray[0].innerText
  const titleContainerDiv = document.querySelector('.title-container')
  titleContainerDiv.appendChild(firstWord)
  titleContainerDiv.blur()
  titleContainerDiv.focus()
}

// ------------ Current word data ------------

// Span of the current word
let currentWordSpan = null
// User input comparison string for the current word
let comparisonWord = null

// ------------- Event handling -------------

window.addEventListener('keydown', (event) => {
  let key = event.key

  // --- handling non-text key presses ---
  // e.g. Escape to focus the title, Backspace to backspace,
  //      space bar, etc...

  if (key === 'Tab') {
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
    // check the text has even been loaded
    if (comparisonWord !== null) {
      inputTextbox.value = ''

      currentWordSpan.classList.remove("current-word")

      const correct = comparisonWord === inputTextbox.value

      if (correct) {
        currentWordSpan.classList.add("correct")
      } else {
        currentWordSpan.classList.add("incorrect")
      }

      // remove screenreader stuff, that we don't want read out
      // again when they tab around, from the last word
      const correctnessReadout = currentWordSpan.querySelector('.correctness-readout')
      if (correctnessReadout !== null) {
        correctnessReadout.remove()
      }
      const srCurrentWord = currentWordSpan.querySelector('.sr-current-word')
      if (srCurrentWord !== null) {
        srCurrentWord.remove()
      }

      // get the next word
      currentWordSpan = wordSpanArray.shift()
      comparisonWord = comparisonWordsArray.shift()

      currentWordSpan.classList.add("current-word")

      // say what happened with the last word
      srCorrectOrIncorrect = document.createElement('span')
      srCorrectOrIncorrect.classList.add("sr-only")
      srCorrectOrIncorrect.classList.add("correctness-readout")
      srCorrectOrIncorrect.innerText = correct ? "correct , " : "incorrect , "
      currentWordSpan.insertBefore(srCorrectOrIncorrect, currentWordSpan.firstChild)

      currentWordSpan.focus()
    }

    return
  }

  // If it's longer than one character we're pretty sure it
  // shouldn't go in the text box
  if (key.length > 1) { return }

  // --- end of handling non-text key presses ---

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
