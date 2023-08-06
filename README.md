
# Weather App

This weather app is built as home assignment for company. The app allows users to check the current weather and 5-day forecast for a selected city using the AccuWeather API. Users can also save favorite locations and toggle between Celsius and Fahrenheit units. Additionally, they can set Tel-Aviv, Israel, as the default city and enable the app to use their current location for display.

## Features

### Homepage

- Search a location with AccuWeather API autocomplete for city names.
- Pick a city to load the current weather and 5-day forecast for the selected city using the AccuWeather API.
- Save a location as a favorite.

### Favorites Page

- View a list of favorite locations with their current weather.

### Extra Features

- Celsius-Fahrenheit toggler.
- Select Tel-Aviv, Israel, as the default selected city.
- Enable the use of the user's current city location (based on JS Navigator Geolocation API) as the current location for app display.

## Stack Used

- Vite
- React 18
- React Redux 8
- TypeScript 5
- SCSS

### Alternative Libraries

- chart.js
- classnames
- dompurify
- react-select

## Scripts

To run the app locally, follow these steps:
To run the app locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Lizon57/Oren-Yaniv-06-08-2023.git
```

2. Set up the environment:

Contact repo's owner to obtain the API key for AccuWeather, or create one by yourself (at https://developer.accuweather.com/) Once you have the API key, create a file named .env in the root of the project and add the following line to it:

```bash
VITE_APP_AWEATHER_API_KEY=XXXXXX
```
Replace XXXXXX with the actual API key provided to you.

3. Install dependencies:

Make sure you have Node.js and npm (Node Package Manager) installed on your machine. Open the terminal, navigate to the project's root folder, and run the following command to install the required dependencies:

```bash
npm install
```

## Run the app:

After installing the dependencies, run the following command to start the development server:

```bash
npm start
```
This will compile the code and launch the app in your default web browser at http://localhost:5173.

## Explore the app:

You can now explore the weather app locally. The app should have a homepage with features like searching for locations, displaying current weather, and a 5-day forecast. You can also toggle between Celsius and Fahrenheit units and set Tel-Aviv, Israel, as the default city. Additionally, you can enable the app to use your current location to display weather information.

## Favorite Locations:

You can add locations to your favorites list, and the favorites page should display a list of your favorite locations with their current weather.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
