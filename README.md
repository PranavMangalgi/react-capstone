# Super App

## Overview

Super App is a web application that combines features related to user registration, personalized dashboard, entertainment recommendations, and notes. It leverages React for the frontend, React Router for navigation, and utilizes various APIs for fetching weather information, news, and movie details.

## Project Structure

The project is structured as follows:

- **Components:**
  - **Dashboard:** The central hub of the application displaying user information, weather details, news, and a customizable timer.
  - **Timer:** A timer component with countdown animation, adjustable time settings, and beeping sound on completion.
  - **ProfileWeather:** Component to display user information and real-time weather details based on the user's location.
  - **NewsSection:** Component fetching and displaying news articles, providing a link to explore more in the entertainment section.
  - **Entertainment:** Page presenting entertainment options based on user preferences.
  - **Genre:** Component under Entertainment, fetching movie information based on selected genres.
  - **Notes:** Component for users to write and save notes, with data persistence in local storage.
  - **Register:** Component for user registration, with form validation and checkbox confirmation.

- **Styling:**
  - The project uses modular CSS (module.css) for styling components, ensuring a scoped and maintainable styling approach.

## Concepts Used

- **React Components:**
  - Components are modularized for reusability and maintainability.
  - Utilization of state and props to manage and pass data between components.

- **React Router:**
  - Navigation within the application is handled using React Router, ensuring a seamless user experience.

- **State Management:**
  - State is managed using the `useState` hook, ensuring dynamic rendering of components based on user interaction.

- **Effect Hooks:**
  - `useEffect` hooks are employed to handle side effects such as data fetching and updating local storage.

- **API Integration:**
  - Axios is used for making asynchronous HTTP requests to external APIs, fetching weather, news, and movie information.

- **LocalStorage:**
  - Local storage is utilized for data persistence, storing user details, notes, and authentication status.

- **Form Handling:**
  - User input in forms is validated, providing error messages for empty fields, invalid email, and checkbox confirmation.

- **Dynamic Rendering:**
  - Components dynamically render content based on fetched data and user interactions.

## How to Run

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.

## Environment Variables

Make sure to set the following environment variables in a `.env` file:

- `REACT_APP_WEATHER_KEY`: API key for weather data.
- `REACT_APP_NEWS_API_KEY`: API key for news data.
- `REACT_APP_MOVIE_KEY`: API key for movie data.

## Contributing

Contributions are welcome! If you have any suggestions, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
