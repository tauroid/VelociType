const sourceTextContainer = document.querySelector('.source-text-container')

fetch('https://flipsum-ipsum.net/api/icw/v1/generate?ipsum=recipe-ipsum-text-generator&start_with_fixed=0&paragraphs=4')
  .then(response => response.json())
  .then((data) => {
    data.forEach((text) => {
      const p = document.createElement('p')
      p.innerText = text
      sourceTextContainer.appendChild(p)
    })
  })
