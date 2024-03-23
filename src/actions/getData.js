'use server';

export const getData = async (iso) => {
    // Get the covid data
    const { dataStatus, data } = await fetch(
        `https://disease.sh/v3/covid-19/countries/${iso}?strict=true`,
    ).then((res) => {
        // If the country is not found
        if (res.status === 404) {
            console.log(`[404] - Could not find data for country ${iso}`);
            return {
                dataStatus: 404,
                data: 'Country could not be found, or there are no data available.',
            };
        }
        // If the country is found
        console.log(`[200] - Data was found for country ${iso}`);
        return { dataStatus: 200, data: res.json() };
    });
    // Return the data
    const fetchedData = await data;
    return { dataStatus, data: fetchedData };
};
