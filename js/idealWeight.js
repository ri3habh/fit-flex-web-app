import { MY_API_KEY } from './config.js';

(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getIdealWeight();
})();

function setButtonFunctions()
{
    document.getElementById('button-ideal-weight').onclick = getIdealWeight;
}

// Body Fat % calculator
async function getIdealWeight()
{
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const pounds = document.getElementById('pounds').checked;
    
    await fetch("https://fitness-calculator.p.rapidapi.com/idealweight?gender=" + gender + "&height=" + height, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
		"x-rapidapi-key": MY_API_KEY
	}
})
.then(response => response.json())
.then(response => {
    console.log("Ideal Weight Calculator:");
    console.log(response);
    console.log("\n");

    // display data
    if (pounds == false){
    document.getElementById('hamwiResult').innerHTML = "Hamwi Method: " + response["data"]["Hamwi"];
    document.getElementById('devineResult').innerHTML = "Devine Method: " + response["data"]["Devine"];
    document.getElementById('millerResult').innerHTML = "Miller Method: " + response["data"]["Miller"];
    document.getElementById('robinsonResult').innerHTML = "Robinson Method: " + response["data"]["Robinson"];
    } else {
    document.getElementById('hamwiResult').innerHTML = "Hamwi Method: " + (response["data"]["Hamwi"] * 2.205).toFixed(2);
    document.getElementById('devineResult').innerHTML = "Devine Method: " + (response["data"]["Devine"] * 2.205).toFixed(2);
    document.getElementById('millerResult').innerHTML = "Miller Method: " + (response["data"]["Miller"] * 2.205).toFixed(2);
    document.getElementById('robinsonResult').innerHTML = "Robinson Method: " + (response["data"]["Robinson"] * 2.205).toFixed(2);
    }
    })
.catch(err => {
    console.log(err);
});
}
