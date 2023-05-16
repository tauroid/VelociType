function startAndStopTimer() {

    countdownStarted = true

    const timer = document.querySelector(".timer-text")

    const timerDecrementsEachSecond = setInterval(() => {
        timer.innerHTML = countdown
        countdown--
    }, 1000)

    const gameOverAtSixtySeconds = setTimeout(() => {
        timer.innerHTML = 0
        clearInterval(timerDecrementsEachSecond)

        const resultsContainer = document.querySelector("#results-popup")
        resultsContainer.style.display = 'block'

        let totalWordsTyped = totalCorrectWords + totalIncorrectWords

        const totalCorrectWordsDisplay = document.querySelector('#total-correct-words-display')
        const accuracyDisplay = document.querySelector('#percentage-of-correct-words')

        totalCorrectWordsDisplay.innerHTML = totalCorrectWords
        // full stop in aria-label so the screen reader pauses 
        totalCorrectWordsDisplay.setAttribute('aria-label', totalCorrectWords + '.')

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
