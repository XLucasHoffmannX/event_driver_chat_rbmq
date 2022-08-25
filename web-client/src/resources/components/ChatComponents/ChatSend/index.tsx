import React, { SyntheticEvent } from 'react'
import { RiSendPlane2Line } from 'react-icons/ri';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import changeInputRecursive from '../../../../app/helpers/ChangeInputRecursive';
import { v4 as uuidv4 } from 'uuid';
import ChatEmojiArea from '../ChatEmojiArea';

export default function ChatSend({ socket, username, room, messageList, setMessageList }: any) {
    /* eslint-disable */
    const [emojiArea, setEmojiArea] = React.useState(false);
    const [emojiText, setEmojiText] = React.useState('');
    const [currentMessage, setCurrentMessage] = React.useState<any>({
        message: ''
    })

    const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, currentMessage, setCurrentMessage);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                key: uuidv4(),
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list: any) => [...list, messageData]);
            setCurrentMessage({ message: '' });
            console.log(messageData);
        }
    }

    React.useEffect(() => {
        socket.on("receive_message", (data: any) => {
            setMessageList((list: any) => [...list, data]);
        });
    }, [socket]);

    return (
        <>
            <ChatEmojiArea 
                emojiArea={emojiArea}
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
            />
            <div className='chat_send'>
                <div className='chat_send_events'>
                    <div className='emoji_picker_chat'>
                        <HiOutlineEmojiHappy
                            onClick={() => emojiArea ? setEmojiArea(false) : setEmojiArea(true)}
                        />
                    </div>
                    <div className='message_input_display'>
                        <input type="text" className='input_message' placeholder='Digite sua mensagem'
                            value={currentMessage.message}
                            name='message'
                            onChange={changeInput}
                            onKeyPress={(event) => {
                                event.key === "Enter" && sendMessage();
                            }}
                        />
                    </div>
                    <div className='send_picker'>
                        <RiSendPlane2Line
                            onClick={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
