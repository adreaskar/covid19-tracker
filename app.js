
import { iso2 } from './public/js/iso2.js'
import { countries } from './public/js/countries.js'
import { api } from './public/js/callAPI.js'
import express from 'express'
import bodyParser from "body-parser"

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let error = false;
let error2 = false;

// Home route
app.route("/")
    .get(function (req,res) {
        res.render("index", {error:error, header: "Covid-19 Tracker"});
        error = false;
    })
    .post(function (req,res) {
        let country = req.body.countryName;
        country = country.replace(/^\w/, c => c.toUpperCase());
        let suffix = iso2[country];

        const baseUrl = "https://disease.sh/v3/covid-19/countries/";
        const url = baseUrl + suffix + "?strict=true";
        const countryUrl = "https://restcountries.eu/rest/v2/alpha/" + suffix;

        // Data validation -------------------------
        const inArray = countries.includes(country);

        if (inArray) {
            const moreData = true;
            
            api(url,countryUrl,moreData).then(function (result) {
                res.render("results", 
                {   
                    country: result.name,
                    flag: result.flag,
                    total: result.totalCases,
                    today: result.todayCases,
                    recovered: result.totalRecovered,
                    deaths: result.totalDeaths,
                    population: result.population,
                    population2: result.countryPopulation,
                    region: result.region,
                    active: result.active,
                    critical: result.critical,
                    capital: result.capital,
                    currency: result.currency,
                    subregion: result.subRegion,
                    header: "Covid-19 Tracker | Results"
                });
            });
            
        } else {
            error = true;
            res.redirect("/");
        }
    });

// Compare two countries route -----------------------------------------------------
app.route("/compare")
    .get(function (req,res) {
        res.render("compare", {error:error2, header: "Covid-19 Tracker | Compare"});
    })
    .post(function (req,res) {
        let country1 = req.body.countryName;
        let country2 = req.body.countryName2;

        country1 = country1.replace(/^\w/, c => c.toUpperCase());
        country2 = country2.replace(/^\w/, c => c.toUpperCase());

        let suffix1 = iso2[country1];
        let suffix2 = iso2[country2];

        const baseUrl = "https://disease.sh/v3/covid-19/countries/";
        const url1 = baseUrl + suffix1 + "?strict=true";
        const url2 = baseUrl + suffix2 + "?strict=true";
        const countryUrl1 = "https://restcountries.eu/rest/v2/alpha/" + suffix1;
        const countryUrl2 = "https://restcountries.eu/rest/v2/alpha/" + suffix2;

        // Data validation ---------------------------
        const inArray1 = countries.includes(country1);
        const inArray2 = countries.includes(country2);

        if (inArray1 && inArray2) {
            const moreData = false;
            var data1 = {};
            var data2 = {};

            api(url1,countryUrl1,moreData).then(function (result1) {
                data1 = result1;
                if (result1.name === "United Kingdom of Great Britain and Northern Ireland") {
                    data1.name = "United Kingdom";
                }
            });

            api(url2,countryUrl2).then(function (result2) {
                data2 = result2;
                if (result2.name === "United Kingdom of Great Britain and Northern Ireland") {
                    data2.name = "United Kingdom";
                }
            });

            setTimeout(() => {
                res.render("compareResults", 
                {   
                    country1: data1.name,
                    country2: data2.name,
                    flag1: data1.flag,
                    flag2: data2.flag,
                    population1: data1.population,
                    population2: data2.population,
                    population1b: data1.countryPopulation,
                    population2b: data2.countryPopulation,
                    total1: data1.totalCases,
                    total2: data2.totalCases,
                    today1: data1.todayCases,
                    today2: data2.todayCases,
                    recovered1: data1.totalRecovered,
                    recovered2: data2.totalRecovered,
                    deaths1: data1.totalDeaths,
                    deaths2: data2.totalDeaths,
                    active1: data1.active,
                    active2: data2.active,
                    critical1: data1.critical,
                    critical2: data2.critical,
                    header: "Covid-19 Tracker | Results"
                });
            }, 1000);
            
        }
    });

// Server hosting ----------------------------
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});