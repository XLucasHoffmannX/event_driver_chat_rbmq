import React, { SyntheticEvent } from 'react'
import { RiSendPlane2Line } from 'react-icons/ri';
import { HiOutlineEmojiHappy, HiOutlineDocumentText } from 'react-icons/hi';
import changeInputRecursive from '../../../../app/helpers/ChangeInputRecursive';
import { SpeedDialAction } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';
import ChatEmojiArea from '../ChatEmojiArea';

import { FiPaperclip, FiImage } from 'react-icons/fi';
import ArchiveUploadModal from '../../ArchiveUploadModal';

const actions = [
    { icon: <FiImage />, name: 'Enviar de Imagem' },
    { icon: <HiOutlineDocumentText />, name: 'Enviar de documento' }
];

export default function ChatSend({ socket, username, room, messageList, setMessageList }: any) {
    /* eslint-disable */
    const [emojiArea, setEmojiArea] = React.useState(false);
    const [archiveAction, setArchiveAction] = React.useState(false);
    const [closeUploadArchive, setCloseUploadArchive] = React.useState(false);
    const [nameUploadArchive, setNameUploadArchive] = React.useState('image');
    const [currentMessage, setCurrentMessage] = React.useState<any>({
        message: ''
    })

    const handleArchives = () => {
        archiveAction ? setArchiveAction(false) : setArchiveAction(true);
    }

    const handleCloseArchiveModal = (type: string) => {
        if(type === 'document'){
            setNameUploadArchive('document');
        }
        closeUploadArchive ? setCloseUploadArchive(false) : setCloseUploadArchive(true);
    }

    const changeInput = (e: SyntheticEvent) => changeInputRecursive(e, currentMessage, setCurrentMessage);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                key: uuidv4(),
                message: currentMessage,
                type: 0,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list: any) => [...list, messageData]);
            setCurrentMessage({ message: '' });
        }
    }

    React.useEffect(() => {
        socket.on("receive_message", (data: any) => {
            setMessageList((list: any) => [...list, data]);
        });
    }, [socket]);

    return (
        <>
            {
                closeUploadArchive && <ArchiveUploadModal title={nameUploadArchive}  setCloseUploadArchive={setCloseUploadArchive} />
            }
            <ChatEmojiArea
                emojiArea={emojiArea}
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
            />
            <div className='chat_send'>
                <div className='chat_send_events'>
                    <div className='emoji_picker_chat'>
                        <HiOutlineEmojiHappy
                            onClick={() => { setArchiveAction(false); emojiArea ? setEmojiArea(false) : setEmojiArea(true) }}
                        />
                    </div>
                    <div className='archives_control d-flex align-items-center justify-content-center h-100'>
                        <FiPaperclip
                            onClick={handleArchives}
                            className='archive_icon'
                        />
                        <div className='d-flex flex-column' style={{ position: 'absolute', marginBottom: '180px' }}>
                            {
                                archiveAction ?
                                    <>
                                        <SpeedDialAction
                                            key={actions[0].name}
                                            icon={actions[0].icon}
                                            open={true}
                                            tooltipTitle={actions[0].name}
                                            onClick={()=> {handleCloseArchiveModal('image'); handleArchives()}}
                                        />
                                        <SpeedDialAction
                                            key={actions[1].name}
                                            icon={actions[1].icon}
                                            open={true}
                                            tooltipTitle={actions[1].name}
                                            onClick={()=> {handleCloseArchiveModal('document'); handleArchives()}}
                                        />
                                    </>
                                    :
                                    null
                            }
                        </div>
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
