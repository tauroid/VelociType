

function createWordSpan(word) {
  const span = document.createElement('span')
  span.classList.add('word')

  addContentsToWordSpan(span, word)

  span.tabIndex = "4"

  return span
}

function sayFirstWordWithScreenReader(word) {
  // puts the first word in the title for the screen reader
  // and blurs / focuses so that it is read
  firstWordSpan = document.createElement('span')
  firstWordSpan.id = 'first-word'
  firstWordSpan.classList.add('sr-only')
  firstWordSpan.innerText = 'The first word is: ' + word
  const titleContainerDiv = document.querySelector('.title-container')
  titleContainerDiv.appendChild(firstWordSpan)
  titleContainerDiv.blur()
  titleContainerDiv.focus()
}

function processFetchedTextParagraph(paragraphOfText) {
  // fill up wordSpanArray and comparisonWordsArray, while also
  // adding the spans, grouped into <p> tags, to the
  // .source-text-container
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
}

function processFetchedText(data) {
  data.forEach(processFetchedTextParagraph)

  sayFirstWordWithScreenReader(wordSpanArray[0].innerText)

  // shift the first word span off the array and into `currentWordSpan`
  currentWordSpan = wordSpanArray.shift()
  // put the box around it
  currentWordSpan.classList.add("current-word")

  // shift the first comparison word off the array and into `comparisonWord`
  comparisonWord = comparisonWordsArray.shift()
}
