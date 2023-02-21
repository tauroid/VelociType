const sourceTextContainer = document.querySelector('.source-text-container')

const spanArray = []

const h1 = document.querySelector('h1')

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

fetch('https://flipsum-ipsum.net/api/icw/v1/generate?ipsum=recipe-ipsum-text-generator&start_with_fixed=0&paragraphs=4')
  .then(response => response.json())
  .then((data) => {
    populateSourceText(data)

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
  })
