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
  })



