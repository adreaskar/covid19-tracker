var express = require('express');
var bodyParser = require ('body-parser');
var dotenv = require ('dotenv');
dotenv.config();

var iso2 = require('./public/js/iso2.js');
var iso2GR = require('./public/js/iso2GR.js');

var countries = require('./public/js/countries.js');
var countriesGR = require('./public/js/countriesGR.js');

var api = require('./public/js/callAPI.js');

var yesterday = require('./public/js/yestData.js');
var yesterdayStats = require('./public/js/yestStats.js');

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let error = false;
let error2 = false;

let missingData = false;
let missingDataGR = false;
let missingData2 = false;
let missingData2GR = false;

// Home route ----------------------------------------------------------------------------------
app.route("/")
    .get(function (req,res) {
        res.render("index", {error:error, missingData:missingData, header: "Covid-19 Tracker"});
        error = false;
        missingData = false;
    })
    .post(function (req,res) {
        let country = req.body.countryName;
        country = country.replace(/^\w/, c => c.toUpperCase());
        let suffix = iso2[country];

        const url = process.env.BASEURL + suffix + "?strict=true";
        const countryUrl = process.env.COUNTRYURL + suffix;

        // Data validation -------------------------
        const inArray = countries.includes(country);

        if (inArray) {
            const moreData = true;
            
            api(url,countryUrl,moreData).then(function (result) {

                if(result.totalCases === undefined) {
                    missingData = true;
                    res.redirect("/");
                }

                var yesterdayData = {};
                yesterday(url).then(function (result) {
                    yesterdayData = result;
                })

                
                setTimeout(() => {
                    var yestStats = yesterdayStats(result, yesterdayData);

                    res.render("results", 
                    {   
                        country: getKey(iso2, suffix),
                        flag: result.flag,
                        total: addCommas(result.totalCases),
                        today: addCommas(result.todayCases),
                        recovered: addCommas(result.totalRecovered),
                        deaths: addCommas(result.totalDeaths),
                        population: addCommas(result.population),
                        population2: addCommas(result.countryPopulation),
                        region: result.region,
                        active: addCommas(result.active),
                        tests: addCommas(result.tests),
                        capital: result.capital,
                        currency: result.currency,
                        subregion: result.subRegion,
                        yestPercent: yestStats.percentCases,
                        yestRaise: yestStats.raise,
                        testsToday: addCommas(yestStats.testsToday),
                        positivePercent: yestStats.positivePercent,
                        header: "Covid-19 Tracker | Results"
                    });
                    
                }, 900);

            });
            
        } else {
            error = true;
            res.redirect("/");
        }
    });

// Home route GR --------------------------------------------------------------------------------- 
app.route("/el")
    .get(function (req,res) {
        res.render("indexGR", {error:error, missingData:missingDataGR, header: "Covid-19 Tracker"});
        error = false;
        missingDataGR = false;
    })
    .post(function (req,res) {
        let country = req.body.countryName;
        country = country.replace(/^\w/, c => c.toUpperCase());
        let suffix = iso2GR[country];

        const url = process.env.BASEURL + suffix + "?strict=true";
        const countryUrl = process.env.COUNTRYURL + suffix;

        // Data validation -------------------------
        const inArray = countriesGR.includes(country);

        if (inArray) {
            const moreData = true;
            
            api(url,countryUrl,moreData).then(function (result) {

                if(result.totalCases === undefined) {
                    missingDataGR = true;
                    res.redirect("/el");
                }

                var yesterdayData = {};
                yesterday(url).then(function (result) {
                    yesterdayData = result;
                })

                
                setTimeout(() => {
                    var yestStats = yesterdayStats(result, yesterdayData);

                    res.render("resultsGR", 
                    {   
                        country: getKey(iso2GR, suffix),
                        flag: result.flag,
                        total: addCommas(result.totalCases),
                        today: addCommas(result.todayCases),
                        recovered: addCommas(result.totalRecovered),
                        deaths: addCommas(result.totalDeaths),
                        population: addCommas(result.population),
                        population2: addCommas(result.countryPopulation),
                        region: result.region,
                        active: addCommas(result.active),
                        tests: addCommas(result.tests),
                        capital: result.capital,
                        currency: result.currency,
                        subregion: result.subRegion,
                        yestPercent: yestStats.percentCases,
                        yestRaise: yestStats.raise,
                        testsToday: addCommas(yestStats.testsToday),
                        testsTodayGR: yestStats.testsTodayGR,
                        positivePercent: yestStats.positivePercent,
                        header: "Covid-19 Tracker | Results"
                    });
                    
                }, 900);

            });
            
        } else {
            error = true;
            res.redirect("/el");
        }
    });

