import { Container } from '@/components/Container';
import { Credits } from '@/components/Credits';
import { Footer } from '@/components/Footer';
import { CustomButton } from '@/components/Button';
import { CompareResultsHeader } from '@/components/CompareResultsHeader';
import { CompareResultsData } from '@/components/CompareResultsData';
import { getData } from '@/actions/getData';
import { getAddData } from '@/actions/getAddData';
import { calcStats } from '@/actions/compareStats';

export default async function CompareResults({ searchParams }) {
    // Get the covid data
    const country1 = await getData(searchParams.iso1); //{ dataStatus, data }
    const country2 = await getData(searchParams.iso2); //{ dataStatus, data }

    // Get additional country data
    const addCountry1 = await getAddData(searchParams.iso1); //{ addStatus, addData }
    const addCountry2 = await getAddData(searchParams.iso2); //{ addStatus, addData }

    // Get comparison stats
    const {
        larger,
        smaller,
        timesBigger,
        deadlier,
        percentDeadlier,
        timesDeadlier,
    } = await calcStats(
        country1,
        country2,
        addCountry1,
        addCountry2,
        searchParams.country1,
        searchParams.country2,
    );

    // Get the language
    const lang = searchParams.lang;

    return (
        <>
            <Container>
                <div className="px-[40px] pb-[16px] pt-[40px]">
                    <CompareResultsHeader />

                    {/* Results */}
                    {country1.dataStatus != 200 ||
                    addCountry1.addStatus != 200 ||
                    country2.dataStatus != 200 ||
                    addCountry2.addStatus != 200 ? (
                        // If the countries are not found display an error message
                        <div className="bg-red-600/10 p-5 rounded-md">
                            <h3 className="border-none text-red-900 text-xl">
                                {lang === 'el'
                                    ? 'Παρουσιάστηκε κάποιο σφάλμα:'
                                    : 'Sorry, there was an error:'}
                            </h3>
                            <p className="text-red-900 font-light text-lg">
                                A country was not found
                            </p>
                        </div>
                    ) : (
                        // If the countries are found display the results
                        <CompareResultsData
                            countryLabel1={searchParams.country1}
                            countryLabel2={searchParams.country2}
                            countryIso1={searchParams.iso1}
                            countryIso2={searchParams.iso2}
                            data1={country1.data}
                            addData1={addCountry1.addData}
                            data2={country2.data}
                            addData2={addCountry2.addData}
                            lang={lang}
                        />
                    )}

                    <div className="mt-7 text-md lg:text-lg" id="extStats">
                        <h3 id="large">
                            {lang === 'el'
                                ? 'Αναλυτικά στατιστικά δεδομένα'
                                : 'Εxtensive statistical data'}
                        </h3>

                        {country1.dataStatus != 200 ||
                        addCountry1.addStatus != 200 ||
                        country2.dataStatus != 200 ||
                        addCountry2.addStatus != 200 ? (
                            <div className="bg-red-600/10 p-5 rounded-md">
                                <h3 className="border-none text-red-900 text-xl">
                                    {lang === 'el'
                                        ? 'Παρουσιάστηκε κάποιο σφάλμα:'
                                        : 'Sorry, there was an error:'}
                                </h3>
                                <p className="text-red-900 font-light text-lg">
                                    A country was not found
                                </p>
                            </div>
                        ) : (
                            <div className="font-light">
                                {lang === 'el' ? (
                                    <p>
                                        ⚰️ Ο Covid-19 είναι {timesDeadlier}{' '}
                                        φορές πιο θανατηφόρος στην {deadlier}{' '}
                                        σχετικά με τον πληθυσμό της, ή{' '}
                                        <b>{percentDeadlier}%</b> περισσότερο.
                                    </p>
                                ) : (
                                    <p>
                                        ⚰️ Covid-19 is {timesDeadlier} times
                                        deadlier in {deadlier} regarding
                                        it&apos;s population, or{' '}
                                        <b>{percentDeadlier}%</b> more.
                                    </p>
                                )}
                            </div>
                        )}
                        <br />
                        {country1.dataStatus != 200 ||
                        addCountry1.addStatus != 200 ||
                        country2.dataStatus != 200 ||
                        addCountry2.addStatus != 200 ? (
                            <div className="bg-red-600/10 p-5 rounded-md">
                                <h3 className="border-none text-red-900 text-xl">
                                    {lang === 'el'
                                        ? 'Παρουσιάστηκε κάποιο σφάλμα:'
                                        : 'Sorry, there was an error:'}
                                </h3>
                                <p className="text-red-900 font-light text-lg">
                                    A country was not found
                                </p>
                            </div>
                        ) : (
                            <div className="font-light">
                                {lang === 'el' ? (
                                    <p>
                                        📈 H {larger} είναι {timesBigger} φορές
                                        μεγαλύτερη σε πληθυσμό από την {smaller}
                                    </p>
                                ) : (
                                    <p>
                                        📈 {larger} is {timesBigger} times
                                        bigger in population than {smaller}
                                    </p>
                                )}{' '}
                            </div>
                        )}
                    </div>

                    <CustomButton
                        className="mt-10 lg:w-min"
                        link={lang == 'el' ? '/?lang=el' : '/'}
                        text={lang == 'el' ? 'Επιστροφή' : 'Back'}
                    />

                    <Footer lang={lang} />
                </div>
            </Container>

            <Credits lang={lang} />
        </>
    );
}
