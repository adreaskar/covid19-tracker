import https from "https"

export async function api(url1,url2) {

    let promise = new Promise((resolve,reject) => {
        var data = {};
        https.get(url1, function (response) {
            let bod = "";
            
            response.on("data", function (chunk) {
                bod += chunk;
            });
        
            response.on("end", function (){
                const covidData = JSON.parse(bod);
        
                // Covid-19 API data --------------------------------
                data.totalCases = addCommas(covidData.cases);
                data.todayCases = addCommas(covidData.todayCases);
                data.totalRecovered = addCommas(covidData.recovered); 
                data.totalDeaths = addCommas(covidData.deaths);
                data.population = addCommas(covidData.population);
                data.active = addCommas(covidData.active);
                data.critical = covidData.critical;
        
                // API call to additional coutnry data -----
                https.get(url2, function (response2) {
                    let bod2 = "";
        
                    response2.on("data", function (chunk2) {
                        bod2 += chunk2;
                    });
        
                    response2.on("end", function (){
                        const countryData = JSON.parse(bod2);
        
                        // Filling country API data -------------------
                        data.capital = countryData.capital;
                        if (countryData.currencies[0].symbol != null) {
                            data.currency = countryData.currencies[0].code + " " + countryData.currencies[0].symbol;
                        } else {
                            currency = countryData.currencies[0].code;
                        }
                        data.flag = countryData.flag;
                        data.subRegion = countryData.subregion;
                        data.region = countryData.region;
                        data.name = countryData.name;
                        data.countryPopulation = addCommas(countryData.population);

                        resolve(data);
                    }); 
                });
            });
        });

    });

    let result = await promise;
    console.log(result);
}

function addCommas(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

api("https://disease.sh/v3/covid-19/countries/GR", "https://restcountries.eu/rest/v2/alpha/GR");