// For the screen reader
const punctuationPronunciation = {
  '.': 'Full stop',
  ',': 'Comma',
  '-': 'Hyphen',
  '\'': 'Apostrophe'
}

function createPunctuationIterator(wordCharacters) {
  const restOfWordCharacters = wordCharacters
  return {
    restOfWordCharacters,
    nextPunctuationIndex: restOfWordCharacters.findIndex(
      (character) => character in punctuationPronunciation),

    next: function () {
      const startOfWordSegment = this.nextPunctuationIndex + 1
      this.restOfWordCharacters = this.restOfWordCharacters.slice(
        startOfWordSegment, this.restOfWordCharacters.length)
      this.nextPunctuationIndex = this.restOfWordCharacters.findIndex(
        (character) => character in punctuationPronunciation)
    },

    isFinished: function () {
      return this.nextPunctuationIndex === -1
    },

    getPunctuation: function () {
      return this.restOfWordCharacters[this.nextPunctuationIndex]
    },

    getTextBeforePunctuation: function () {
      return this.restOfWordCharacters.slice(
        0, this.nextPunctuationIndex
      ).join('')
    }
  }
}
