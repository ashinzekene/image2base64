// ts-check

let imgInput = document.querySelector("#image-input")
let output = document.querySelector(".res")
let dataUrlCont = document.querySelector(".data-url")

imgInput.onchange = function(e) {
  imgArr = Array.from(e.target.files)
  imgArr = imgArr.filter(({ type }) => ~type.search(/\bimage/))
  console.log(imgArr)
  // drawImage(imgArr)
  toBase64(imgArr)
  // toArrayBuffer(imgArr)
}

function drawImage(imgs) {
  console.log("Doing")
  imgs.forEach(img => {
    let imgElement = document.createElement("img")
    imgElement.className = "rounded mx-auto d-block"
    imgElement.src = window.URL.createObjectURL(img)
    imgElement.width = 100
    output.appendChild(imgElement)
  })
}


function toBase64(imgs) {
  let counter = 1
  imgs.forEach(img => {
    let fileReader = new FileReader()
    fileReader.readAsDataURL(img)
    fileReader.onload = (e) => {
      let imgContainer = document.createElement("div")
      let imgElement = document.createElement("img")
      let pEl = document.createElement("p")
      pEl.className = "base64-text p-3"
      pEl.textContent = e.target.result
      imgElement.className = "rounded mx-auto d-block"
      // imgElement.src = window.URL.createObjectURL(img)
      imgElement.src = e.target.result
      imgElement.width = 100
      imgContainer.appendChild(imgElement)
      imgContainer.appendChild(pEl)
      output.appendChild(imgContainer)
      console.log("Finished base64", counter)
      counter++
    }
  })
}

function toArrayBuffer(imgs) {
  let counter = 1
  imgs.forEach(img => {
    let fileReader = new FileReader()
    fileReader.readAsArrayBuffer(img)
    fileReader.onload = (e) => {
      console.log(e.target.result)
      dataUrlCont.innerHTML += `${img.name}:</br>  ${JSON.stringify(e.target.result)}</br></br>`
      console.log("Finished array buffer", counter)
      counter++
    }
  })
}