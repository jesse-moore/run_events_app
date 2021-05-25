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
            // keyframes: {
            //     slide_inf: {
            //         '0%': { transform: 'left: 0' },
            //         '100%': { transform: 'left: 12px' },
            //     },
            // },
            animation: {
                'slide-repeat-sm': 'slide-repeat-sm 1s linear infinite',
            },
            keyframes: {
                'slide-repeat-sm': {
                    '0%': { left: '0px' },
                    '100%': { left: '12px' },
                },
            },
            boxShadow: {
                'inner-full': 'inset 0px 2px 10px rgba(0,0,0,.3)',
                'inner-md': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.20)',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            boxShadow: ['active'],
            borderRadius: ['last'],
            borderRadius: ['first'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
