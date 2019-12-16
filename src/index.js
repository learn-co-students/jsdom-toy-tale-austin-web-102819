let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
    // console.log(addToy);
    
  });

function fetchToys(){
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(renderToys)
};
fetchToys()
 const toyCollection = document.getElementById('toy-collection')
 
 function renderToys(toys) {
   toyCollection.innerHTML = ""

   toys.forEach( toy => {
    toyCollection.innerHTML += `
    <div class="card" data-id=${toy.id}>
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" >
      <p>${toy.likes}</p>
      <button class="like-btn">Like <3</button>
      </div>
    `
    })
  }

  const addToyForm = document.querySelector('.add-toy-form')

  addToyForm.addEventListener('submit', function (event) {
  fetch(`http://localhost:3000/toys/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `${event.target.name.value}`,
      image: `${event.target.image.value}`,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then(renderToys)
})

const toyCollection = document.getElementById('toy-collection')
toyCollection.addEventListener('click', function (event) {
  let likeButtonIsPressed = event.target.className === "like-btn"
  let delButtonIsPressed = event.target.className === "delete-btn"
  if (likeButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCount
      })
    })
    .then(response => response.json())
  }




});
