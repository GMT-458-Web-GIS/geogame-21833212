# LIVE DEMO : https://gmt-458-web-gis.github.io/geogame-21833212/
![project](https://github.com/user-attachments/assets/fe8f2a38-35f7-41e7-b10b-1adb8a316e4d)


# Project Overview

This is a browser-based quiz game where users load an Excel file containing questions and answers. Each question includes a text description, an image, and a correct city name. The game allows users to select a location on a map as their answer. The system verifies the selection against the correct answer and provides immediate feedback. This project combines map interactivity, file handling, and real-time feedback for an engaging learning experience.

## Features

### Excel File Input
- Users can upload an Excel file containing quiz questions in a structured format.

### Interactive Map Integration
- A dynamic map allows users to select their answers by clicking on specific locations.

### Real-Time City Detection
- Using geolocation services, the system identifies the selected city based on the map click.

### Question Management
- Each question includes text, an image, and the correct city. Questions are displayed sequentially.

### Score Tracking
- Players earn points for correct answers and receive feedback for incorrect guesses.

### Responsive Design
- Fully functional on desktops, tablets, and mobile devices.

## Gameplay Instructions

1. Upload an Excel file formatted with columns for "Question Text," "Image URL," and "Correct Answer."
2. The first question will appear with its image.
3. Click on the map to select a city as your answer.
4. The system will:
   - Identify the city based on your click.
   - Verify if the selected city matches the correct answer.
5. Progress through the quiz until all questions are answered.
6. At the end of the game, your total score will be displayed.


## Event Handlers

### `onclick`
The `onclick` event triggers a function when an element, such as a button, is clicked. This is used to initiate actions like starting a game, navigating between pages, or interacting with UI components.

### `onchange`
The `onchange` event executes a function when the value of an input or select element changes, typically after the element loses focus. This is commonly used in forms or settings pages where user input needs to be captured or validated.

## Benefits of Closures

Closures are an essential feature in JavaScript that enable functions to retain access to their lexical scope even when the function is executed outside that scope. In this project, closures proved highly beneficial in various scenarios:

### Timer Function
In the `startTimer` function, the `timeLeft` variable was defined and updated every second using `setInterval`. The anonymous function within `setInterval` was able to access `timeLeft`, allowing the timer to function correctly even as it ran asynchronously.

### Managing Questions and Scores
Functions such as `checkAnswer` and `showQuestion` relied on variables like `currentQuestionIndex` and `score` within their closures. This ensured that these variables were dynamically updated as the game progressed, reflecting user interactions and game states.

### Event Listener Usage
For instance, in the `map.on('click')` event listener, the `selectedCity` variable was used to verify the accuracy of the chosen city. This variable was maintained within the closure, enabling comparisons with the correct answer and facilitating gameplay logic.

## AI Assistance

AI tools were invaluable for:

- **Understanding and Debugging**: Provided guidance on complex algorithm design, debugging, and optimizing performance.
- **API Integrations**: Helped integrate map events and APIs to enhance interactive features within the quiz game.
- **Professional Design Principles**: Offered methods and insights for applying UI/UX best practices and tools to ensure a cohesive user experience.

## DOM Interaction

### Showing and Hiding HTML Elements
Functions like `showMainMenu()` and `showSettings()` use `classList` to add or remove the `hidden` class, controlling the visibility of various UI elements.

### Dynamically Updating Content
- **Accessing Elements**: Used `document.getElementById()` to target and modify content within HTML elements.
- **Updating Scores**: Modified the `textContent` property of an element to display the current player's score dynamically.

### Event Listeners and Map Integration
- Utilized `map.on('click')` for listening to click events on the map, which activated specific functions related to user interaction.
- Used the `document` object for real-time updates when events were triggered, ensuring that the UI reflects the latest game state.

### Updating Images and Text
To update questions and images, `document.getElementById()` was leveraged to modify the content, providing a seamless user experience by dynamically altering the displayed content as the game progressed.

## Technologies Used

- **HTML & CSS**: For creating the user interface and layout.
- **JavaScript**: To handle map interactions, quiz logic, and file handling.
- **Leaflet.js**: For implementing the interactive map.
- **SheetJS (xlsx)**: For converting the uploaded Excel file into a JSON format.
- **Nominatim API**: To convert map click coordinates into city names.










