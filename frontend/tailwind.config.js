/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#0F172A',
                appbar: '#0D111C',
                charcoal: '#5B616D',
                finegray: '#B0B1B7',
                slate: {
                    50: '#F8FAFC',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                },
                sky: {
                    50: '#F0F9FF',
                    500: '#0EA5E9',
                },
                blue: {
                    400: '#60A5FA',
                },
                orange: {
                    primary: '#F06C43',
                    secondary: '#FFECE7',
                },
                red: {
                    primary: '#E82A00',
                    secondary: '#FFE9E9',
                    400: '#F87171',
                },
                amber: {
                    300: '#FCD34D',
                },
                green: {
                    primary: '#103B37',
                    secondary: '#E6EDED',
                    400: '#4ADE80',
                    300: '#86EFAC',
                },
                lime: {
                    400: '#A3E635',
                },
                emerald: {
                    800: '#065F46',
                    200: '#A7F3D0',
                },
                mono: {
                    500: '#282828',
                    white: '#FBFBFB',
                    lightgray: '#E5E5EA',
                    gray: '#7E7F89',
                },
            },
        },
    },
    plugins: [],
}
