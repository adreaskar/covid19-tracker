import Image from 'next/image';

export const CompareResultsData = ({
    countryLabel1,
    countryLabel2,
    countryIso1,
    countryIso2,
    data1,
    addData1,
    data2,
    addData2,
    lang,
}) => {
    const countryFlag1 = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryIso1}.svg`;
    const countryFlag2 = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryIso2}.svg`;

    // Function to add commas to big numbers
    const addCommas = (num) => {
        return (num + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    };

    return (
        <div className="flex mt-[40px] mb-0">
            {/* Left column */}
            <div className="pr-[15px] text-md lg:text-lg w-1/2 border-r-2 border-r-gray-200">
                <h3 className="flex gap-4">
                    {countryLabel1}
                    <Image
                        src={countryFlag1}
                        width={30}
                        height={70}
                        alt="Country1 Flag"
                        priority
                    />
                </h3>
                {lang === 'el' ? 'Πληθυσμός: ' : 'Population: '}
                <span className="font-light">
                    {addCommas(addData1.population)}
                </span>
                <br />
                {lang === 'el' ? 'Κρούσματα: ' : 'Total cases: '}
                <span className="font-light">{addCommas(data1?.cases)}</span>
                <br />
                {lang === 'el' ? 'Σημερινά: ' : 'Cases today: '}
                <span className="font-light">{data1?.todayCases}</span> <br />
                {lang === 'el' ? 'Συνολικά Τέστ: ' : 'Total tests: '}
                <span className="font-light">{addCommas(data1?.tests)}</span>
                <br />
                {lang === 'el' ? 'Ενεργοί: ' : 'Active: '}
                <span className="font-light">{addCommas(data1?.active)} </span>
                <br />
                <span className="text-green-600">
                    {lang === 'el' ? 'Ανάρρωσαν: ' : 'Recovered: '}
                </span>
                <span className="font-light">
                    {addCommas(data1?.recovered)}{' '}
                </span>
                <br />
                <span className="text-red-700">
                    {lang === 'el' ? 'Θάνατοι: ' : 'Deaths: '}
                </span>
                <span className="font-light"> {addCommas(data1?.deaths)} </span>
            </div>

            {/* Right column */}
            <div className="pl-[15px] text-md lg:text-lg w-1/2 ">
                <h3 className="flex gap-4 ">
                    {countryLabel2}
                    <Image
                        src={countryFlag2}
                        width={30}
                        height={70}
                        alt="Country1 Flag"
                        priority
                    />
                </h3>
                {lang === 'el' ? 'Πληθυσμός: ' : 'Population: '}
                <span className="font-light">
                    {addCommas(addData2.population)}
                </span>
                <br />
                {lang === 'el' ? 'Κρούσματα: ' : 'Total cases: '}
                <span className="font-light">{addCommas(data2?.cases)}</span>
                <br />
                {lang === 'el' ? 'Σημερινά: ' : 'Cases today: '}
                <span className="font-light">{data2?.todayCases}</span> <br />
                {lang === 'el' ? 'Συνολικά Τέστ: ' : 'Total tests: '}
                <span className="font-light">{addCommas(data2?.tests)}</span>
                <br />
                {lang === 'el' ? 'Ενεργοί: ' : 'Active: '}
                <span className="font-light">{addCommas(data2?.active)} </span>
                <br />
                <span className="text-green-600">
                    {lang === 'el' ? 'Ανάρρωσαν: ' : 'Recovered: '}
                </span>
                <span className="font-light">
                    {addCommas(data2?.recovered)}{' '}
                </span>
                <br />
                <span className="text-red-700">
                    {lang === 'el' ? 'Θάνατοι: ' : 'Deaths: '}
                </span>
                <span className="font-light"> {addCommas(data2?.deaths)} </span>
            </div>
        </div>
    );
};
