import { create } from 'zustand';

export const useCountry = create((set) => ({
    country: {
        label: '',
        value: '',
    },
    setCountry: (country) => set({ country }),
}));

export const compareCountry1 = create((set) => ({
    country: {
        label: '',
        value: '',
    },
    setCountry: (country) => set({ country }),
}));

export const compareCountry2 = create((set) => ({
    country: {
        label: '',
        value: '',
    },
    setCountry: (country) => set({ country }),
}));
