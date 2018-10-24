const worldsAPI = 'http://localhost:3000/api/v1/worlds'
const recipesAPI = 'http://localhost:3000/api/v1/recipes'
const ratingsAPI = 'http://localhost:3000/api/v1/ratings'
const ingredientsAPI = 'http://localhost:3000/api/v1/ingredients'
document.addEventListener('DOMContentLoaded', () => {

  getData()

  document.addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.className === 'Star Wars') {
      $(document).ready(function(){
        $(".main").tiltedpage_scroll({
          angle: 20
        });
  		});
      let targetDiv = document.getElementById('Star Wars')
      targetDiv.style.display = 'block'
      document.getElementById("main_container").style.display = 'none'
      let returnButton = document.createElement('button')
      returnButton.innerText = 'Return to World Selection'
      returnButton.id = "returnButton"
      let renderContainer = document.getElementById('renderContainer')
      renderContainer.appendChild(returnButton)
    } // end star wars 'if'
    else if (event.target.className === 'Harry Potter') {
      $(document).ready(function(){
        $(".main").tiltedpage_scroll({
          angle: 20
        });
  		});
      let targetDiv = document.getElementById('Harry Potter')
      targetDiv.style.display = 'block'
      document.getElementById("main_container").style.display = 'none'
      let returnButton = document.createElement('button')
      returnButton.innerText = 'Return to World Selection'
      returnButton.id = "returnButton"
      let renderContainer = document.getElementById('renderContainer')
      renderContainer.appendChild(returnButton)
    } // end hp 'else if'
    else if (event.target.className === 'The Lord of the Rings') {
      $(document).ready(function(){
        $(".main").tiltedpage_scroll({
          angle: 20
        });
  		});
      let targetDiv = document.getElementById('The Lord of the Rings')
      targetDiv.style.display = 'block'
      document.getElementById("main_container").style.display = 'none'
      let returnButton = document.createElement('button')
      returnButton.innerText = 'Return to World Selection'
      returnButton.id = "returnButton"
      let renderContainer = document.getElementById('renderContainer')
      renderContainer.appendChild(returnButton)
    } // end lotr 'else if'
    else if (event.target.innerText === 'Return to World Selection') {
      document.getElementById("main_container").style.display = 'block'
      let htmlCollection = document.getElementsByClassName('recipesContainer')
      let recipesContainer = Array.from(htmlCollection)
      recipesContainer.map(recipe => {
        recipe.style.display = 'none'
      })
      event.target.remove()
    } // end return to selection 'else if'
    else if (event.target.innerText === 'Like') {
      let ratingField = event.target.previousSibling
      fetch(ratingsAPI, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: true,
          recipe_id: event.target.id,
        })
      })  // post likes fetch end
      .then(result => result.json())
      .then(rating => {
        fetchRatings(rating)
      })
    } // end like 'else if'
    else if (event.target.innerText === 'Dislike') {
      let ratingField = event.target.previousSibling.previousSibling
      fetch(ratingsAPI, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: false,
          recipe_id: event.target.id,
        })
      }) // post dislikes fetch end
      .then(result => result.json())
      .then(rating => {
        fetchRatings(rating)
      })
    } // end dislike 'else if'
  }) // click event listener end
}) // dom content loaded event listener end
// fetch all data from worlds api
function getData() {
  fetch(worldsAPI)
  .then(results => results.json())
  .then(results =>
    results.map(result => createWorlds(result))
  )
} // getData end
function fetchRatings(rating) {
  fetch(ratingsAPI)
  .then(result => {
    return result.json()
  })
  .then(resultJSON => {
    matchingRatings = resultJSON.filter(eachRating => {
      return eachRating.recipe_id == rating.recipe_id
    }) // filter end
    return calculateLikePercentage(matchingRatings, rating)
  })
} // fetchRatings end
function calculateLikePercentage(matchingRatings, rating) {
  let upvote = matchingRatings.filter(eachRating => {
    return eachRating.score === true
  })
  let upvotePercentage = `${Math.ceil((upvote.length / matchingRatings.length) * 100)}% liked`
  let allPTags = document.querySelectorAll('p')
  let allPTagsArray = Array.from(allPTags)
  let pTag = allPTagsArray.find(ptag => {
    return ptag.id == rating.recipe_id
  })
  pTag.innerText = upvotePercentage
} // calculateLikePercentage end
function createWorlds(world) {
  // world selection
  let globalContainer = document.getElementsByClassName('main_container')
  let worldContainer = document.getElementById('links')
  let worldButton = document.createElement('a')
  worldButton.href = ''
  worldButton.innerText = world.name
  worldButton.image = world.image
  worldButton.className = world.name
  worldContainer.appendChild(worldButton)
  // world render
  let renderContainer = document.getElementById('renderContainer')
  let worldRecipesContainer = document.createElement('div')
  worldRecipesContainer.id = world.name
  worldRecipesContainer.className = 'recipesContainer'
  worldRecipesContainer.style.display = 'none'
  let worldHeader = document.createElement('h1')
  worldHeader.innerText = world.name
  // render recipes
  let recipesDiv = document.createElement('div')
  recipesDiv.className = 'main'
  let recipes = world.recipes
  recipes.forEach(recipe => {
    let recipeHeader = document.createElement('h2')
    recipeHeader.innerText = recipe.name
    // let recipeImage = document.createElement('img')
    // recipeImage.src = recipe.image
    // render ratings
    let ratings = recipe.ratings
    let positiveRatings = ratings.filter(rating => rating.score === true)
    let percentRating = `${Math.ceil((positiveRatings.length / ratings.length) * 100)}% liked`
    let ratingP = document.createElement('p')
    ratingP.innerText = percentRating
    ratingP.id = recipe.id
    let upVote = document.createElement('button')
    upVote.id = recipe.id
    upVote.innerText = "Like"
    let downVote = document.createElement('button')
    downVote.id = recipe.id
    downVote.innerText = "Dislike"
    // render ingredients
    let ingredientsUl = document.createElement('ul')
    let ingredients = recipe.ingredients
    ingredients.forEach(ingredient => {
      let ingredientsLi = document.createElement('li')
      ingredientsLi.innerText = `${ingredient.quantity} ${ingredient.name}`
      ingredientsUl.appendChild(ingredientsLi)
    })
    let recipeInstructions = document.createElement('p')
    recipeInstructions.innerText = recipe.instructions
    //create recipes div
    let recipeSection = document.createElement('section')
    // recipeSection.className = `page${recipe.id}`
    recipeSection.className = `page${recipe.id}`
    // recipeSection.style.backgroundImage = `url(${recipe.image})`
    let recipeDiv = document.createElement('div')
    recipeDiv.className = 'page_container'
    recipeDiv.style.backgroundImage = `url(${recipe.image})`
    // recipeDiv.style = 'transform: rotateX(0deg) scale(1, 1); opacity: 1;'
    recipeDiv.appendChild(recipeHeader)
    // recipeDiv.appendChild(recipeImage)
    recipeDiv.appendChild(ratingP)
    recipeDiv.appendChild(upVote)
    recipeDiv.appendChild(downVote)
    recipeDiv.appendChild(ingredientsUl)
    recipeDiv.appendChild(recipeInstructions)
    recipeSection.appendChild(recipeDiv)
    recipesDiv.appendChild(recipeSection)
    // debugger
  })
  worldRecipesContainer.appendChild(worldHeader)
  worldRecipesContainer.appendChild(recipesDiv)
  renderContainer.appendChild(worldRecipesContainer)
} // create worlds end

$(".main").tiltedpage_scroll({
    sectionContainer: "> section",     // In case you don't want to use <section> tag, you can define your won CSS selector here
    angle: 50,                         // You can define the angle of the tilted section here. Change this to false if you want to disable the tilted effect. The default value is 50 degrees.
    opacity: true,                     // You can toggle the opacity effect with this option. The default value is true
    scale: true,                       // You can toggle the scaling effect here as well. The default value is true.
    outAnimation: true                 // In case you do not want the out animation, you can toggle this to false. The defaul value is true.
  });
