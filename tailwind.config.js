/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                moderateBlue: 'hsl(238, 40%, 52%)',
                softRed: 'hsl(358, 79%, 66%)',
                lightgrayishblue: 'hsl(239, 57%, 85%)',
                palered: 'hsl(357, 100%, 86%)',
                darkblue: 'hsl(212, 24%, 26%)',
                grayishBlue: 'hsl(211, 10%, 45%)',
                lightgray: 'hsl(223, 19%, 93%)',
                verylightgray: 'hsl(228, 33%, 97%)',
                white: 'hsl(0, 0%, 100%)',
            },
            fontSize: {
                body: '16px',
            },
        },
    },
    plugins: [],
}
