const sourceTextContainer = document.querySelector('.source-text-container')

const spanArray = []

function populateSourceText(data) {
  sourceTextContainer.innerHTML = ''
  spanArray.splice(0, spanArray.length)

  data.forEach((text) => {
    const p = document.createElement('p')
    text.split(" ").forEach((word) => {
      const span = document.createElement('span')
      span.innerText = word
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
  h1.appendChild(firstWord)
  h1.blur()
  h1.focus()
}

const h1 = document.querySelector('h1')

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
    // spanArray[20].focus()
    */
  })
