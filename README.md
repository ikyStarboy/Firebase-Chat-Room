# Real-Time Group Chat Application

This project is a real-time group chat application using React, Firebase for store data and real-time communication. Users can authenticate with Google, create rooms, and send messages in real time.

## Features

- **User Authentication**: Users can sign in using their Google account with Firebase authentication.
- **Room Creation**: Users can create and join unique rooms for chatting, each identified by a unique room ID.
- **Real-time Messaging**: Messages are sent and received in real time using Socket.IO, ensuring instant communication.
- **Message Storage**: All messages are stored in Firebase Firestore for persistence and retrieval.

## Main Project File Structure

- `App.jsx` The main application component handling user authentication and routing to the chat room.
- `Auth.jsx`: Component for user authentication via Google.
- `Chat.jsx`: Component for rendering the chat interface, sending messages, and displaying chat history.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/devmilon923/Firebase-Chat-Room.git
   cd <repo-directory>

   ```

2. **Install dependencies:**:

   ```bash
   npm install

   ```

3. **Run Project**:

   ```bash
   npm run dev
   ```

## Firebase Configuration:

- **Firebase Setup**: Make sure to set up your Firebase project and update your Firebase configuration in `firebase-config.js` to connect your app to Firebase services.

4. **Access the application:** Open http://localhost:5173 in your browser.

## Dependencies Used

- **react**: JavaScript library for building user interfaces.
- **firebase**: For user authentication and data storage.
- **tailwindcss**: For make fontend part.

## Live URL

https://chat-others.vercel.app

## License

This project is licensed under the **MIT License**.
