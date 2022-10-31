"use strict";
let numid = 1;
let ing1;
let rec1;
//static starting json
const IngredientArr = [
  {
    name: "Broccoli",
    image:
      "https://www.health.harvard.edu/media/content/images/p7_Broccoli_HH1812_gi905351392.jpg",
    calories: 34,
  },
  {
    name: "Cauliflower",
    image:
      "http://t3.gstatic.com/images?q=tbn:ANd9GcSeg3atgP35f83U_eFhOPcnD6-ZDUh19g0EhYvLjznjfW4p6tzcSyr1qLHAEA7Q0zPZSJqjUuX-XhQA2aLcggM",
    calories: 25,
  },
  {
    name: "Nudels ",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Fresh_ramen_noodle_001.jpg",
    calories: 138,
  },
  {
    name: "Soy sauce",
    image:
      "https://cdn.shopify.com/s/files/1/0206/9470/products/10683_HFARM_49645309-3_grande.jpeg?v=1441105440",
    calories: 12,
  },
];
//actual relevant json for ingredients
const IngredientJson = [];

//json for dishes
const DishRecipeJson = [];

class Ingredient {
  constructor(name, image, calories) {
    this.id = numid++;
    this.name = name;
    this.image = image;
    this.calories = Number(calories);
  }
  //render all ingredients
  renderIng(str, Arr) {
    for (let i = 0; i < Arr.length; i++) {
      str += `<div class="col-4">
         <div  class="check">
         <label>add</label>
         <input type="checkbox" id="food${i}"/></div>
         <div class="dishes">
               <br>
               <p>ingredient details:</p>
               <img
                 src="${Arr[i].image}"
                 class="img-fluid"
               />
               <p>${Arr[i].name}</p>
               <p>calories: ${Arr[i].calories}</p>
             </div></div>`;
    }
    return str;
  }
}
//gets an array of all the checked ingredients
//should be inside dishes
function getIngredients() {
  let specificIngArr = [];
  for (let i = 0; i < IngredientJson.length; i++) {
    if (document.getElementById(`food${i}`).checked) {
      specificIngArr.push(IngredientJson[i]);
    }
  }
  return specificIngArr;
}
// new recipe/ingredient button
function openBtn(btnId) {
  let main = document.querySelector("#main").classList;
  if (main.contains("hidden")) {
    main.remove("hidden");
  }
  let flag = 0;
  if (btnId == "newReci") {
    let str = "";
    str += `<div>
        <label for="recipeName">Recipe name:</label><br />
        <input id="recipeName" type="text" />
      </div>
      <div>
        <label for="cookingMethod">Recipe cooking method: </label><br />
        <input id="cookingMethod" type="text" />
      </div>
      <div>
        <label for="cookingTime">Recipe cooking time: </label><br />
        <input id="cookingTime" type="text" />
      </div>
      <div>
        <label for="recipeImage">Recipe Image (url): </label><br />
        <input id="recipeImage" type="text" />
      </div>
      <br />
    
      <div>
        <h3>Choose ingridents</h3>
        <br />
    
        <div class="row ing">`;
    let newStr = ing1.renderIng(str, IngredientJson);

    newStr += `</div>
      </div>
    
      <div>
        <button id="createRecipe" onclick="createRecipe()">
          Create recipe
        </button>
      </div>
      <div>
        <button onclick="closeRender()">Close</button>
      </div>
      <hr />
    </div>`;
    document.getElementById("main").innerHTML = newStr;
    if (flag == 2) {
      main.toggle("hidden");
    }
    flag = 1;
  } else if ((btnId = "newIngr")) {
    let str = "";
    str += `<label for="ingredientName">Ingredient name:</label><br />
            <input id="ingredientName" type="text" />
          </div> 
          <div>
            <label for="ingredientImage">Ingredient Image (url):</label><br />
            <input id="ingredientImage" type="text" />
          </div>
          <div>
            <label for="ingredientCalories">Ingredient Calories:</label><br />
            <input id="ingredientCalories" type="text" />
          </div>
          <div>
            <button id="createIngredient" onclick="createIngredient()">Create Ingredient</button>
          </div>
          <div><button onclick="closeRender()">Close</button></div>
        </div><hr>`;
    document.getElementById("main").innerHTML = str;
    if (flag == 1) {
      main.toggle("hidden");
    }
    flag = 2;
  }
}
//manages create Ingredient BTN
function createIngredient() {
  const ingName = document.querySelector("#ingredientName").value;
  const ingImg = document.querySelector("#ingredientImage").value;
  const ingCal = document.querySelector("#ingredientCalories").value;

  ing1 = new Ingredient(ingName, ingImg, ingCal);
  IngredientJson.push(ing1);
  document.querySelector("#ingredientName").value = "";
  document.querySelector("#ingredientImage").value = "";
  document.querySelector("#ingredientCalories").value = "";
}

