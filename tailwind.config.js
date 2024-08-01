module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'sm-max': {'max': '425px'},
        'md-max': {'min': '426px', 'max': '768px'},
        'bmd-max': {'min': '769px', 'max': '1024px'}, 
        'lg-max': {'min': '1025px', 'max': '1260px'}, 
        'xl-max': {'min': '1261px', 'max': '1400px'}, 
        '2xl-max': {'min': '1401px', 'max': '1600px'} 
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

