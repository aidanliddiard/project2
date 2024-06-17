# Wanderlust
By Tyler Byrd, Aidan Liddiard, and Lesley Tomosada

## Overview

Wanderlust is a comprehensive vacation planning application designed to simplify the process of creating and managing travel plans. Users can create and view their vacations, and add, edit, and delete itinerary items for each vacation. The application is designed to be intuitive and user-friendly, making the process of planning a vacation as seamless as possible. The site is responsive for mobile view, and optimized for light and dark modes.

## Technologies Used

- **Frontend**: The frontend of the application is built with React and TypeScript, and styled with Tailwind CSS. It also uses the Unsplash API for image generation.

- **Backend**: The server-side logic is written in Node.js and TypeScript.

- **Testing**: Unit tests for the backend are written using Jest and Supertest, and can be found in the [`__tests__`](backend/__tests__) directory.

- **Database**: The application uses a SQL database for persisting data. The database setup script can be found at [`setup.sql`](backend/src/setup.sql).

## Features

### User Management
The application allows users to create their own accounts and log in.
#### Create An Account
![Create Account](/public/images/readme/createAccount.png)
#### Log In
![Log In](/public/images/readme/login.png)

### Vacation Planning
Users can create and manage vacations, with each vacation having its own unique itinerary. 
#### Create a Vacation
![Create Vacation](/public/images/readme/createVacation.png)
#### Vacations
![Vacations](/public/images/readme/vacations.png)
#### Vacation Details
![Vacation Details](/public/images/readme/itinerary.png)


### Itinerary Management
Each vacation can have multiple itinerary items, which can be created, viewed, and managed individually. 
#### Create an Itinerary Item
![Create Itinerary](/public/images/readme/itinerary.png)
#### Edit Itinerary Item
![Edit Itinerary](/public/images/readme/editItinerary.png)
#### Delete Itinerary Item
![Delete Itinerary](/public/images/readme/deleteItinerary.png)

