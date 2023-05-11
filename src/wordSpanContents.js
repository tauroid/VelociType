function createPronunciationSpan(pronunciation) {
  const pronunciationSpan = document.createElement('span')
  pronunciationSpan.classList.add('sr-only')
  pronunciationSpan.innerText = ' ' + pronunciation

  return pronunciationSpan
}

function addWordSegment(
  span,
  beforePunctuation,
  pronunciation,
  punctuation) {
  span.appendChild(document.createTextNode(beforePunctuation))
  span.appendChild(createPronunciationSpan(pronunciation))
  span.appendChild(document.createTextNode(punctuation))
}

function addContentsToWordSpan(span, word) {
  // the contents are `word`, but with a screen-reader-only
  // sub-span before every punctuation mark, containing the
  // pronunciation of the mark
  const wordCharacters = word.split('')

  let iterator = createPunctuationIterator(wordCharacters)

  while (!iterator.isFinished()) {
    const beforePunctuation = iterator.getTextBeforePunctuation()
    const punctuation = iterator.getPunctuation()
    const pronunciation = punctuationPronunciation[punctuation]

    addWordSegment(span, beforePunctuation, pronunciation, punctuation)

    iterator.next()
  }

  let restOfWord = iterator.restOfWordCharacters.join('')
  span.appendChild(document.createTextNode(restOfWord))
}
