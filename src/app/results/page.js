import { Container } from '@/components/Container';
import { Credits } from '@/components/Credits';
import { Footer } from '@/components/Footer';
import { CustomButton } from '@/components/Button';
import { ResultsHeader } from '@/components/ResultsHeader';
import { ResultsData } from '@/components/ResultsData';
import { getData } from '@/actions/getData';
import { getYesterdayData } from '@/actions/getYesterdayData';
import { getAddData } from '@/actions/getAddData';
import { calcStats } from '@/actions/calcStats';

export default async function Results({ searchParams }) {
    // Get the covid data data
    const { dataStatus, data } = await getData(searchParams.iso);

    // Get the covid data from yesterday
    const { yestStatus, yestData } = await getYesterdayData(searchParams.iso);

    // Get additional country data
    const { addStatus, addData } = await getAddData(searchParams.iso);

    // Get stats from yesterday
    const { percentCases, raise } = await calcStats(data, yestData);

    // Get the language
    const lang = searchParams.lang;

    return (
        <>
            <Container>
                <div className="px-[40px] pb-[16px] pt-[40px]">
                    <ResultsHeader />

                    {/* Results */}
                    {dataStatus != 200 || addStatus != 200 ? (
                        // If the country is not found display an error message
                        <div className="bg-red-600/10 p-5 rounded-md">
                            <h3 className="border-none text-red-900 text-xl">
                                {lang === 'el'
                                    ? 'Παρουσιάστηκε κάποιο σφάλμα:'
                                    : 'Sorry, there was an error:'}
                            </h3>
                            <p className="text-red-900 font-light text-lg">
                                {data}
                            </p>
                        </div>
                    ) : (
                        // If the country is found display the results
                        <ResultsData
                            data={data}
                            addData={addData}
                            lang={lang}
                        />
                    )}

                    <div className="mt-7 text-md lg:text-lg" id="extStats">
                        <h3 id="large">
                            {lang === 'el'
                                ? 'Αναλυτικά στατιστικά δεδομένα'
                                : 'Εxtensive statistical data'}
                        </h3>

                        {yestStatus != 200 ? (
                            // If yesterday data do not exist display an error message
                            <div className="bg-red-600/10 p-5 rounded-md">
                                <h3 className="border-none text-red-900 text-xl">
                                    {lang === 'el'
                                        ? 'Παρουσιάστηκε κάποιο σφάλμα:'
                                        : 'Sorry, there was an error:'}
                                </h3>
                                <p className="text-red-900 font-light">
                                    Could not get yesterday&apos;s data to
                                    compare.
                                </p>
                            </div>
                        ) : // If data exist display the results
                        percentCases != 0 ? (
                            <div className="font-light">
                                {raise ? (
                                    <div>
                                        📈{' '}
                                        {lang === 'el'
                                            ? 'Κρούσματα σχετικά με εχθές: '
                                            : 'Cases since yesterday: '}
                                        <img
                                            src="images/raise.png"
                                            style="width: 15px;"
                                        />{' '}
                                        <b> {percentCases} %</b>
                                    </div>
                                ) : (
                                    <div>
                                        📉{' '}
                                        {lang === 'el'
                                            ? 'Κρούσματα σχετικά με εχθές: '
                                            : 'Cases since yesterday: '}
                                        <img
                                            src="images/fall.png"
                                            style={{ width: '15px' }}
                                        />{' '}
                                        <b>{percentCases}%</b>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="font-light">
                                📑{' '}
                                {lang === 'el'
                                    ? 'Κρούσματα σχετικά με εχθές: Καμία Αλλαγή'
                                    : 'Cases since yesterday:  Not changed'}
                            </p>
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
