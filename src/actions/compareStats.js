export const calcStats = (
    country1,
    country2,
    addCountry1,
    addCountry2,
    countryLabel1,
    countryLabel2,
) => {
    let stats = {};

    if (addCountry1.addData.population > addCountry2.addData.population) {
        stats.larger = countryLabel1;
        stats.smaller = countryLabel2;
        stats.timesBigger = (
            addCountry1.addData.population / addCountry2.addData.population
        ).toFixed(1);

        let relationalDeaths = Math.floor(
            (addCountry2.addData.population * country1.data.deaths) /
                addCountry1.addData.population,
        );

        if (relationalDeaths > country2.data.deaths) {
            stats.deadlier = countryLabel1;

            let diff2 = relationalDeaths - country2.data.deaths;
            stats.percentDeadlier = (
                (diff2 / country2.data.deaths) *
                100
            ).toFixed(1);

            stats.timesDeadlier = (
                relationalDeaths / country2.data.deaths
            ).toFixed(1);
        } else {
            stats.deadlier = countryLabel2;

            let diff2 = country1.data.deaths - relationalDeaths;

            stats.percentDeadlier = ((diff2 / relationalDeaths) * 100).toFixed(
                1,
            );

            stats.timesDeadlier = (
                country1.data.deaths / relationalDeaths
            ).toFixed(1);
        }
    } else {
        stats.larger = countryLabel2;
        stats.smaller = countryLabel1;
        stats.timesBigger = (
            addCountry2.addData.population / addCountry1.addData.population
        ).toFixed(1);

        let relationalDeaths = Math.floor(
            (addCountry1.addData.population * country2.data.deaths) /
                addCountry2.addData.population,
        );

        if (relationalDeaths > country1.data.deaths) {
            stats.deadlier = countryLabel2;

            let diff2 = relationalDeaths - country1.data.deaths;
            stats.percentDeadlier = (
                (diff2 / country1.data.deaths) *
                100
            ).toFixed(1);

            stats.timesDeadlier = (
                relationalDeaths / country1.data.deaths
            ).toFixed(1);
        } else {
            stats.deadlier = countryLabel1;

            let diff2 = country2.data.deaths - relationalDeaths;
            stats.percentDeadlier = ((diff2 / relationalDeaths) * 100).toFixed(
                1,
            );

            stats.timesDeadlier = (
                country2.data.deaths / relationalDeaths
            ).toFixed(1);
        }
    }

    return stats;
};
