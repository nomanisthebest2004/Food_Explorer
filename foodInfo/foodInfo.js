console.log("FOOD INFO");
const params = new URLSearchParams(window.location.search);
const idFood = params.get("idFood");
const bigDiv = document.getElementById("container");

(async function fetchData() {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`);
        const data = await response.json();
        const foodObj = data.meals[0];
        console.log(foodObj);
        document.title = `${foodObj.strMeal}`;
        // For newDiv
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "foodCard");
        newDiv.setAttribute("id", `${foodObj.idMeal}`);
        newDiv.innerHTML = `
            <div class = "foodDetails">
                <div id = "ChunkDataName">
                    <h3>${foodObj.strMeal}</h3>
                </div>
                <div class = "foodImg">
                    <img src=" ${foodObj.strMealThumb} " alt="image not found">
                </div>
                <div class = "recipe">
                    <h3>How to Make:</h3> <p>${foodObj.strInstructions}</p>
                </div>
                <h3 class = "ChunkData">Category: ${foodObj.strCategory}</h3>
                <h3 class = "ChunkData">Origin: ${foodObj.strArea}</h3>
            </div>`
        // Append Food Ingredients
        const ingredients = [];
        const measure = [];
        const ingredients_measure = [];
        for (let key in foodObj) {
            if (key.includes('strIngredient') && foodObj[key].trim() !== "") {
                ingredients.push(foodObj[key]);
            } else if (key.includes('strMeasure') && foodObj[key].trim() !== "") {
                measure.push(foodObj[key]);
            }
        }
        for (let index = 0; index < measure.length; index++) {
            ingredients_measure.push(ingredients[index] + ' - ' + measure[index]);
        }
        const listDiv = document.createElement('div');
        listDiv.setAttribute("id", "itemList")
        listDiv.innerHTML = `<h3>Things Are Need:</h3>`;
        const olIngredientsMeasure = document.createElement("ol");
        for (let item of ingredients_measure) {
            let listItem = document.createElement("li");
            listItem.innerText = item;
            olIngredientsMeasure.appendChild(listItem)
        }
        listDiv.appendChild(olIngredientsMeasure);
        newDiv.appendChild(listDiv);
        const linkDiv = document.createElement('div')
        linkDiv.setAttribute("id", "linkDiv");
        linkDiv.innerHTML = `
        <div class="foodInfoLinks">
            <a href = ${foodObj.strSource} target = "blank">blog</a>
            <a href = ${foodObj.strYoutube} target = "blank">yt</a>
        </div>`
        newDiv.appendChild(linkDiv)
        // Appends newDiv to bigDiv
        bigDiv.appendChild(newDiv);
    } catch (error) {
        console.error("This is an error", error);
    }
})()
