//https://api.weatherapi.com/v1/current.json?key=ac49728a35d6456ba8e94725240502&q=London&aqi=no

const temp_field = document.querySelector(".temp-field")
const location_field = document.querySelector(".location-field")
const date_field = document.querySelector(".date-field")
const condition_field = document.querySelector(".condition-field")
const form_field = document.querySelector("form")
const search = document.querySelector(".search_area")

//when we hit submit the form then search for locaion function calls
form_field.addEventListener('submit', search_for_location);

//this is my default location 
let target = "Kolkata"


//this function fetch response from api in json format 
async function fetch_api(target_location) {

    let url = `https://api.weatherapi.com/v1/current.json?key=ac49728a35d6456ba8e94725240502&q=${target_location}&aqi=no`

    let res = await fetch(url)

    let result = await res.json()

    let temp_value = result.current.temp_c
    let locaion_value = result.location.name
    let time_value = result.location.localtime
    let condition_value = result.current.condition.text


    //call update text funtion which can manuplate the text of my html from the fetched api object value
    update_text(temp_value, locaion_value, time_value, condition_value)


}


//its manuplate the dom innertext 
function update_text(temp_value, locaion_value, time_value, condition_value) {
    temp_field.innerText = temp_value + "°c"
    location_field.innerText = locaion_value
    date_field.innerText = time_value
    condition_field.innerText = condition_value
}



//this is search function when we search any location then this will change target value and and we know target value is default location value 
function search_for_location(e) {
    e.preventDefault()

    target = search.value
    fetch_api(target)
}

fetch_api(target)