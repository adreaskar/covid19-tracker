'use client';

import { useSearchParams } from 'next/navigation';

export const CompareResultsHeader = () => {
    const searchParams = useSearchParams();

    const lang = searchParams.get('lang');

    return (
        <h2 className="flex gap-4 justify-center text-2xl md:text-[30px]">
            {lang === 'el' ? `Σύγκριση Δεδομένων` : `Data Comparison`}
        </h2>
    );
};
