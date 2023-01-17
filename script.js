//pls note that if api not working that means its expires because its from the free account you can create account on https://api.weatherapi.com and use your own key.
// console.log('hello world')

let showResult = document.querySelector("#showResult");
let getLocationBtn = document.querySelector("#getLocationBtn");

async function getApiData(latitude, longitude) { 
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=9f0625e04d9241c599a43408231701&q=${latitude}, ${longitude}&aqi=yes`);
    return await promise.json();

}
async function gotLocation(position){
    // window.location.reload();
    // console.log(position);
    const finalResult = await getApiData(
        position.coords.latitude,
        position.coords.longitude
    );
    // console.log(finalResult);
    showResult.innerHTML = `<h2 class="locationData">You current wheather of ${finalResult.location.name}, ${finalResult.location.region}-${finalResult.location.country} is </h2> <br> <h1 class="tempData">${finalResult.current.temp_c}&#xb0; Celsius and ${finalResult.current.temp_f}&#xb0; Fahrenheit </h1>`
    
}
function failToGetLocation(){
    showResult.innerHTML = `<h4 class="errorData">There was an error pls allow us permission if you're not.</h4>`;
}

getLocationBtn.addEventListener('click', async () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failToGetLocation); //getCurrentPosition get two callback function as an argument first for success and second for errors
    showResult.innerHTML = `<h2 class="loadingData">Loading...</h4>`;

})