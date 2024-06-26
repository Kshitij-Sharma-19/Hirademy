
# Express.js Backend for Assistant Management  - Hiradmy

## Overview

This repository contains the code for a backend server built using Express.js to manage assistants in an organization. The server provides endpoints to perform CRUD operations on assistant data stored in a PostgreSQL database.

## Features

- Create, Read, Update, and Delete assistant records
- Retrieve assistant details by ID
- Input validation for adding and updating assistants
- Environment variable configuration using dotenv

## Requirements

To run this code, you need the following installed on your machine:

- Node.js (v14 or higher)
- PostgreSQL

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Kshitij-Sharma-19/Hirademy.git
   ```
2. Navigate to the project directory:
   ```bash 
   cd express-assistant-management
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:Create a .env file in the root directory and provide the following variables:
   ``` plaintext
   PG_USER=your_postgres_username
   PG_HOST=your_postgres_host
   PG_DATABASE=your_postgres_database_name
   PG_PASSWORD=your_postgres_password
   PG_PORT=your_postgres_port
   ```

## Usage
1.Start the server:
   ```bash
   npm start
   ```
2.The server will start running at http://localhost:3000.

3.Use API endpoints to interact with the assistant data.

## API Endpoints
* GET `/`: Serve index.html file.<br>
* POST `/assistant`: Add a new assistant to the database.<br>
* GET `/assistant/:assistant_id`: Retrieve assistant details by ID.<br>
* PUT `/assistant/:assistant_id`: Update assistant details by ID.<br>
* DELETE `/assistant/:assistant_id`: Delete an assistant by ID.
