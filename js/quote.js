import { MY_API_KEY } from './config.js';

(function onLoad()
{
    // fetch from each API when the page loads
    getQuote();
})();

// Body Fat % calculator
async function getQuote()
{
    document.getElementById('quote').innerHTML = "";
    
    fetch("https://bodybuilding-quotes1.p.rapidapi.com/random-quote", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "bodybuilding-quotes1.p.rapidapi.com",
		"x-rapidapi-key": MY_API_KEY
	}
})
.then(response => response.json())
.then(response => {
    console.log("Given Quote of the Day:");
	console.log(response);
    console.log("\n");

    document.getElementById('quote').innerHTML = response["quote"];
    document.getElementById('author').innerHTML = "- " + response["author"];
})
.catch(err => {
	console.error(err);
});
}