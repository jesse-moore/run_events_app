const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            blue: colors.blue,
            gray: colors.trueGray,
            indigo: colors.indigo,
            red: colors.red,
            yellow: colors.amber,
            blueGray: colors.blueGray,
            lightBlue: colors.lightBlue,
            darkBlue: colors.darkBlue,
            green: colors.green,
            orange: colors.orange,
        },
        extend: {
            height: {
                500: '500px',
                450: '450px',
                400: '400px',
                350: '350px',
                300: '300px',
            },
            width: {
                550: '550px',
                500: '500px',
                450: '450px',
                400: '400px',
                350: '350px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};