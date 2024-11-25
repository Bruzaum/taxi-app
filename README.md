# Ride Request Application  

This project is a solution for a technical test aimed at a Fullstack Developer position. The application simulates a ride request platform, allowing users to request private car rides and manage their ride history.  

## Features  
- **Driver and Fare Selection:** Users can choose a driver and fare from available options.  
- **Ride Confirmation:** Confirm the selected ride and receive a booking.  
- **Ride History:** View a list of all completed rides.  

## Purpose  
The goal of this project is to demonstrate proficiency in building scalable and maintainable fullstack applications, focusing on clean architecture and seamless user experience.  

## Technologies Used  
- **Frontend:** React  
- **Backend:** Node.js and Typescript
- **Database:** SQLite and Prisma  

## Prerequisites  

Before running the project, ensure you have the following installed:  

- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

## How to Run  

Follow the steps below to run the project:  

1. Clone the repository:  

   ```bash
   git clone https://github.com/your-username/ride-request-application.git

2. Navigate to the project directory:

   ```bash
   cd ride-request-application `

3.  Start the application using Docker Compose:

    bash

    Copiar código

    `docker-compose up`

    This command will build and start the necessary containers for the application. Once the process is complete, the application should be accessible at `http://localhost:80`

### Stopping the Application

To stop and remove the containers, use the following command:

bash

Copiar código

`docker-compose down`

Project Structure
-----------------

-   **/frontend:** Contains the React application.
-   **/backend:** Contains the Node.js API built with TypeScript and Prisma.
-   **/database:** SQLite database file and migrations.
-   **docker-compose.yml:** Configuration for the Docker containers.

Contribution
------------

Contributions are welcome! Feel free to open an issue or submit a pull request.

License
-------

This project is licensed under the MIT License.
