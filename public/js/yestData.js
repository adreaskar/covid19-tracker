var https = require('https');

module.exports = async function yesterday(url1) {

    let promise = new Promise((resolve,reject) => {
        var data = {};
        url1 = url1 + "&yesterday=true";
        https.get(url1, function (response) {
            let bod = "";
            
            response.on("data", function (chunk) {
                bod += chunk;
            });
        
            response.on("end", function (){
                const covidData = JSON.parse(bod);
        
                // Covid-19 yesterday's data -------------
                data.totalCases = covidData.cases;
                data.todayCases = covidData.todayCases;
                data.totalRecovered = covidData.recovered; 
                data.totalDeaths = covidData.deaths;
                data.active = covidData.active;
                data.critical = covidData.critical;
                data.tests = covidData.tests;

                resolve(data);
            });
        });

    });

    var result = await promise;
    return result;
}