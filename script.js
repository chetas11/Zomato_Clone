sendGetRestaurant = async (query) => {
    try {
        const resp = await fetch("https://developers.zomato.com/api/v2.1/search?entity_id=3&entity_type=city&q="+query+"&count=25",{
            headers: {"user-key": "33a4212611e9fef173ab4eb3a89775df"},
            results_shown : "5"
          });
        const data = await resp.json();
        console.log(data)
        for(let i=0; i<data.restaurants.length; i++){
            let thumb = data.restaurants[i].restaurant.thumb
            let name = data.restaurants[i].restaurant.name
            let address = data.restaurants[i].restaurant.location.address
            let contact = data.restaurants[i].restaurant.phone_numbers
            let Avlcuisines = data.restaurants[i].restaurant.cuisines
            let cost = data.restaurants[i].restaurant.average_cost_for_two
            let timings = data.restaurants[i].restaurant.timings
            let rating = data.restaurants[i].restaurant.user_rating.aggregate_rating +" - "+data.restaurants[i].restaurant.user_rating.rating_text
            
            if(thumb===""){
                thumb = "./images/no-img.jpg"
            }

            CreateResto(thumb,name,address,contact,Avlcuisines,cost,rating,timings)
        }
    } catch (err) {
        console.error(err);
    }
}

        let InputText;
        let ResultRow = document.getElementById("results-row"); 


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
        

function CreateResto(url,name,address,contact,cuisin,cost,rating,timings){
    let ImageCol = document.createElement("div");
    ImageCol.classList.add("col-lg-","col-md-4","col-sm-6","mt-3","img-div","text-center")
    let DetailsCol = document.createElement("div");
    DetailsCol.classList.add("col-lg-8","col-md-8","col-sm-8","mt-3","details-div")
    let img = document.createElement("img");
    img.classList.add("resto-images")
    img.src = url;
    let RestoName = document.createElement("h2");
    RestoName.innerText = name;
    RestoName.classList.add("mb-3")
    let RestoCusins = document.createElement("p");
    RestoCusins.innerText = "Cuisines: "+cuisin
    RestoCusins.classList.add("Cuisines")
    let RestoAddress = document.createElement("p");
    RestoAddress.innerText ="Address: "+ address
    let RestoContact = document.createElement("p");
    RestoContact.innerText = "Contact: "+contact
    let Cost = document.createElement("p");
    Cost.innerText = "Avg. Cost for Two: "+cost
    let Rating = document.createElement("p");
    Rating.innerText = "Ratings: "+rating
    let Timings = document.createElement("p");
    Timings.innerText = "Timings: "+timings
    DetailsCol.appendChild(RestoName)
    ImageCol.appendChild(img)
    ResultRow.appendChild(ImageCol)
    ResultRow.appendChild(DetailsCol)
    DetailsCol.appendChild(RestoCusins)
    DetailsCol.appendChild(RestoAddress)
    DetailsCol.appendChild(RestoContact)
    DetailsCol.appendChild(Cost)
    DetailsCol.appendChild(Timings)
    DetailsCol.appendChild(Rating)
    
}



