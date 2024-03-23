export const ResultsData = ({ data, addData, lang }) => {
    // Function to add commas to big numbers
    const addCommas = (num) => {
        return (num + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    };

    return (
        <div className="flex mt-[40px] mb-0">
            {/* Left column */}
            <div className="pr-[15px] text-md lg:text-lg w-1/2 border-r-2 border-r-gray-200">
                <h3>
                    {lang === 'el' ? 'Δεδομένα Covid-19' : 'Covid 19 Stats'}
                </h3>
                {lang === 'el' ? 'Κρούσματα: ' : 'Total cases: '}
                <span className="font-light">{addCommas(data?.cases)}</span>
                <br />
                {lang === 'el' ? 'Σημερινά: ' : 'Cases today: '}
                <span className="font-light">{data?.todayCases}</span> <br />
                {lang === 'el' ? 'Συνολικά Τέστ: ' : 'Total tests: '}
                <span className="font-light">{addCommas(data?.tests)}</span>
                <br />
                {lang === 'el' ? 'Ενεργοί: ' : 'Active: '}
                <span className="font-light">{addCommas(data?.active)} </span>
                <br />
                <span className="text-green-600">
                    {lang === 'el' ? 'Ανάρρωσαν: ' : 'Recovered: '}
                </span>
                <span className="font-light">
                    {addCommas(data?.recovered)}{' '}
                </span>
                <br />
                <span className="text-red-700">
                    {lang === 'el' ? 'Θάνατοι: ' : 'Deaths: '}
                </span>
                <span className="font-light"> {addCommas(data?.deaths)} </span>
            </div>

            {/* Right column */}
            <div className="pl-[15px] text-md lg:text-lg w-1/2 ">
                <h3>{lang === 'el' ? 'Δεδομένα Χώρας' : 'Country Stats'}</h3>
                {lang === 'el' ? 'Πληθυσμός: ' : 'Population: '}
                <span className="font-light">
                    {addCommas(addData.population)}
                </span>
                <br />
                {lang === 'el' ? 'Ήπειρος: ' : 'Region: '}
                <span className="font-light">{addData.region} </span> <br />
                {lang === 'el' ? 'Περιοχή: ' : 'Subregion: '}
                <span className="font-light">{addData.subregion} </span> <br />
                {lang === 'el' ? 'Πρωτεύουσα: ' : 'Capital: '}
                <span className="font-light">{addData.capital} </span> <br />
                {lang === 'el' ? 'Κύριο νόμισμα: ' : 'Main currency: '}
                <span className="font-light">
                    {Object.entries(addData.currencies).map((currency, i) => {
                        // [ 'EUR', { name: 'Euro', symbol: '€' } ]
                        return `${currency[1].name} (${currency[0]})`;
                    })}
                </span>
            </div>
        </div>
    );
};