class DishRecipe {
  constructor(name, ingredients = [], time, cookingMethod, image) {
    this.name = name;
    this.ingredients = ingredients;
    this.time = time;
    this.cookingMethod = cookingMethod;
    this.image = image;
  }
  //add all ingrediens calories in a dish
  getTotalCalories() {
    let sum = 0;
    for (let i = 0; i < this.ingredients.length; i++) {
      sum += this.ingredients[i].calories;
    }
    return sum;
  }
  //render dished
  renderDish(str) {
    for (let i = 0; i < DishRecipeJson.length; i++) {
      str += `<div class="col-5 dishes">
           <h3>Dish Recipe details:</h3>
           <img
             src="${DishRecipeJson[i].image}"
             class="img-fluid"
           />
           <p>dish name: ${DishRecipeJson[i].name}</p>
  
           <p>Cooking method: ${DishRecipeJson[i].cookingMethod}</p>
           
           <p>Total cooking time: ${DishRecipeJson[i].time} minutes</p>
           <p>total calories: ${DishRecipeJson[i].getTotalCalories()}</p>
          <button onclick="openModal(${i})">show Ingredients</button>
           <div id="myModal${i}" class="modal">
           <div class="modal-content">
             <span class="close">&times;</span>
             <p id="modalContent${i}"></p>
           </div>
               </div>
  
       </div>`;
    }

    return str;
  }

  //gets all the ingredient of a specific dish
  //not doing anything yet
  getIngredients() {}
}
//manages create recipe BTN
function createRecipe() {
  const recName = document.querySelector("#recipeName").value;
  const recingredients = getIngredients();
  const recTime = document.querySelector("#cookingTime").value;
  const recCookingMethod = document.querySelector("#cookingMethod").value;
  const recImage = document.querySelector("#recipeImage").value;

  let rec1 = new DishRecipe(
    recName,
    recingredients,
    recTime,
    recCookingMethod,
    recImage
  );

  DishRecipeJson.push(rec1);
  let str = `<div class="row">`;
  let newStr = rec1.renderDish(str);

  document.getElementById("ph").innerHTML = newStr;
  document.querySelector("#recipeName").value = "";
  document.querySelector("#cookingTime").value = "";
  document.querySelector("#cookingMethod").value = "";
  document.querySelector("#recipeImage").value = "";
}

//close button
function closeRender() {
  document.querySelector("#main").classList.add("hidden");
}
//onload
function init() {
  //change the json file from objects to ingredients types
  for (let i = 0; i < IngredientArr.length; i++) {
    ing1 = new Ingredient(
      IngredientArr[i].name,
      IngredientArr[i].image,
      IngredientArr[i].calories
    );
    IngredientJson.push(ing1);
  }
}
//show ingredients modal
function openModal(index) {
  let modal = document.getElementById("myModal" + index);
  modal.style.display = "block";
  //for (let i = 0; i < DishRecipeJson.length; i++) {
  let ing1 = new Ingredient();
  let str = ing1.renderIng(
    `<div class="row ing">`,
    DishRecipeJson[index].ingredients
  );
  document.getElementById("modalContent" + index).innerHTML = str;
  // }

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
