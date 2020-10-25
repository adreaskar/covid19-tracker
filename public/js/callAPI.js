import https from "https"

export async function api(url1,url2,flag) {

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
                        if (flag) {
                            data.capital = countryData.capital;
                            if (countryData.currencies[0].symbol != null) {
                                data.currency = countryData.currencies[0].code + " " + countryData.currencies[0].symbol;
                            } else {
                                currency = countryData.currencies[0].code;
                            }
                            data.region = countryData.region;
                        }
                        data.subRegion = countryData.subregion;
                        data.flag = countryData.flag;
                        data.name = countryData.name;
                        data.countryPopulation = addCommas(countryData.population);

                        resolve(data);
                    }); 
                });
            });
        });

    });

    var result = await promise;
    return result;
}

function addCommas(intNum) {
    return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}