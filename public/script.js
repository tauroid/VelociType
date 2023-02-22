const sourceTextContainer = document.querySelector('.source-text-container')

const spanArray = []

const comparisonWordsArray = []

let comparisonWord = null

const titleContainerDiv = document.querySelector('.title-container')

const punctuationPronunciation = {
  '.': 'Full stop',
  ',': 'Comma',
  '-': 'Hyphen',
  '\'': 'Apostrophe'
}

const characterReplacements = {
  '\u00e9': 'e',
}

function transformCharacter (character) {
  if (character in characterReplacements) {
    character = characterReplacements[character]
  }

  return character
}

function processFetchedText(data) {
  sourceTextContainer.innerHTML = ''
  spanArray.splice(0, spanArray.length)

  data.forEach((paragraphOfText) => {
    const p = document.createElement('p')
    paragraphOfText.split(" ").forEach((word) => {
      const span = document.createElement('span')
      span.classList.add('word')

      { // this is complicated because we want to tell the
        // screen reader how to pronounce punctuation
        const wordCharacters = word.split('')

        let restOfWordCharacters = wordCharacters

        let startOfWordSection = 0
        let nextPunctuationIndex = restOfWordCharacters.findIndex(
          (character) => character in punctuationPronunciation)

        while (nextPunctuationIndex !== -1) {
          const punctuation = restOfWordCharacters[nextPunctuationIndex]
          const pronunciation = punctuationPronunciation[punctuation]

          // update the loop variables
          const firstPartOfWord = restOfWordCharacters.slice(
            startOfWordSection, nextPunctuationIndex
          ).join('')

          startOfWordSection = nextPunctuationIndex+1

          restOfWordCharacters = restOfWordCharacters.slice(
            startOfWordSection, restOfWordCharacters.length)

          nextPunctuationIndex = restOfWordCharacters.findIndex(
            (character) => character in punctuationPronunciation)
          // end of updating the loop variables

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

      spanArray.push(span)
      p.appendChild(span)
      p.appendChild(document.createTextNode(" "))

      comparisonWordsArray.push(word.split('').map(transformCharacter).join(''))
    })
    sourceTextContainer.appendChild(p)
  })

  // puts the first word in the title for screen reader
  let firstWord = document.querySelector('#first-word')
  if (firstWord !== null) {
    firstWord.remove()
  }
  firstWord = document.createElement('span')
  firstWord.id = 'first-word'
  firstWord.classList.add('sr-only')
  firstWord.innerText = 'The first word is: ' + spanArray[0].innerText
  titleContainerDiv.appendChild(firstWord)
  titleContainerDiv.blur()
  titleContainerDiv.focus()
}

const inputTextbox = document.querySelector('#input-textbox')









window.addEventListener('keydown', (event) => {
  
  let key = event.key

  if (key === 'Tab' || key === 'Shift') { return }

  event.preventDefault()

  if (key === 'Escape') {
    h1.focus()
    return
  }

  if (key === 'Backspace') {
    inputTextbox.value = inputTextbox.value.slice(0, -1)
    console.log(inputTextbox.value)
    return
  }

  if (key === ' ') {
    if (comparisonWord !== null) {
      if (comparisonWord === inputTextbox.value) {
        console.log('correct')
      } else {
        console.log('incorrect')
      }

      comparisonWord = comparisonWordsArray.shift()
      inputTextbox.value = ''
    }
    return
  }

  if (key.length > 1) { return }

  key = transformCharacter(key)

  if (key === null) { return }

  inputTextbox.value += key
})

fetch('https://flipsum-ipsum.net/api/icw/v1/generate?ipsum=recipe-ipsum-text-generator&start_with_fixed=0&paragraphs=4')
  .then(response => response.json())
  .then((data) => {
    processFetchedText(data)

    comparisonWord = comparisonWordsArray.shift()
  })
