const sourceTextContainer = document.querySelector('.source-text-container')

const spanArray = []

const titleContainerDiv = document.querySelector('.title-container')

const punctuationPronunciation = {
  '.': 'Full stop',
  ',': 'Comma',
  '-': 'Hyphen',
  '\'': 'Apostrophe'
}

function populateSourceText(data) {
  sourceTextContainer.innerHTML = ''
  spanArray.splice(0, spanArray.length)

  // puts the fetched text in the source text container div
  data.forEach((paragraphOfText) => {
    const p = document.createElement('p')
    paragraphOfText.split(" ").forEach((word) => {
      const span = document.createElement('span')

      { // this is complicated because we want to tell the
        // screen reader how to pronounce punctuation
        const wordCharacters = word.split('')

        let restOfWordCharacters = wordCharacters

        let startOfWordSection = 0
        let nextPunctuationIndex = restOfWordCharacters.findIndex(
          (character) => character in punctuationPronunciation)

        while (nextPunctuationIndex !== -1) {
          let firstPartOfWord = restOfWordCharacters.slice(
            startOfWordSection, nextPunctuationIndex+1
          ).join('')

          span.appendChild(document.createTextNode(firstPartOfWord))

          const punctuation = firstPartOfWord[firstPartOfWord.length-1]
          const pronunciation = punctuationPronunciation[punctuation]

          const pronunciationSpan = document.createElement('span')
          pronunciationSpan.classList.add('sr-only')
          pronunciationSpan.innerText = ' ' + pronunciation

          span.appendChild(pronunciationSpan)

          startOfWordSection = nextPunctuationIndex+1

          restOfWordCharacters = restOfWordCharacters.slice(
            startOfWordSection, restOfWordCharacters.length)

          nextPunctuationIndex = restOfWordCharacters.findIndex(
            (character) => character in punctuationPronunciation)
        }

        let restOfWord = restOfWordCharacters.join('')
        span.appendChild(document.createTextNode(restOfWord))
      }

      span.tabIndex = "4"

      spanArray.push(span)
      p.appendChild(span)
      p.appendChild(document.createTextNode(" "))
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

const inputText = document.querySelector('#input-text')

const characterReplacements = {
  'é': 'e',
}



function transformCharacter (character) {
  if (character in characterReplacements) {
    character = characterReplacements[key]
  }

  character = character.toLowerCase()

  if (!/^[a-z0-9']$/.test(character)) { return null }

  return character
}





window.addEventListener('keydown', (event) => {
  
  let key = event.key

  if (key === 'Tab' || key === 'Shift') { return }

  event.preventDefault()

  if (key === 'Escape') {
    h1.focus()
    return
  }

  if (key === 'Backspace') {
    inputText.value = inputText.value.slice(0, -1)
    console.log(inputText.value)
    return
  }

  if (key === ' ') {
    inputText.value = ''
    return
  }

  if (key.length > 1) { return }

  key = transformCharacter(key)

  if (key === null) { return }

  inputText.value += key

  console.log(inputText.value)
})

fetch('https://flipsum-ipsum.net/api/icw/v1/generate?ipsum=recipe-ipsum-text-generator&start_with_fixed=0&paragraphs=4')
  .then(response => response.json())
  .then((data) => {
    populateSourceText(data)
    data.split(" ")
      .forEach((thingBetweenSpaces) => {
        
        thingBetweenSpaces.filter()})

    /*
    // Temporary code to demo gameplay

    for (let i = 0; i < 20; ++i) {
      if (Math.random() * 2 < 1.5) {
        spanArray[i].classList.add("correct")
      } else {
        spanArray[i].classList.add("incorrect")
      }
    }

    spanArray[20].classList.add("current-word")
    */
  })