// Compare two countries route -------------------------------------------------------------------------------
app.route("/compare")
    .get(function (req,res) {
        res.render("compare", {error:error2, missingData:missingData2, header: "Covid-19 Tracker | Compare"});
        error2 = false;
        missingData2 = false;
    })
    .post(function (req,res) {
        let country1 = req.body.countryName;
        let country2 = req.body.countryName2;

        country1 = country1.replace(/^\w/, c => c.toUpperCase());
        country2 = country2.replace(/^\w/, c => c.toUpperCase());

        let suffix1 = iso2[country1];
        let suffix2 = iso2[country2];

        const url1 = process.env.BASEURL + suffix1 + "?strict=true";
        const url2 = process.env.BASEURL + suffix2 + "?strict=true";
        const countryUrl1 = process.env.COUNTRYURL + suffix1;
        const countryUrl2 = process.env.COUNTRYURL + suffix2;

        // Data validation ---------------------------
        const inArray1 = countries.includes(country1);
        const inArray2 = countries.includes(country2);

        if (inArray1 && inArray2) {
            const moreData = false;

            var data1 = {};
            var data2 = {};

            api(url1,countryUrl1,moreData).then(function (result1) {
                data1 = result1;
            });

            api(url2,countryUrl2).then(function (result2) {
                data2 = result2;
            });

            setTimeout(() => {
                let larger = "";
                let smaller = "";
                let percentLarger = 0;
                let deadlier = "";
                let percentDeadlier = 0;
                let timesBigger = 0;
                let timesDeadlier = 0;

                if (data1.totalCases === undefined || data2.totalCases === undefined) {
                    missingData2 = true;
                    res.redirect("/compare");
                }

                // Εxtensive statistical data calculation ---------------------------------------------------------
                if ((data1.population > data2.population) || (data1.countryPopulation > data2.countryPopulation)) {

                    larger = getKey(iso2, suffix1);
                    smaller = getKey(iso2, suffix2);
                    let diff = (data1.population - data2.population); 
                    percentLarger = ((diff / data2.population) * 100).toFixed(1);

                    timesBigger = (data1.population / data2.population).toFixed(1);

                    let relationalDeaths = Math.floor((data2.population * data1.totalDeaths) / data1.population);
                    
                    if (relationalDeaths > data2.totalDeaths) {
                        deadlier = getKey(iso2, suffix1);
                        let diff2 = relationalDeaths - data2.totalDeaths ;
                        percentDeadlier = ((diff2 / data2.totalDeaths) * 100).toFixed(1);
                        timesDeadlier = (relationalDeaths / data2.totalDeaths).toFixed(1);
                    } else {
                        deadlier = getKey(iso2, suffix2);
                        let diff2 =  data1.totalDeaths - relationalDeaths;
                        percentDeadlier = ((diff2 / relationalDeaths) * 100).toFixed(1);

                        timesDeadlier = (data1.totalDeaths / relationalDeaths).toFixed(1);
                    }
                } else {
                    larger = getKey(iso2, suffix2);
                    smaller = getKey(iso2, suffix1);
                    let diff = (data2.population - data1.population); 
                    percentLarger = ((diff / data1.population) * 100).toFixed(1);

                    timesBigger = (data2.population / data1.population).toFixed(1);

                    let relationalDeaths = Math.floor((data1.population * data2.totalDeaths) / data2.population);
                    
                    if (relationalDeaths > data1.totalDeaths) {
                        deadlier = getKey(iso2, suffix2);
                        let diff2 = relationalDeaths - data1.totalDeaths ;
                        percentDeadlier = ((diff2 / data1.totalDeaths) * 100).toFixed(1);

                        timesDeadlier = (relationalDeaths / data1.totalDeaths).toFixed(1);
                    } else {
                        deadlier = getKey(iso2, suffix1);
                        let diff2 =  data2.totalDeaths - relationalDeaths;
                        percentDeadlier = ((diff2 / relationalDeaths) * 100).toFixed(1);

                        timesDeadlier = (data2.totalDeaths / relationalDeaths).toFixed(1);
                    }
                }

                res.render("compareResults", 
                {   
                    country1: getKey(iso2, suffix1),
                    country2: getKey(iso2, suffix2),
                    flag1: data1.flag,
                    flag2: data2.flag,
                    population1: addCommas(data1.population),
                    population2: addCommas(data2.population),
                    population1b: addCommas(data1.countryPopulation),
                    population2b: addCommas(data2.countryPopulation),
                    total1: addCommas(data1.totalCases),
                    total2: addCommas(data2.totalCases),
                    today1: addCommas(data1.todayCases),
                    today2: addCommas(data2.todayCases),
                    recovered1: addCommas(data1.totalRecovered),
                    recovered2: addCommas(data2.totalRecovered),
                    deaths1: addCommas(data1.totalDeaths),
                    deaths2: addCommas(data2.totalDeaths),
                    active1: addCommas(data1.active),
                    active2: addCommas(data2.active),
                    tests1: addCommas(data1.tests),
                    tests2: addCommas(data2.tests),
                    larger:larger,
                    smaller:smaller,
                    percentLarger:percentLarger,
                    timesBigger:timesBigger,
                    percentDeadlier:percentDeadlier,
                    deadlier:deadlier,
                    timesDeadlier:timesDeadlier,
                    header: "Covid-19 Tracker | Results"
                });
            }, 1500);
            
        } else {
            error2 = true;
            res.redirect("/compare");
        }
    });

