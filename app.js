//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { error } = require("console");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Home route --------------------------------------------------
app.get("/", function (req,res) {
    res.render("index");
});

app.post("/", function (req,res) {
    const country = req.body.countryName;
    const baseUrl = "https://disease.sh/v3/covid-19/countries/";
    const url = baseUrl + country + "?strict=true";
    const countryUrl = "https://restcountries.eu/rest/v2/alpha/" + country ;

    https.get(url, function (response) {
        let bod = "";

        response.on("data", function (chunk) {
            bod += chunk;
        });

        response.on("end", function (){
            const covidData = JSON.parse(bod);

            // Covid-19 API data --------------------------------
            const totalCases = addCommas(covidData.cases);
            const todayCases = addCommas(covidData.todayCases);
            const totalRecovered = addCommas(covidData.recovered); 
            const totalDeaths = addCommas(covidData.deaths);
            const population = addCommas(covidData.population);
            const active = addCommas(covidData.active);
            const critical = covidData.critical;

            // Country API data
            let name = "";
            let region = "";
            let capital = "";
            let currency = "";
            let flag = "";
            let subRegion = "";
            let countryPopulation = "";

            // API call to additional coutnry data -----
            https.get(countryUrl, function (response2) {
                let bod2 = "";

                response2.on("data", function (chunk2) {
                    bod2 += chunk2;
                });

                response2.on("end", function (){
                    const countryData = JSON.parse(bod2);

                    capital = countryData.capital;
                    if (countryData.currencies[0].symbol != null) {
                        currency = countryData.currencies[0].code + " " + countryData.currencies[0].symbol;
                    } else {
                        currency = countryData.currencies[0].code;
                    }
                    flag = countryData.flag;
                    subRegion = countryData.subregion;
                    region = countryData.region;
                    name = countryData.name;
                    countryPopulation = countryData.population;
                }); 
            });

            // Delay to process second http request
            setTimeout(()=>{
                res.render("results", 
                {   country:name,
                    flag:flag,
                    total:totalCases,
                    today:todayCases,
                    recovered: totalRecovered,
                    deaths: totalDeaths,
                    population: population,
                    population2:countryPopulation,
                    region:region,
                    active: active,
                    critical:critical,
                    capital:capital,
                    currency:currency,
                    subregion:subRegion
                });
            }, 1000);

        });

    });
});

// Add commas to seperate thousands -------------------------
function addCommas(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

// Server hosting ----------------------------
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});

// covid19-world-api 