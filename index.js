'use strict';
import FetchWrapper from './modules/fetch.mjs';
import NutrientChart from './modules/nutrient-chart.mjs';
import snackbar from 'snackbar';

snackbar.duration = 3000;
snackbar.show("Hey, well come back !!!")

const API = new FetchWrapper(
    "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

let foods = [];
const selectedFoods = [];
const createNewFoodButton = document.getElementById("create-food-card");
const selectFoodButton = document.getElementById("select-food");
const foodSelector = document.getElementById("food-selector");
const foodCards = document.getElementById("food-cards");
const totalCalories = document.getElementById("total");

getDataFromAPI()

createNewFoodButton.addEventListener("click", event => {
    event.preventDefault();
    const name = document.getElementById("food")
    const carbs = document.getElementById("carbs")
    const prots = document.getElementById("proteins")
    const fats = document.getElementById("fats")
    const amount = document.getElementById("amount") 
    const body = {
        fields: {
            name: { stringValue: name.value },
            carbs: { integerValue: carbs.value },
            proteins: { integerValue: prots.value },
            fats: { integerValue: fats.value },
            amount: { integerValue: amount.value }
        }
    }
    name.value = "";
    carbs.value = "";
    prots.value = "";
    fats.value = "";
    amount.value = "";
    API.post("terohero4321", body)
       .then(res => {
           console.log(res)
           snackbar.show("Your data is now stored to server 😜")
           getDataFromAPI()
        })
       .catch(error => console.log(error))
})

foodSelector.addEventListener("change", () => {
    const food = getSelectedFood();
    NutrientChart.data.datasets[0].data = [food.carbs,food.proteins,food.fats]
    NutrientChart.update();
})

selectFoodButton.addEventListener("click", () => {
    const foodCard = getSelectedFood();
    selectedFoods.push(foodCard)
    fillCards();
    snackbar.show(`I love good food, even more ${foodCard.name} ❤️❤️❤️`)
})

function getSelectedFood() {
    const select = document.querySelector("#food-selector");
    const value = select.options[select.selectedIndex].value;
    return foods.find(food => food.name === value)
}

function fillSelector() {
    foodSelector.innerHTML = "";
    foods.forEach(food => {    
        const el = document.createElement("option");
        el.textContent = food.name;
        el.setAttribute("value", food.name)
        foodSelector.appendChild(el)
    })
}

function fillCards() {
    foodCards.innerHTML = "";
    totalCalories.textContent = calculateTotalCalories();
    selectedFoods.forEach(food => {
        const card = document.createElement("div");
        const h2 = document.createElement("h2");
        const nutrients = document.createElement("div")
        const carbs = document.createElement("div");
        const prots = document.createElement("div");
        const fats = document.createElement("div");
        const amount = document.createElement("p");
        const calories = document.createElement("p");
        card.classList = "card"
        h2.textContent = food.name;
        nutrien("carbs", food.carbs, carbs);
        nutrien("proteins", food.proteins, prots);
        nutrien("fats", food.fats, fats);
        amount.textContent = `Amount: ${food.amount}g`;
        calories.textContent = `Calories: ${calculateCalories(food)}`;
        foodCards.appendChild(card);
        card.appendChild(h2);
        card.appendChild(nutrients)
        nutrients.appendChild(carbs);
        nutrients.appendChild(prots)
        nutrients.appendChild(fats)
        card.appendChild(amount)
        card.appendChild(calories)
    })
}

function nutrien(text, amount,  div) {
    const nutrientText = document.createElement("p");
    const amountText = document.createElement("p")
    nutrientText.textContent = "• " + text;
    amountText.textContent = amount;
    div.appendChild(nutrientText);
    div.appendChild(amountText); 
}

function calculateTotalCalories() {
    return selectedFoods.map(food => calculateCalories(food)).reduce((a,b) => a + b, 0);
}

function calculateCalories(food) {
    return food.amount * (food.carbs * 4 + food.proteins * 4 + food.fats * 9) / 100;
}

function getDataFromAPI() {
    API.get("terohero4321")
        .then(res => res.documents.slice(1))
        .then(data => data.map(el => el.fields))
        .then(foodList => {
            foods = foodList.map(el => {
                return { 
                    name: el.name.stringValue,
                    carbs: el.carbs.integerValue,
                    proteins: el.proteins.integerValue,
                    fats: el.fats.integerValue,
                    amount: el.amount.integerValue
                }
            })
            snackbar.show("Your data is succefully downloaded from server ❤️")
            fillSelector();
        })
        .catch(error => {
            console.log(error)
            snackbar.show("Error in downloading your data ☹️")
        })
}
