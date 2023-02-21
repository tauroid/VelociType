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
      span.tabIndex = "3"
      spanArray.push(span)
      p.appendChild(span)
      p.appendChild(document.createTextNode(" "))
    })

    sourceTextContainer.appendChild(p)
  })
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
    spanArray[20].focus()
  })
