let result = document.getElementById("result");
let searchButton = document.getElementById("search-button");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchButton.addEventListener("click", () => {
  let userInput = document.getElementById("user-input").value;
  if (userInput.length == 0) {
    result.innerHTML = `<h3>Input field cannot be empty</h3>`;
  } else {
    fetch(url + userInput)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strInstructions);
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        result.innerHTML = `
            <img src=${myMeal.strMealThumb}>
            <div class="details">
            <h2>${myMeal.strMeal}</h2>
            <h4>${myMeal.strArea}</h4>
            </div>
            <div id="ingredient-content"></div>
            <div id="recipe">
            <pre id="instructions">${myMeal.strInstructions}</pre>
             <button id="back-button">Back</button>
            </div>
           <button id="show-recipe">View recipe</button>
            `;
        let ingredientContent = document.getElementById("ingredient-content");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideButton = document.getElementById("back-button");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientContent.appendChild(parent);
        });
        hideButton.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid input</h3>`;
      });
  }
});
