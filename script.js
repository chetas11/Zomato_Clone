        let LocationText;
        let SearchText;
        let EntityId;
        let EntityType;
        let ResultRow = document.getElementById("results-row");
        let Searchbutton = document.getElementById("search-button");
        let Searchbar = document.getElementById("search");
        let Locationbar = document.getElementById("location");
        let SearchIcon = document.getElementById("search-icon");


        document.addEventListener("DOMContentLoaded" , ()=>{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position){
                    let lat = position.coords.latitude
                    let long = position.coords.longitude
                    searchRestroByLocation(lat,long)
                })
            }
        })


searchRestroByLocation = async (lat, long) => {
    try {
        const resp = await fetch(`https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${long}` ,{
            headers: {"user-key": "33a4212611e9fef173ab4eb3a89775df"},
          });
        const data = await resp.json();
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








sendGetRestaurant = async (query,entityid,entitytype) => {
    try {
        const resp = await fetch("https://developers.zomato.com/api/v2.1/search?entity_id="+entityid+"&entity_type="+entitytype+"&q="+query,{
            headers: {"user-key": "33a4212611e9fef173ab4eb3a89775df"},
            results_shown : "5"
          });
        const data = await resp.json();
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






GetLocations = async (location) => {
    try {
        const resp = await fetch("https://developers.zomato.com/api/v2.1/locations?query="+location,{
            headers: {"user-key": "33a4212611e9fef173ab4eb3a89775df"},
          });
        const data = await resp.json();
        EntityId = data.location_suggestions[0].entity_id;
        EntityType = data.location_suggestions[0].entity_type;
    } catch (err) {
        console.error(err);
    }
}

    let suggestionPanel = document.querySelector(".suggestions")

    const SearchSuggestion = async (searchText) =>{
            suggestionPanel.innerHTML = ""
            const resp =  await fetch("https://developers.zomato.com/api/v2.1/search?&q="+searchText,{
            headers: {"user-key": "33a4212611e9fef173ab4eb3a89775df"},
            });
            let data = await resp.json();
            let Suggestions = data.restaurants.filter((restaurantName) => {
                return restaurantName.restaurant.name.toLowerCase().startsWith(searchText.toLowerCase());
            })

            Suggestions.forEach((suggested) =>{
                const div = document.createElement("div")
                div.innerHTML = suggested.restaurant.name
                suggestionPanel.appendChild(div)
            })
            
            if(searchText == ""){
                suggestionPanel.innerHTML = ""
            }

    }

    Searchbar.addEventListener("input" , () => {
        SearchSuggestion(Searchbar.value)
    
    })


            


        
        Searchbar.addEventListener("change", ()=>{
            SearchText = Searchbar.value
        })

        Locationbar.addEventListener("change", ()=>{
            LocationText = Locationbar.value
            GetLocations(LocationText)
        })

        Searchbar.addEventListener("keyup", function(event) {
            if (event.code === "Enter") {
                event.preventDefault();
                ResultRow.innerHTML = ""
                Searchbar.value = ""
                Locationbar.value = ""
                suggestionPanel.innerHTML = ""
                sendGetRestaurant(SearchText,EntityId,EntityType);
            }
        });

        SearchIcon.addEventListener("click", ()=> {
            if(Searchbar.value){
                ResultRow.innerHTML = ""
                Searchbar.value = ""
                Locationbar.value = ""
                suggestionPanel.innerHTML = ""
                sendGetRestaurant(SearchText,EntityId,EntityType);
            }else{
                alert("Enter restaurants/cuisines/dish")
            }       
        });


        Searchbutton.addEventListener("click", ()=> {
            if(Searchbar.value){
                ResultRow.innerHTML = ""
                Searchbar.value = ""
                Locationbar.value = ""
                sendGetRestaurant(SearchText,EntityId,EntityType);
            }else{
                alert("Enter restaurants/cuisines/dish")
            }       
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



