'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export const ResultsHeader = () => {
    const searchParams = useSearchParams();
    const countryValue = searchParams.get('iso');
    const countryLabel = searchParams.get('country');
    const lang = searchParams.get('lang');
    const countryFlag = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryValue}.svg`;

    return (
        <h2 className="flex gap-4 justify-center text-2xl md:text-[30px]">
            {lang === 'el'
                ? `Στοιχεία για ${countryLabel}`
                : `Data for ${countryLabel}`}
            <Image
                src={countryFlag}
                width={40}
                height={80}
                alt="Country Flag"
                priority
            />
        </h2>
    );
};
