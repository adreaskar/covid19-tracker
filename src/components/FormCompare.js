'use client';

import Link from 'next/link';
import { Autocomplete } from './Autocomplete';
import { CustomButton } from './Button';
import { useSearchParams } from 'next/navigation';
import { compareCountry1 } from '@/store/useStore';
import { compareCountry2 } from '@/store/useStore';
import { useEffect } from 'react';

export const FormCompare = () => {
    const searchParams = useSearchParams();
    const country1 = compareCountry1((state) => state.country);
    const setCountry1 = compareCountry1((state) => state.setCountry);

    const country2 = compareCountry2((state) => state.country);
    const setCountry2 = compareCountry2((state) => state.setCountry);

    const lang = searchParams.get('lang');

    // Clear the countries state after the component is rendered
    useEffect(() => {
        setCountry1({ label: '', value: '' });
        setCountry2({ label: '', value: '' });
    }, []);

    return (
        <form
            className="signup-form w-[70%] flex flex-col justify-center items-center gap-3"
            autoComplete="off"
            id="query"
        >
            <h2>{lang === 'el' ? 'Σύγκριση' : 'Compare'}</h2>

            {/* Subtitle to change language */}
            {!lang ? (
                <p className="mt-[-40px] mb-[30px] text-[#888]" id="subtitle">
                    <Link
                        href="?lang=el"
                        className="text-[#1da0f2] no-underline hover:underline"
                    >
                        Στα Ελληνικά
                    </Link>
                </p>
            ) : (
                <p className="mt-[-40px] mb-[30px] text-[#888]" id="subtitle">
                    <Link
                        href="/compare"
                        className="text-[#1da0f2] no-underline hover:underline"
                    >
                        English
                    </Link>
                </p>
            )}

            <Autocomplete lang={lang} set={setCountry1} />
            <Autocomplete lang={lang} set={setCountry2} />

            {country1.label != '' &&
                country2.label != '' &&
                country1.label != country2.label && (
                    <CustomButton
                        link={
                            !lang
                                ? `/compare-results?country1=${country1.label}&iso1=${country1.value}&country2=${country2.label}&iso2=${country2.value}`
                                : `/compare-results?country1=${country1.label}&iso1=${country1.value}&country2=${country2.label}&iso2=${country2.value}&lang=el`
                        }
                        text={!lang ? `Show results` : `Εμφάνιση Αποτελεσμάτων`}
                    />
                )}
        </form>
    );
};
