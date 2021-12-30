import { MY_API_KEY } from './config.js';


(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getEquipmentExcercise()
})();

function setButtonFunctions()
{
    document.getElementById('button-equipment-Excercise').onclick = getEquipmentExcercise;

}

async function getEquipmentExcercise()
{
    document.getElementById('excercise-result').innerHTML = "";
    document.getElementById('number-of-excercises').innerHTML = "";
    const equipment = document.getElementById('equipment').value;

fetch("https://exercisedb.p.rapidapi.com/exercises/equipment/" + equipment, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "exercisedb.p.rapidapi.com",
		"x-rapidapi-key": MY_API_KEY
	}
})
.then(response => response.json())
.then(response => {
    console.log("Given Excercises (from specific Equipment):");
	console.log(response);
    console.log("\n");

   for (let i = 0; i < response.length; i++) {
    const tableData = 
            `<h1>${i + 1}) ${response[i]["name"]}</h1>
            <img src="${response[i]["gifUrl"]}">
            <h4>Equipment Needed: ${response[i]["equipment"]} </h4>
            <h4>Targeted Muscle Group: ${response[i]["target"]} </h4>
            <a href="https://www.google.com/search?q=${response[i]["name"]}">Learn more about the movement here!</a> `;
    document.getElementById('excercise-result').innerHTML += tableData;
    document.getElementById('number-of-excercises').innerHTML = response.length + " given excercises!";
      }
})
.catch(err => {
	console.error(err);
});
}


//Button stuff:
//Get the button:
const mybutton = document.getElementById("myBtn");
document.getElementById('myBtn').onclick = topFunction;

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}