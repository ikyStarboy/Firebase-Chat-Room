import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { auth, database } from '../../../firebase-config';

export default function Chat({ roomID, uid,logout }) {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null); // Create a ref for scrolling

    useEffect(() => {
        const messageQuery = query(collection(database, 'messages'), where('room', '==', roomID), orderBy('createdAt'));
        const getData = onSnapshot(messageQuery, (snapshotData) => {
            let messages = [];
            snapshotData.forEach((data) => {
                messages.push({ ...data.data(), id: data.id });
            });
            setMessages(messages);
        });
        return () => getData(); // Correctly unsubscribe
    }, [roomID]); // Add roomID as a dependency

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom whenever messages change
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (newMessage === '') return;

        try {
            await addDoc(collection(database, 'messages'), {
                room: roomID,
                chat: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                roomCreator: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
                uid: auth.currentUser.uid,
            });
        } catch (error) {
            console.log('error ' + error);
        }
        setNewMessage('');
    };
    const email= auth.currentUser.email
    return (
        <div className='h-screen flex flex-col justify-center'>
           
           <div className="divider lg:w-2/5 w-full mx-auto">{email}</div>
            <div className="lg:w-2/5 w-full relative bg-gray-50 border p-4 rounded-lg mx-auto py-5 lg:h-3/5 overflow-y-scroll"> {/* Use overflow-y-scroll for vertical scrolling */}
                {messages.map(msg => (
                    <div key={msg.id}> {/* Use key prop for mapped elements */}
                        <div className={msg.uid === uid ? 'chat chat-end' : 'chat chat-start'}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS chat bubble component"
                                        src={msg.photoURL}
                                    />
                                </div>
                            </div>
                            <div className="chat-header">
                                {msg.user} {/* Show the user's name */}
                                <time className="text-xs opacity-50">{msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString() : ''}</time> {/* Format timestamp */}
                            </div>
                            <div className="chat-bubble">{msg.chat}</div>
                            
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Empty div to act as a scroll target */}
                
            </div>
            <div className='text-center p-2 bg-gray-300 lg:w-2/5 w-full mx-auto'>
                <form onSubmit={handleSendMessage} action="" className='grid gap-2 grid-cols-4'>
                    <input placeholder='Your messages...' value={newMessage}  onChange={(e) => setNewMessage(e.target.value)} type="text" className='input col-span-3 input-bordered w-full' />
                    <button type='submit' className='bg-green-500 btn col-span-1  text-white hover:bg-green-600'>Send</button>
                </form>
                <button className='btn bg-red-500 hover:bg-red-900 text-sm text-white btn-sm my-2 rounded-md' onClick={logout} >Logout Now</button>
            </div>
           
        </div>
    );
}
