sendGetRestaurant = async (query) => {
    try {
        const resp = await fetch("https://developers.zomato.com/api/v2.1/search?q="+query,{
            headers: {"user-key": "33a4212611e9fef173ab4eb3a89775df"}
          });
        const data = await resp.json();
        console.log(data)
        for(let i=0; i<data.restaurants.length; i++){
            CreateCard(data.restaurants[i].restaurant.thumb,data.restaurants[i].restaurant.name)
        }
    } catch (err) {
        console.error(err);
    }
}

        let InputText;

        let Searchbar = document.getElementById("search");
        Searchbar.addEventListener("change", ()=>{
            InputText = Searchbar.value
        })

        Searchbar.addEventListener("keyup", function(event) {
            if (event.code === "Enter") {
                event.preventDefault();
                ResultRow.innerHTML = ""
                sendGetRestaurant(InputText);
            }
        });

        let Searchbutton = document.getElementById("search-button");

        Searchbutton.addEventListener("click", ()=> {
                ResultRow.innerHTML = ""
                sendGetRestaurant(InputText);
        });
        


let ResultRow = document.getElementById("results-row");


function CreateCard(url,name){
    let ResultCol = document.createElement("div");
    ResultCol.classList.add("col-lg-4","col-md-4","col-sm-6")
    let Card  = document.createElement("div");
    Card.classList.add("card")
    let img = document.createElement("img");
    img.src = url;
    img.alt = "restaurant-img"
    let CardBody  = document.createElement("div");
    CardBody.classList.add("card-body");
    let Title = document.createElement("h5");
    Title.innerText = name;
    CardBody.appendChild(Title)
    Card.appendChild(img)
    Card.appendChild(CardBody)
    ResultCol.appendChild(Card)
    ResultRow.appendChild(ResultCol)
}



