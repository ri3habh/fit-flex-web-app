import { MY_API_KEY } from './config.js';


(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getArticles();
})();

function setButtonFunctions()
{
    document.getElementById('button-Articles').onclick = getArticles;

}

// Body Fat % calculator
async function getArticles()
{
    document.getElementById('article-result').innerHTML = "";
    document.getElementById('number-of-articles').innerHTML = "";
    const articles = document.querySelector('input[name="articles"]:checked').value;
    
    console.log(articles)

    if(articles === "all"){
        fetch("https://live-fitness-and-health-news.p.rapidapi.com/news", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "live-fitness-and-health-news.p.rapidapi.com",
		"x-rapidapi-key": "d5e395f2b7mshe8de633445768a0p1ee813jsn2490c9833eb0"
	}
})
.then(response => response.json())
.then(response => {
    console.log("Given Articles:");
	console.log(response);
    console.log("\n");

   for (let i = 0; i < response.length; i++) {
    const tableData = 
    `
    <div style="outline: 5px ridge grey; margin-top:35px; margin-bottom: 10px;  margin-left:30px; margin-right:50px;">
    <h3 style="padding-top:10px; padding-left:10px;">${i+1}</h3>
    <a style="padding: 30px; text-decoration:none;" href="${response[i]["url"]}">
    <h1 style="text-align: center;"> ${response[i]["title"]}</h1> 
    </a>
    <h4 style="padding-bottom:10px; text-align: center;">${response[i]["source"]}</h4>
    </div>
    `;
    document.getElementById('article-result').innerHTML += tableData;
    document.getElementById('number-of-articles').innerHTML = response.length + " given articles!";
      }
})
.catch(err => {
	console.error(err);
});
    }else{
        fetch("https://live-fitness-and-health-news.p.rapidapi.com/news/" + articles, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "live-fitness-and-health-news.p.rapidapi.com",
                "x-rapidapi-key": MY_API_KEY
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log("Given Articles:");
            console.log(response);
            console.log("\n");
        
           for (let i = 0; i < response.length; i++) {
            const tableData = 
            `
            <div style="outline: 5px ridge grey; margin-top:35px; margin-bottom: 10px;  margin-left:30px; margin-right:50px;">
            <h3 style="padding-top:10px; padding-left:10px;">${i+1}</h3>
            <a style="padding: 30px; text-decoration:none;" href="${response[i]["url"]}">
            <h1 style="text-align: center;"> ${response[i]["title"]}</h1> 
            </a>
            <h4 style="padding-bottom:10px; text-align: center;">${response[i]["source"]}</h4>
            </div>
            `;
            document.getElementById('article-result').innerHTML += tableData;
            document.getElementById('number-of-articles').innerHTML = response.length + " given articles!";
              }
        })
        .catch(err => {
            console.error(err);
        });
        }
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