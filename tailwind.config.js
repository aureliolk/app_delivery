module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            "c_gray": "#979797",
            "c_white": "#ffffff",
            "c_lgray": "#F9F9FB",
            "c_lorange": "#FFF9F2",
            "c_orange": "#FB9400",
            "c_boder": "#C4C4C4",
        },
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
            calistoga: ['Calistoga', 'cursive'],
        },
        screens: {
            'md': {
                'max': '767px'
            },
            'sm': {
                'max': '414px'
            },
        },
        extend: {}
    },
    plugins: [],
}