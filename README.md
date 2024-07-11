## Chat Application - ReadMe

### Project Overview

This is a full-stack chat application built using the following technologies:

- **MongoDB**: A NoSQL database used for storing user and chat data.
- **React**: A JavaScript library for building the user interface and client-side functionality.
- **TypeScript**: A superset of JavaScript that adds static typing to the language, improving code quality and maintainability.
- **Socket.IO**: A real-time, bidirectional, and event-based communication library used for the real-time chat functionality.

The application allows users to create accounts, log in, and engage in real-time chat conversations with other users.

### Features

- **User Authentication**: Users can create accounts, log in, and log out securely.
- **Real-Time Messaging**: Users can send and receive messages in real-time using Socket.IO.
- **Conversation History**: All messages are stored in the MongoDB database, allowing users to view previous chat history.
- **Online Status**: Users can see which of their contacts are currently online and available to chat.
- **Responsive Design**: The application is designed to work seamlessly on both desktop and mobile devices.

### Getting Started

To run the chat application locally, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/chat-app.git
   ```

2. **Install dependencies**:
   - Navigate to the root directory and run `npm install`.
   - Navigate to the chat directory and run `npm install`.

3. **Set up the environment**:
   - Create a `.env` file in the server directory and add the following environment variables:
     - `MONGO_URI`: The connection string for your MongoDB database.
     - `JWT_SECRET`: A secret key used for JWT token generation.
   - Create a `.env` file in the client directory and add the following environment variable:
     - `REACT_APP_SERVER_URL`: This is not needed you can update this if you want to be secure 

4. **Start the development servers**:
   - In the root directory, run `npm start` to start the backend server.
   - automatically this will start thr frontend as this is a single web service

5. **Access the application**:
   - Open your web browser and navigate to `http://localhost:3000` to access the chat application.

### Project Structure

The project is divided into two main directories:

1. **backend**:
   - Contains the server-side code, including the MongoDB connection, API routes, and Socket.IO implementation.
   - The main entry point is `server.ts`.

2. **chat-app**:
   - Contains the client-side code, including the React components, Redux state management, and Socket.IO integration.
   - The main entry point is `index.tsx`.

### Contributing

If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure that the application still works as expected.
4. Commit your changes and push your branch to your forked repository.
5. Submit a pull request, and the project maintainers will review your changes.

### License

This project is licensed under the [MIT License](LICENSE).
