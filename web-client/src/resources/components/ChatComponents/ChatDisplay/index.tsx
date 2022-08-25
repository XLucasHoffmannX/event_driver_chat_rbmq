import React, { useContext } from 'react';
import { ContextState } from '../../../../context/DataProvider';
import PageInit from '../../PageInit';
import ChatContact from '../ChatContact';
import ChatSend from '../ChatSend';
import Message from '../../Messages/Message';
import { HttpAuth } from '../../../../app/config/Http';

export default function ChatDisplay({ socket }: any) {
    const state: any = useContext(ContextState);

    const [contactInfo] = state.contactInfo;
    const [userAuth] = state.userApi.user;

    const [emojiArea, setEmojiArea] = React.useState(false);
    const [messageData, setMessageData] = React.useState<any[]>([]);
    const [statePage, setStatePage] = React.useState<boolean>(false);
    const [room, setRoom] = React.useState<any>();
    const [messageDataSaved, setMessageSaved] = React.useState<any[]>([]);
    const [load, setLoad] = React.useState(false);
    const [cb, setCb] = React.useState(false);


    const getMessages = async () => {
        setLoad(true);
        const res = await HttpAuth.get(`/listmessages/${room}`);

        if (res.data) {
            setMessageSaved(res.data);
            setLoad(false);
        };
    }

    React.useEffect(() => {
        setMessageData([]);
        if (userAuth.id !== undefined) {
            socket.emit('status', userAuth.id);
        }
        const changeState = () => {
            if (contactInfo !== undefined) {
                setStatePage(true);
                setRoom(contactInfo.private_room);
                getMessages();
                if (room !== undefined) {
                    joinRoom(room);
                    if (!cb) {
                        setCb(true);
                    }
                };
            };
        };
        changeState();
        // eslint-disable-next-line
    }, [contactInfo, statePage, room, userAuth.id, socket]);

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
                                {
                                    load ?
                                        <>carregando...</>
                                        :
                                        <>
                                            {
                                                messageDataSaved.map((messageContent, id) => (
                                                    <Message
                                                        other={contactInfo.id === messageContent.user_id ? false : true}
                                                        messageContent={messageContent.message_text}
                                                        time={messageContent.time}
                                                        key={id}
                                                    />
                                                ))
                                            }
                                        </>
                                }
                                <>
                                    {
                                        messageData.map((messageContent, id) => {
                                            if (messageContent.room === contactInfo.private_room) {
                                                return (
                                                    <Message
                                                        other={contactInfo.id === messageContent.author ? false : true}
                                                        messageContent={messageContent.message.message}
                                                        time={messageContent.time}
                                                        key={id}
                                                    />
                                                )
                                            }
                                        })
                                    }
                                </>
                            </div>
                        </div>
                        <ChatSend socket={socket} username={contactInfo.id ? contactInfo.id : ''} room={room}
                            messageList={messageData} setMessageList={setMessageData}
                            emojiArea={emojiArea} setEmojiArea={setEmojiArea}
                        />
                    </div>
                    :
                    <PageInit />
            }
        </div>
    )
}
