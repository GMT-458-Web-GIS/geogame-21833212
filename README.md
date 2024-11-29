LIVE DEMO : https://gmt-458-web-gis.github.io/geogame-21833212/
![project](https://github.com/user-attachments/assets/fe8f2a38-35f7-41e7-b10b-1adb8a316e4d)


Project Overview

This is a browser-based quiz game where users load an Excel file containing questions and answers. Each question includes a text description, an image, and a correct city name. The game allows users to select a location on a map as their answer. The system verifies the selection against the correct answer and provides immediate feedback. This project combines map interactivity, file handling, and real-time feedback for an engaging learning experience.

Features

Excel File Input
Users can upload an Excel file containing quiz questions in a structured format.

Interactive Map Integration
A dynamic map allows users to select their answers by clicking on specific locations.

Real-Time City Detection
Using geolocation services, the system identifies the selected city based on the map click.

Question Management
Each question includes text, an image, and the correct city. Questions are displayed sequentially.

Score Tracking
Players earn points for correct answers and receive feedback for incorrect guesses.

Responsive Design
Fully functional on desktops, tablets, and mobile devices.


Gameplay Instructions

Upload an Excel file formatted with columns for "Question Text," "Image URL," and "Correct Answer."
The first question will appear with its image.
Click on the map to select a city as your answer.
The system will:
Identify the city based on your click.
Verify if the selected city matches the correct answer.
Progress through the quiz until all questions are answered.
At the end of the game, your total score will be displayed.


Technologies Used

HTML & CSS;
For creating the user interface and layout.
JavaScript;
To handle map interactions, quiz logic, and file handling.
Leaflet.js;
For implementing the interactive map.
SheetJS (xlsx);
For converting the uploaded Excel file into a JSON format.
Nominatim API;
To convert map click coordinates into city names.





