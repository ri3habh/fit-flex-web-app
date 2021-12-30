import { MY_API_KEY } from './config.js';

(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getBodyFatPercentage();
})();

function setButtonFunctions()
{
    document.getElementById('button-body-fat').onclick = getBodyFatPercentage;
}

// Body Fat % calculator
async function getBodyFatPercentage()
{
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const neck = document.getElementById('neck').value;
    const waist = document.getElementById('waist').value;
    const hip = document.getElementById('hip').value;
    
    await fetch("https://fitness-calculator.p.rapidapi.com/bodyfat?age=" + age + "&gender=" + gender + "&weight=" + weight + "&height=" + height + "&neck=" + neck + "&waist=" + waist + "&hip=" + hip, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Body Fat Percentage Calculator:");
        console.log(response);
        console.log("\n");


        // display data
        document.getElementById('bodyFatResult').innerHTML = "Body Fat % (BMI Method): " + response.data["Body Fat (BMI method)"];
        document.getElementById('marineBodyFatResult').innerHTML = "Body Fat % (U.S Navy Method): " + response.data["Body Fat (U.S. Navy Method)"];
        document.getElementById('bodyFatMass').innerHTML = "Body Fat Mass: " + response.data["Body Fat Mass"];
        document.getElementById('leanBodyMass').innerHTML = "Lean Body Mass: " + response.data["Lean Body Mass"];
    })
    .catch(err => {
        console.log(err);
    });
}
