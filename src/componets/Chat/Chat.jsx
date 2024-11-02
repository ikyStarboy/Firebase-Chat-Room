import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'; // Firebase Firestore methods
import React, { useEffect, useRef, useState } from 'react'; // React imports
import { auth, database } from '../../../firebase-config'; // Firebase configuration

export default function Chat({ roomID, uid, logout }) {
    const [newMessage, setNewMessage] = useState(''); // State for the new message input
    const [messages, setMessages] = useState([]); // State to hold chat messages
    const messagesEndRef = useRef(null); // Ref to scroll to the end of the messages

    useEffect(() => {
        // Create a query to fetch messages for the specific chat room, ordered by creation time
        const messageQuery = query(
            collection(database, 'messages'),
            where('room', '==', roomID),
            orderBy('createdAt')
        );

        // Subscribe to the snapshot of messages
        const getData = onSnapshot(messageQuery, (snapshotData) => {
            let messages = [];
            snapshotData.forEach((data) => {
                // Add each message to the messages array
                messages.push({ ...data.data(), id: data.id });
            });
            setMessages(messages); // Update the messages state
        });

        return () => getData(); // Cleanup function to unsubscribe from the listener
    }, [roomID]); // Effect runs whenever roomID changes

    // Function to scroll to the bottom of the messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom(); // Automatically scroll to the bottom whenever messages change
    }, [messages]);

    // Function to handle sending a new message
    const handleSendMessage = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (newMessage === '') return; // Do not send empty messages

        try {

            // Add a new message document to the Firestore database
            await addDoc(collection(database, 'messages'), {
                room: roomID,
                chat: newMessage,
                createdAt: serverTimestamp(), // Timestamp for message creation
                user: auth.currentUser.displayName, // User's display name
                roomCreator: auth.currentUser.email, // Email of the room creator
                photoURL: auth.currentUser.photoURL, // User's profile picture URL
                uid: auth.currentUser.uid, // User's unique ID
            });
            
        } catch (error) {
            console.log('Error sending message: ' + error); // Log any errors
        }finally{
            setNewMessage('')
        }
        ; // Clear the message input after sending
    };

    const email = auth.currentUser.email; // Get the current user's email

    return (
        <div className='h-screen flex flex-col justify-center'>
            <div className="divider lg:w-2/5 w-full mx-auto">{email}</div>
            <div className="lg:w-2/5 w-full relative bg-gray-50 border p-4 rounded-lg mx-auto py-5 lg:h-3/5 overflow-y-scroll">
                {/* Scrollable chat message container */}
                
                {messages.length!==0? messages.map(msg => (
                    <div key={msg.id}> {/* Unique key for each message */}
                        <div className={msg.uid === uid ? 'chat chat-end' : 'chat chat-start'}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        src={msg.photoURL} // User's avatar image
                                    />
                                </div>
                            </div>
                            <div className="chat-header">
                                {msg.user} {/* Display user's name */}
                                <time className="text-xs opacity-50">{msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString() : ''}</time> {/* Format and display message timestamp */}
                            </div>
                            <div className="chat-bubble">{msg.chat}</div> {/* Display message content */}
                        </div>
                    </div>
                )):<div className='text-center border p-3 bg-green-100'>
                    <h1>This room has no messages; you can join any of your friends without any limits by using the room name ( <span className='font-bold text-yellow-600'>{roomID}</span> ) you created. <br />
                       
                    </h1>
                    </div>}
                <div ref={messagesEndRef} /> {/* Empty div to act as scroll target */}
            </div>
            <div className='text-center p-2 bg-gray-300 lg:w-2/5 w-full mx-auto'>
                {/* Message input form */}
                <form onSubmit={handleSendMessage} className='grid gap-2 grid-cols-4'>
                    <input 
                        placeholder='Your messages...' 
                        value={newMessage}  
                        onChange={(e) => setNewMessage(e.target.value)} 
                        type="text" 
                        className='input col-span-3 input-bordered w-full' 
                    />
                    <button type='submit' className='bg-green-500 btn col-span-1 text-white hover:bg-green-600'>Send</button>
                </form>
                <button className='btn bg-red-500 hover:bg-red-900 text-sm text-white btn-sm my-2 rounded-md' onClick={logout}>
                    Logout Now
                </button>
            </div>
        </div>
    );
}
