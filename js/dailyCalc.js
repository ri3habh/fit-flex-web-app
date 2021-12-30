import { MY_API_KEY } from './config.js';

(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getDailyCalorie();
})();

function setButtonFunctions()
{
    document.getElementById('button-daily-calc').onclick = getDailyCalorie;
}

// Daily Calorie calculator
async function getDailyCalorie()
{
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const age = document.getElementById('age').value;
    const activityLevel = document.getElementById('activity-level').value;
    
    await fetch("https://fitness-calculator.p.rapidapi.com/dailycalorie?age="+ age + "&gender=" + gender + "&height=" + height + "&weight=" + weight + "&activitylevel=" + activityLevel, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
		"x-rapidapi-key": MY_API_KEY
	}
})
.then(response => response.json())
.then(response => {
    console.log("Require Daily Calorie Calculator:");
    console.log(response);
    console.log("\n");

    // display data
    document.getElementById('bmrResults').innerHTML = "BMR (Basal metabolic rate): " +  response["data"]["BMR"].toFixed(1);
    document.getElementById('maintainResults').innerHTML = "Calories to reach goal: " +  response["data"]["goals"]["maintain weight"].toFixed(1);
    document.getElementById('mild-weight-loss-calorie').innerHTML = "Calories to reach goal: " +  response["data"]["goals"]["Mild weight loss"]["calory"].toFixed(1);
    document.getElementById('weight-loss-calorie').innerHTML = "Calories to reach goal: " +  response["data"]["goals"]["Weight loss"]["calory"].toFixed(1);
    document.getElementById('xtreme-weight-loss-calorie').innerHTML = "Calories to reach goal: " +  response["data"]["goals"]["Extreme weight loss"]["calory"].toFixed(1);
    document.getElementById('mild-weight-gain-calorie').innerHTML = "Calories to reach goal: " +  response["data"]["goals"]["Mild weight gain"]["calory"].toFixed(1);
    document.getElementById('weight-gain-calorie').innerHTML = "Calories to reach goal: " +  response["data"]["goals"]["Weight gain"]["calory"].toFixed(1);
    document.getElementById('xtreme-weight-gain-calorie').innerHTML = "Calories to reach goal: " +  response["data"]["goals"]["Extreme weight gain"]["calory"].toFixed(1);
    })
.catch(err => {
    console.log(err);
});
}
