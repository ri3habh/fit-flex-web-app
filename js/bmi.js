import { MY_API_KEY } from './config.js';

(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getBMI();
})();

function setButtonFunctions()
{
    document.getElementById('button-body-mass-index').onclick = getBMI;
}

// BMI calculator
async function getBMI()
{
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const age = document.getElementById('age').value;
    
    await fetch("https://fitness-calculator.p.rapidapi.com/bmi?age=" + age + "&weight=" + weight + "&height=" + height, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
		"x-rapidapi-key": MY_API_KEY
	}
})
.then(response => response.json())
.then(response => {
    console.log("BMI Calculator:");
    console.log(response);
    console.log("\n");

    // display data
    document.getElementById('bmiResult').innerHTML = "BMI: " +  response["data"]["bmi"];
    document.getElementById('healthResult').innerHTML = "Health Level: " +  response["data"]["health"];
    document.getElementById('healthyBMIResult').innerHTML = "Healthy BMI Level: " +  response["data"]["healthy_bmi_range"];
    })
.catch(err => {
    console.log(err);
});
}