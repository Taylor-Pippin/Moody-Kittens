/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let affection = 5
let mood = ""
let kittenHistory = [];

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  document.getElementById("welcome").classList.add("hidden")

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5
    }

  let kittenName = form.name.value;

  if (kittenName == ""){alert("Where's the beef?")}
  else if (kittenHistory.includes(kittenName)) {
    alert("Two cats can't be alike")
  }
  else{ 
    kittens.push(kitten)
    kittenHistory.push(kittenName)
    saveKittens()

    drawKittens()
    form.reset()
  }
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  window.localStorage.setItem("kittenHistory", JSON.stringify(kittenHistory))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
  let storedKittenHistory = JSON.parse(window.localStorage.getItem("kittenHistory"))
  if (storedKittenHistory) {
    kittenHistory = storedKittenHistory
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenlistElem = document.getElementById("kittens")

  let kittenTemplate = ""

  kittens.forEach(kitten => {
    kittenTemplate += `
    <div class="card grow p-2 text-center w-20 bg-dark kitten ${kitten.mood}">
      <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4" height="150" width="150" alt="Moody Kittens">
      <div class="mt-2 text-light">
        <div class="d-flex justify-content-center"> Name: ${kitten.name}</div>
        <div class="d-flex justify-content-center"> Mood: ${kitten.mood}</div>
        <div class="d-flex justify-content-center"> Affection: ${kitten.affection}</div>
        
        <div>
          <button onclick="pet('${kitten.id}')">Pet</button>
          <button onclick="catnip('${kitten.id}')">Feed</button>
        </div>
        </div>
        <hr>
        <div class="d-flex justify-content-center">
        <i class="fa fa-trash text-danger action button-large" id="delete-btn"aria-hidden="true" onclick="removeKitten('${kitten.id}')"></i></div>
    </div>
    `
  })
  kittenlistElem.innerHTML = kittenTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let randomNumber = Math.random()
  if (randomNumber > 0.6) {
    currentKitten.affection ++;
    setKittenMood(currentKitten)
    saveKittens()
  }
  else currentKitten.affection --;
  setKittenMood(currentKitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "Tolerant"
  currentKitten.affection = 5;
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove(kitten.mood)
  if (kitten.affection >= 6) {kitten.mood = "Happy"}
  if (kitten.affection <= 5) {kitten.mood = "Tolerant"}
  if (kitten.affection <= 3) {kitten.mood = "Angry"}
  if (kitten.affection <= 0) {kitten.mood = "Gone"}

  document.getElementById("kittens").classList.add(kitten.mood)
  saveKittens()
}


function getStarted() {
  document.getElementById("welcome").remove();
  loadKittens();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function removeKitten(id) {
  let index = kittens.findIndex(kitten => kitten.id ==id)
  if (index == -1) {
    throw new Error("Invalid ID")
  }
  kittens.splice(index, 1)

  let indexName = kittens.findIndex(kitten => kitten.name == name)
  if (index == -1) {
    throw new Error("Invalid ID")
  }
  kittenHistory.splice(indexName, 1)

  saveKittens()
}
