import React from 'react'
import ChatDisplay from '../../components/ChatComponents/ChatDisplay';
import Nav from '../../components/NavComponents/Nav';

import './chat.css';

export default function Chat() {
    return (
        <div className='chat_container'>
            <Nav />
            <ChatDisplay />
        </div>
    )
}