// Compare two countries route GR -------------------------------------------------------------------------------
app.route("/compare/el")
    .get(function (req,res) {
        res.render("compareGR", {error:error2, missingData:missingData2GR, header: "Covid-19 Tracker | Σύγκριση"});
        error2 = false;
        missingData2GR = false;
    })
    .post(function (req,res) {
        let country1 = req.body.countryName;
        let country2 = req.body.countryName2;

        country1 = country1.replace(/^\w/, c => c.toUpperCase());
        country2 = country2.replace(/^\w/, c => c.toUpperCase());

        let suffix1 = iso2GR[country1];
        let suffix2 = iso2GR[country2];

        const url1 = process.env.BASEURL + suffix1 + "?strict=true";
        const url2 = process.env.BASEURL + suffix2 + "?strict=true";
        const countryUrl1 = process.env.COUNTRYURL + suffix1;
        const countryUrl2 = process.env.COUNTRYURL + suffix2;

        // Data validation ---------------------------
        const inArray1 = countriesGR.includes(country1);
        const inArray2 = countriesGR.includes(country2);

        if (inArray1 && inArray2) {
            const moreData = false;

            var data1 = {};
            var data2 = {};

            api(url1,countryUrl1,moreData).then(function (result1) {
                data1 = result1;
            });

            api(url2,countryUrl2).then(function (result2) {
                data2 = result2;
            });

            setTimeout(() => {
                let larger = "";
                let smaller = "";
                let percentLarger = 0;
                let deadlier = "";
                let percentDeadlier = 0;
                let timesBigger = 0;
                let timesDeadlier = 0;

                if (data1.totalCases === undefined || data2.totalCases === undefined) {
                    missingData2GR = true;
                    res.redirect("/compare/el");
                }

                // Εxtensive statistical data calculation ---------------------------------------------------------
                if ((data1.population > data2.population) || (data1.countryPopulation > data2.countryPopulation)) {
                    larger = getKey(iso2GR, suffix1);
                    smaller = getKey(iso2GR, suffix2);
                    let diff = (data1.population - data2.population); 
                    percentLarger = ((diff / data2.population) * 100).toFixed(1);

                    timesBigger = (data1.population / data2.population).toFixed(1);

                    let relationalDeaths = Math.floor((data2.population * data1.totalDeaths) / data1.population);
                    
                    if (relationalDeaths > data2.totalDeaths) {
                        deadlier = getKey(iso2GR, suffix1);
                        let diff2 = relationalDeaths - data2.totalDeaths ;
                        percentDeadlier = ((diff2 / data2.totalDeaths) * 100).toFixed(1);
                        timesDeadlier = (relationalDeaths / data2.totalDeaths).toFixed(1);
                    } else {
                        deadlier = getKey(iso2GR, suffix2);
                        let diff2 =  data1.totalDeaths - relationalDeaths;
                        percentDeadlier = ((diff2 / relationalDeaths) * 100).toFixed(1);

                        timesDeadlier = (data1.totalDeaths / relationalDeaths).toFixed(1);
                    }
                } else {
                    larger = getKey(iso2GR, suffix2);
                    smaller = getKey(iso2GR, suffix1);
                    let diff = (data2.population - data1.population); 
                    percentLarger = ((diff / data1.population) * 100).toFixed(1);

                    timesBigger = (data2.population / data1.population).toFixed(1);

                    let relationalDeaths = Math.floor((data1.population * data2.totalDeaths) / data2.population);
                    
                    if (relationalDeaths > data1.totalDeaths) {
                        deadlier = getKey(iso2GR, suffix2);
                        let diff2 = relationalDeaths - data1.totalDeaths ;
                        percentDeadlier = ((diff2 / data1.totalDeaths) * 100).toFixed(1);

                        timesDeadlier = (relationalDeaths / data1.totalDeaths).toFixed(1);
                    } else {
                        deadlier = getKey(iso2GR, suffix1);
                        let diff2 =  data2.totalDeaths - relationalDeaths;
                        percentDeadlier = ((diff2 / relationalDeaths) * 100).toFixed(1);

                        timesDeadlier = (data2.totalDeaths / relationalDeaths).toFixed(1);
                    }
                }

                res.render("compareResultsGR", 
                {   
                    country1: getKey(iso2GR, suffix1),
                    country2: getKey(iso2GR, suffix2),
                    flag1: data1.flag,
                    flag2: data2.flag,
                    population1: addCommas(data1.population),
                    population2: addCommas(data2.population),
                    population1b: addCommas(data1.countryPopulation),
                    population2b: addCommas(data2.countryPopulation),
                    total1: addCommas(data1.totalCases),
                    total2: addCommas(data2.totalCases),
                    today1: addCommas(data1.todayCases),
                    today2: addCommas(data2.todayCases),
                    recovered1: addCommas(data1.totalRecovered),
                    recovered2: addCommas(data2.totalRecovered),
                    deaths1: addCommas(data1.totalDeaths),
                    deaths2: addCommas(data2.totalDeaths),
                    active1: addCommas(data1.active),
                    active2: addCommas(data2.active),
                    tests1: addCommas(data1.tests),
                    tests2: addCommas(data2.tests),
                    larger:larger,
                    smaller:smaller,
                    percentLarger:percentLarger,
                    timesBigger:timesBigger,
                    percentDeadlier:percentDeadlier,
                    deadlier:deadlier,
                    timesDeadlier:timesDeadlier,
                    header: "Covid-19 Tracker | Αποτελέσματα"
                });
            }, 1500);
            
        } else {
            error2 = true;
            res.redirect("/compare/el");
        }
    });

function addCommas(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function getKey(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

// Server hosting ----------------------------
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});