import React, { useContext } from 'react';
import { ContextState } from '../../../../context/DataProvider';
import PageInit from '../../PageInit';
import ChatContact from '../ChatContact';
import ChatEmojiArea from '../ChatEmojiArea';
import ChatSend from '../ChatSend';
import io from 'socket.io-client';
import Message from '../../Messages/Message';

const socket = io('http://localhost:3040');

export default function ChatDisplay() {
    const state: any = useContext(ContextState);

    const [messageData, setMessageData] = React.useState<any[]>([]);

    const [statePage, setStatePage] = React.useState<boolean>(false);
    const [contactInfo] = state.contactInfo;
    const [room, setRoom] = React.useState<any>();

    React.useEffect(() => {
        const changeState = () => {
            if (contactInfo !== undefined) {
                setStatePage(true);
                setRoom(contactInfo.private_room);
                if (room !== undefined) joinRoom(room);
            };
        };
        changeState();
    }, [contactInfo, statePage, room, messageData]);

    const joinRoom = (room: any) => {
        socket.emit("join_room", room);
    };

    return (
        <div className='chat_container'>
            {
                statePage ?
                    <div className='chat_display'>
                        <ChatContact />
                        <div className='chat_display_area'>
                            <div className='message_display'>
                                <>
                                    {
                                        messageData.map((messageContent, id) => (
                                            <Message
                                                other={contactInfo.username === messageContent.author ? false : true}
                                                messageContent={messageContent.message.message}
                                                time={messageContent.time}
                                                key={id}
                                            />
                                        ))
                                    }
                                </>
                            </div>
                        </div>
                        <ChatEmojiArea />
                        <ChatSend socket={socket} username={contactInfo.username ? contactInfo.username : ''} room={room}
                            messageList={messageData} setMessageList={setMessageData}
                        />
                    </div>
                    :
                    <PageInit />
            }
        </div>
    )
}
