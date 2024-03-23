'use server';

export const getYesterdayData = async (iso) => {
    // Get the covid data from yesterday
    const { yestStatus, yestData } = await fetch(
        `https://disease.sh/v3/covid-19/countries/${iso}?yesterday=true&strict=true`,
    ).then((res) => {
        // If the country is not found
        if (res.status === 404) {
            console.log(
                `[404] - Could not get yesterday's data for country ${iso}`,
            );
            return { yestStatus: 404, yestData: 'Could not find country' };
        }
        // If the country is found
        console.log(`[200] - Got yesterday's data for country ${iso}`);
        return { yestStatus: 200, yestData: res.json() };
    });
    // Return the data
    const fetchedYestData = await yestData;
    return { yestStatus, yestData: fetchedYestData };
};
