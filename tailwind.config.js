/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './js/**/*.js'],
    theme: {
        extend: {
            colors: {
                musa: {
                    bg: '#F4EFE6',
                    terracotta: '#A84B2B',
                    terracottaDark: '#8C3B1F',
                    peach: '#D8916C',
                    gold: '#A88E5B',
                    goldDark: '#7A6338',
                    goldLight: '#D5B878',
                    text: '#4A3F35',
                    muted: '#6B6055'
                }
            },
            fontFamily: {
                serif: ['Lora', 'Georgia', 'serif'],
                sans: ['Plus Jakarta Sans', 'sans-serif']
            }
        }
    },
    plugins: []
};
