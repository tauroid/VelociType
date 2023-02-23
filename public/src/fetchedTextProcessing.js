

function createWordSpan(word) {
  const span = document.createElement('span')
  span.classList.add('word')

  addContentsToWordSpan(span, word)

  span.tabIndex = "4"

  return span
}

function sayFirstWordWithScreenReader() {
  // puts the first word in the title for the screen reader
  // and blurs / focuses so that it is read
  firstWordSpan = document.createElement('span')
  firstWordSpan.id = 'first-word'
  firstWordSpan.classList.add('sr-only')
  firstWordSpan.innerText =
    'The first word is: ' + wordSpanArray[0].innerText
  const titleContainerDiv = document.querySelector('.title-container')
  titleContainerDiv.appendChild(firstWordSpan)
  titleContainerDiv.blur()
  titleContainerDiv.focus()
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

      comparisonWordsArray.push(
        word.split('').map(transformCharacter).join(''))
    })
    document.querySelector('.source-text-container').appendChild(p)
  })

  sayFirstWordWithScreenReader()
}
