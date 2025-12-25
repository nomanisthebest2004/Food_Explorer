const bigDiv = document.getElementById("container");
const button = document.getElementById("btn");
let terminate = document.getElementById("finish");


(async function fetchData() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s");

        const data = await response.json();
        console.log(data);

        for (let i in data.meals) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "foodCard");
            newDiv.setAttribute("id", `${data.meals[i].idMeal}`);
            newDiv.innerHTML = `
            <div class = "foodImg">
                <img src=" ${data.meals[i].strMealThumb} " alt="image not found">
            </div>
                <div class = "foodDetails">
                <h3 class = "ChunkDataName">Dish: ${data.meals[i].strMeal}</h3>
                <h3 class = "ChunkData">Category: ${data.meals[i].strCategory}</h3>
                <h3 class = "ChunkData">Origin: ${data.meals[i].strArea}</h3>
            </div>
            <div  class ="goToFood" id = "${data.meals[i].idMeal}">
                <a href = "foodInfo/foodInfo.html" target = "blank">Click To See More Details</a>
            </div>`
            bigDiv.appendChild(newDiv);
        }

        terminate.innerHTML = "<h1>the end</h1>";

        let goToFoodDivs = document.querySelectorAll(".goToFood");

        for (let div of goToFoodDivs) {
            div.addEventListener("click", () => {
                let idFood = div.getAttribute('id');
                window.location.href = `foodInfo/foodInfo.html?idFood=${idFood}`;
            });
        }
        // Search:
        const mealName = [];
        const mealId = []
        for(obj of data.meals){
            mealName.push(obj.strMeal.toLowerCase().trim())
        }
        for(obj of data.meals){
            mealId.push(obj.idMeal)
        }
        console.log(mealName.length);
        console.log(mealId.length);
        const btn2 = document.getElementById("btn2")

        btn2.addEventListener("click", () => {
            const value = document.getElementById("whoAmI").value.toLowerCase();
            indexOfMeal = undefined;
            for(meal of mealName){
                if(meal === value){
                    indexOfMeal = mealName.indexOf(meal)
                }
            }
        const divs = document.querySelectorAll(".foodCard")
            for(let div of divs){
                if (div.id != mealId[indexOfMeal]){
                    div.style.display = "none"
                } ;
            }
        });

    }
    catch (error) {
        console.error("This is an error", error);
    }
})()
