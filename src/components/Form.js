'use client';
import Link from 'next/link';
import { Autocomplete } from './Autocomplete';
import { CustomButton } from './Button';
import { useSearchParams } from 'next/navigation';
import { useCountry } from '@/store/useStore';
import { useEffect } from 'react';

export const Form = () => {
    const searchParams = useSearchParams();
    const country = useCountry((state) => state.country);
    const setCountry = useCountry((state) => state.setCountry);

    const lang = searchParams.get('lang');

    // Clear the country state after the component is rendered
    useEffect(() => {
        setCountry({ label: '', value: '' });
    }, []);

    return (
        <form
            className="signup-form w-[70%] flex flex-col justify-center items-center gap-3"
            autoComplete="off"
            id="query"
        >
            <h2>Covid-19 Tracker</h2>

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
                        href="/"
                        className="text-[#1da0f2] no-underline hover:underline"
                    >
                        English
                    </Link>
                </p>
            )}

            <Autocomplete lang={lang} set={setCountry} />

            {country.label != '' && (
                <CustomButton
                    link={
                        !lang
                            ? `/results?country=${country.label}&iso=${country.value}`
                            : `/results?country=${country.label}&iso=${country.value}&lang=el`
                    }
                    text={
                        !lang
                            ? `Show results for ${country.label}`
                            : `Αποτελέσματα για ${country.label}`
                    }
                />
            )}

            <h4>{!lang ? 'Or' : 'Ή'}</h4>

            <CustomButton
                className="hover:bg-gray-300 bg-gray-200 text-black"
                link={!lang ? '/compare' : '/compare?lang=el'}
                text={!lang ? 'Compare two countries' : 'Σύγκριση δύο χωρών'}
            />
        </form>
    );
};
