let addToy = false

window.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const toyColl = document.querySelector('#toy-collection');
  const toyName = document.querySelector('input[name="name"]');
  const toyImage = document.querySelector('input[name="image"]');
  const form = document.querySelector('form.add-toy-form')

  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  });

  form.addEventListener('submit', createToy);

  function createToy(event) {
    event.preventDefault();
    let data = {};
    data.name = toyName.value;
    data.image = toyImage.value;
    data.likes = 0;

    console.log(data);

    let object = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }
    fetch("http://localhost:3000/toys", object).then(renderToys);
  }

  function renderToys() {
    fetch("http://localhost:3000/toys").then(response => response.json()).then(json => {
      toyColl.innerHTML = '';
      json.forEach(toy => {
        let card = document.createElement('div.card');
        card.innerHTML = `<h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like</button>`;
        toyColl.appendChild(card);
      });
    });
  }

  renderToys();

})
