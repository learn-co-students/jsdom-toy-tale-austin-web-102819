let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const list = document.getElementById("toy-collection")
  const addToys = document.getElementsByClassName("add-toy-form")[0]
  
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  fetch('http://localhost:3000/toys').then(res => res.json())
  .then(json => displayToys(json))

  function displayToys(json) {
    json.forEach(toy => {
      let toyDiv = document.createElement("DIV");
      let img = document.createElement("img");
      let x = document.createElement("H1");
      let y = document.createElement("p");
      let q = document.createElement("button")
      toyDiv.classList.add("card");
      q.classList.add("like-btn");
      img.src = toy.image
      img.classList.add("toy-avatar")
      let z = toyDiv.appendChild(x)
      let w = toyDiv.appendChild(y)
      let t = toyDiv.appendChild(q)
      z.innerHTML = `Name: ${toy.name}`
      w.innerHTML = ` ${toy.likes} Likes`
      t.innerHTML = `Like <3`
      toyDiv.appendChild(img)
      list.appendChild(toyDiv)
      q.addEventListener("click", (event) => {
        event.preventDefault()
        console.log("hit")
        let more = parseInt(event.target.previousElementSibling.innerText) + 1
        fetch(`http://localhost:3000/toys/${event.target.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({likes: more}) })
            .then(res => res.json())
            .then((like_obj => {
              event.target.previousElementSibling.innerText = `${more} likes`;
            }))
        
      })
    })
  }
  addToys.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = document.querySelector("input[name=name]").value
    let image = document.querySelector("input[name=image]").value
    let likes = 0
    let toyDiv = document.createElement("DIV");
    let img = document.createElement("img");
    let x = document.createElement("H1");
    let y = document.createElement("p");
    let q = document.createElement("button")
    toyDiv.classList.add("card");
    q.classList.add("like-btn");
    img.src = image
    img.classList.add("toy-avatar")
    let z = toyDiv.appendChild(x)
    let w = toyDiv.appendChild(y)
    let t = toyDiv.appendChild(q)
    z.innerHTML = `Name: ${name}`
    w.innerHTML = ` ${likes} Likes`
    t.innerHTML = `Like <3`
    toyDiv.appendChild(img)
    list.appendChild(toyDiv)
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({name: name, image: image, likes: 0})
    })
  })
  
  // let like = document.querySelector("button#like-btn")


})
