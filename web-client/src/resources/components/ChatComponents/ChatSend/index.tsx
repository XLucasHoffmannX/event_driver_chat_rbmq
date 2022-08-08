import React, { SyntheticEvent } from 'react'
import { RiSendPlane2Line } from 'react-icons/ri';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import changeInputRecursive from '../../../../app/helpers/ChangeInputRecursive';

export default function ChatSend({ socket, username, room }: any) {
    const [emojiPicker, setEmojiPicker] = React.useState(false);
    /* eslint-disable */
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
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setCurrentMessage({message: ''});
        }
    }

    React.useEffect(() => {
        socket.on("receive_message", (data: any) => {
            console.log(data);
        });
    }, [socket]);

    return (
        <div className='chat_send'>
            <div className='chat_send_events'>
                <div className='emoji_picker_chat'>
                    <HiOutlineEmojiHappy
                        onClick={() => emojiPicker ? setEmojiPicker(false) : setEmojiPicker(true)}
                    />
                </div>
                <div className='message_input_display'>
                    <textarea className='input_message' placeholder='Digite sua mensagem'
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
    )
}
