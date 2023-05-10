function startAndStopTimer() {

    countdownStarted = true

    const timer = document.querySelector(".timer-text")

    const countdownForDisplay = setInterval(() => {
        timer.innerHTML = countdown
        countdown--
    }, 1000)

    const countdownForInput = setTimeout(() => {
        timer.innerHTML = 0
        clearInterval(countdownForDisplay)

        const resultsContainer = document.querySelector("#results-popup")
        resultsContainer.style.display = 'block'

        let totalWordsTyped = totalCorrectWords + totalIncorrectWords

        const totalWordsDisplay = document.querySelector('#total-words-display')
        const totalCorrectWordsDisplay = document.querySelector('#total-correct-words-display')
        const totalIncorrectWordsDisplay = document.querySelector('#total-incorrect-words-display')
        const accuracyDisplay = document.querySelector('#percentage-of-correct-words')

        totalWordsDisplay.innerHTML = totalWordsTyped + '.'
        totalCorrectWordsDisplay.innerHTML = totalCorrectWords + '.'
        totalIncorrectWordsDisplay.innerHTML = totalIncorrectWords + '.'
        if (totalWordsTyped == 0) {
            accuracyDisplay.innerHTML = 'N.A.'
        } else {
            let accuracy = Math.round(totalCorrectWords / (totalWordsTyped) * 100)
            accuracyDisplay.innerHTML = accuracy + '%'
        }

        resultsContainer.focus()

        timerFinished = true

    }, 60000)
}
