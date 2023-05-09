// The two following arrays are the same size, and any particular
// word has the same index in both
//
// Array of displayed word spans
const wordSpanArray = []
// Array of sanitised strings to compare user input to
const comparisonWordsArray = []

// Span of the current word
let currentWordSpan = null
// User input comparison string for the current word
let comparisonWord = null

// to keep track of score
let totalCorrectWords = null
let totalIncorrectWords = null

// for timer
let countdown = 59
const timer = document.querySelector(".timer-text")
let countdownStarted = false