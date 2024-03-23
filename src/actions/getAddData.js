'use server';

export const getAddData = async (iso) => {
    // Get the covid data
    const { addStatus, addData } = await fetch(
        `https://restcountries.com/v3.1/alpha/${iso}`,
    ).then((res) => {
        // If the country is not found
        if (!res.ok) {
            console.log(
                `[404] - Could not find additional data for country ${iso}`,
            );
            return { addStatus: 404, addData: ['Could not find country'] };
        }
        // If the country is found
        console.log(`[200] - Additional data was found for country ${iso}`);
        return { addStatus: 200, addData: res.json() };
    });
    // Return the data
    const fetchedData = await addData;
    return { addStatus, addData: fetchedData[0] };
};
