import React, { useContext } from 'react';
import { ContextState } from '../../../../context/DataProvider';
import PageInit from '../../PageInit';
import ChatContact from '../ChatContact';
import ChatEmojiArea from '../ChatEmojiArea';
import ChatSend from '../ChatSend';
import io from 'socket.io-client';

const socket = io('http://localhost:3040');

export default function ChatDisplay() {

    const room = 1;
    const state: any = useContext(ContextState);
    const [statePage, setStatePage] = React.useState<boolean>(false);
    const [contactInfo] = state.contactInfo;

    React.useEffect(() => {
        const changeState = () => {
            if (contactInfo !== undefined) {
                setStatePage(true);
            };
        };
        changeState();
    }, [contactInfo, statePage]);
    
    const joinRoom = () => {
        socket.emit("join_room", room);
    };
    joinRoom();
    
    return (
        <div className='chat_container'>
            {
                statePage ?
                    <div className='chat_display'>
                        <ChatContact />
                        <div className='chat_display_area'>
                            <div className='message_display'>
                                <div className='message_row other-message'>
                                    <div className='message-title'>Roberto</div>
                                    <div className='message-text'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui omnis repudiandae porro! Id assumenda itaque veritatis illo earum, eius maxime neque ratione at! Eos soluta omnis officiis quidem dolore saepe.
                                    </div>
                                    <div className='message-time'>
                                        15:00
                                    </div>
                                </div>
                                <div className='message_row you-message'>
                                    <div className='message-text'>
                                        Ola tudo bem?
                                    </div>
                                    <div className='message-time'>
                                        15:00
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ChatEmojiArea />
                        <ChatSend socket={socket} username={'Lucas'} room={room} />
                    </div>
                    :
                    <PageInit />
            }
        </div>
    )
}
