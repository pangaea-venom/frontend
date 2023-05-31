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
                    50: "#F8FAFC",
                    300: '#CBD5E1',
                },
                blue: {
                    400: '#567AF9',
                },
                orange: {
                    primary: '#F06C43',
                    secondary: '#FFECE7',
                },
                red: {
                    primary: '#E82A00',
                    secondary: '#FFE9E9',
                },
                green: {
                    primary: '#103B37',
                    secondary: '#E6EDED',
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
