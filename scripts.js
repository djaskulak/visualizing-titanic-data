import data from './titanic-data.js'

// Get a reference to the #titanic
const titanic = document.querySelector('#passengers')

// Set some styles on the titanic
// display flex, justifyContent center, alignItems flex-end
titanic.style.display = 'grid'
titanic.style.gridTemplateColumns = 'repeat(45, 20px)'
titanic.style.gridGap = '1px'

// Map over the data and make a new element for each passenger
const passengers = data.map(p => {
  return document.createElement('div')
})

// Loop over each passenger and append them to the titanic
passengers.forEach(p => {
  titanic.appendChild(p)
  p.style.width = '20px'
  p.style.height = '20px'
  p.style.backgroundColor = '#eee'
})

/* ------------------------------------------------------------------------------------------ */

// Connecting buttons form HTML to Javascript
const buttonGender = document.getElementById('button-gender')
const buttonEmbarked = document.getElementById('button-embarked')
const buttonSurvived = document.getElementById('button-survived')

const buttonSortGender = document.getElementById('button-sort-gender')
const buttonSortEmbarked = document.getElementById('button-sort-embarked')
const buttonSortSurvived = document.getElementById('button-sort-survived')
const buttonSortFare = document.getElementById('button-sort-fare')
const buttonSortId = document.getElementById('button-sort-id')

// Handling states of passenger details showing 
let showGender = false
let showEmbarked = false 
let showSurvived = false

/*--------------------------Adding Event Listeners to buttons---------------------------------*/

// Showing data of passengers
buttonGender.addEventListener('click', (e) => {
  showGender = !showGender
  selectButton(e.target, showGender)
  displayByGender()
})

buttonEmbarked.addEventListener('click', (e) => {
  showEmbarked = !showEmbarked
  selectButton(e.target, showEmbarked)
  displayByEmbarked()
})

buttonSurvived.addEventListener('click', (e) => {
  showSurvived = !showSurvived
  selectButton(e.target, showSurvived)
  displaySurvived()
})

// Sorting data of passengers 
buttonSortGender.addEventListener('click', (e) => {
  data.sort((a, b) => {
    return a.fields.sex === 'male' ? -1 : 1
  })

  displayByGender()

  sortButtons(e.target)
})

buttonSortEmbarked.addEventListener('click', (e) => {
  data.sort((a, b) => {
    const x = a.fields.embarked !== undefined ? a.fields.embarked.charCodeAt(0) : 0
    const y = b.fields.embarked !== undefined ? b.fields.embarked.charCodeAt(0) : 0
    return x - y
  })

  displayByEmbarked()
  
  sortButtons(e.target)
})

buttonSortSurvived.addEventListener('click', (e) => {
  data.sort((a, b) => {
    return a.fields.survived === 'Yes' ? -1 : 1
  })

  displaySurvived()
  
  sortButtons(e.target)
})

buttonSortFare.addEventListener('click', (e) => {
  data.sort((a, b) => {
    const x = a.fields.fare !== undefined ? a.fields.fare : 0
    const y = b.fields.fare !== undefined ? b.fields.fare : 0
    return y - x
  })
  displayByGender()
  displayByEmbarked()
  displaySurvived()

  sortButtons(e.target)
})

buttonSortId.addEventListener('click', (e) => {
  sortButtons(e.target)
  data.sort((a, b) => {
    console.log(a.fields.passengerid - b.fields.passengerid)
    return a.fields.passengerid - b.fields.passengerid
  })

  displayByGender()
  displayByEmbarked()
  displaySurvived()
})

/*------------------------------Functions for the buttons---------------------------------*/

function selectButton(button, state) {
  if (state) {
    button.classList.add('button-selected')
  } else {
    button.classList.remove('button-selected')
  }
}

function sortButtons(button) {
  [buttonSortId, buttonSortSurvived, buttonSortEmbarked, buttonSortGender, buttonSortFare].forEach((button) => {
    button.classList.remove('button-selected')
  })
  button.classList.add('button-selected')
}

// Display functions
function displayByGender() {
  passengers.forEach((p, i) => {
    const { sex } = data[i].fields
    p.style.borderRadius = sex === 'female' ? '50%' : '0%'
  })
}

function displayByEmbarked() {
  if (showEmbarked) {
    passengers.forEach((p, i) => {
      const { embarked } = data[i].fields
      p.style.backgroundColor = (embarked === 'S') ? ('#cdb4db') : ((embarked === 'C') ? ('#ffafcc') : ('#a2d2ff'))
    })
  } else {
    p.style.backgroundColor = '#eee'
  }
}

function displaySurvived() {
  passengers.forEach((p, i) => {
    const { survived } = data[i].fields
    if (showSurvived) {
      p.style.opacity = survived === 'Yes' ? '100%' : '50%' 
    } else {
      p.style.backgroundColor = '#eee'
    }
  })
}

/*------------------------------Displaying the Overlay---------------------------------*/
const overlay = document.querySelector("#overlay")