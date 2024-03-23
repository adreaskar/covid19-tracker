'use client';

import React, { useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export const Autocomplete = ({ lang, set }) => {
    const options = useMemo(() => countryList().getData(), []);

    const changeHandler = (country) => {
        set(country);
    };

    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            cursor: 'pointer',
        }),

        control: (defaultStyles) => ({
            ...defaultStyles,
            padding: '0 10px',
            cursor: 'pointer',
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles }),
    };

    return (
        <div className="w-full">
            <Select
                options={options}
                placeholder={
                    lang === 'el' ? 'Επιλέξτε χώρα...' : 'Select a country...'
                }
                onChange={changeHandler}
                styles={customStyles}
                className="text-lg"
            />
        </div>
    );
};
