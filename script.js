const bigDiv = document.getElementById("container");
const button = document.getElementById("btn");
let terminate = document.getElementById("finish");

(async function fetchData() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s");

        const data = await response.json();
        console.log(data.meals)

        for (let i in data.meals) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "foodCard");
            newDiv.setAttribute("id", `fc${i}`);
            newDiv.innerHTML =
                `
            <div class = "foodImg">
                <img src=" ${data.meals[i].strMealThumb} " alt="image not found">
            </div>
                <div class = "foodDetails">
                <h3 class = "ChunkDataName">Dish: ${data.meals[i].strMeal}</h3>
                <h3 class = "ChunkData">Category: ${data.meals[i].strCategory}</h3>
                <h3 class = "ChunkData">Origin: ${data.meals[i].strArea}</h3>
            </div>
            <div  id ="goToFood">
                <a href = "https://www.themealdb.com/api/json/v1/1/search.php?s=${data.meals[i].strMeal}" target = "blank">Click To See More Details</a>
            </div>

            `
            bigDiv.appendChild(newDiv);
            
            let foodInfo = document.createElement("div");
            foodInfo.setAttribute("class", "foodInfo");
            foodInfo.setAttribute("id", `fi${i}`);


            foodInfo.innerHTML = `
                <img src=" ${data.meals[i].strMealThumb} " alt="image not found">
                <div>
                    <h1>${data.meals[i].strMeal}</h1>
                    <h1>${data.meals[i].strCategory}</h1>
                    <h1>${data.meals[i].strArea}</h1>
                </div>

                <div>
                    <p>${data.meals[i].strInstructions}</p>
                </div>
                <h1>Ingredients</h1>
                <div class ="ingredients">
                    <ol>
                    <li>${data.meals[i].strIngredient1}</li>
                    <li>${data.meals[i].strIngredient2}</li>
                    <li>${data.meals[i].strIngredient3}</li>
                    <li>${data.meals[i].strIngredient4}</li>
                    <li>${data.meals[i].strIngredient5}</li>
                    <li>${data.meals[i].strIngredient6}</li>
                    <li>${data.meals[i].strIngredient7}</li>
                    </ol>
                </div>
                </div>
                <div class="foodInfoLinks">
                    <a href = ${data.meals[i].strSource} target = "blank">blog</a>
                    <a href = ${data.meals[i].strYoutube} target = "blank">yt</a>
                </div>
                `
            bigDiv.appendChild(foodInfo);
        }




        for (let i in data.meals) {
            const fCard = document.getElementById(`fc${i}`);
            const fInfo = document.getElementById(`fi${i}`);

            fCard.addEventListener('click', () => {
                fCard.style.display = 'none';
                fInfo.style.display = 'block';
            });

            fInfo.addEventListener('click', () => {
                fInfo.style.display = 'none';
                fCard.style.display = 'block';
            });
        }





        terminate.innerHTML = "<h1>the end</h1>";

        let test = document.querySelectorAll(".foodCard");

        // for (let i of test) {
        //     i.addEventListener("click", () => {
        //         console.log(i.querySelector(".ChunkDataName").textContent);
        //     });
        // }

    }
    catch (error) {
        console.error("This is an error", error);
    }
})()
// button.addEventListener("click", fetchData)

// const div = document.createElement('div');
// div.textContent = 'Hello World';
// document.body.appendChild(div);

