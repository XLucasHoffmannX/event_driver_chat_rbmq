import React, { useContext } from 'react'
import { HttpAuth } from '../../../app/config/Http';
import { ContextState } from '../../../context/DataProvider';
import ChatDisplay from '../../components/ChatComponents/ChatDisplay';
import ConfirmationModal from '../../components/ConfirmationModal';
import Nav from '../../components/NavComponents/Nav';
import io from 'socket.io-client';

import './chat.css';

const socket = io('http://localhost:3040');

export default function Chat() {
    const state: any = useContext(ContextState);
    // eslint-disable-next-line
    const [userData, setUserData] = state.userApi.user;
    const [contactInfo] = state.contactInfo;
    // eslint-disable-next-line
    const [onlineUsers, setOnlineUsers] = state.usersOnline.online;

    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<any>({
        accept: false,
        open: false
    });

    React.useEffect(() => {
        const getUser = async () => {
            try {
                const res = await HttpAuth.get('/user');

                setUserData(res.data);
                socket.on('sendToAll', (data) => {
                    if (data !== res.data.id) {
                        if (data !== null) {
                            setOnlineUsers((list:any)=> [...list, data]);
                        }
                    }
                });
            } catch (error) {
                if (error) throw error;
            }
        }

        getUser();
    }, [setUserData, openConfirmationModal, contactInfo, setOnlineUsers]);

    return (
        <div className='chat_container'>
            <Nav
                confirmationModal={openConfirmationModal}
                setConfirmationModal={setOpenConfirmationModal}
            />
            <ChatDisplay
                socket={socket}
            />

            {openConfirmationModal.open ?
                <ConfirmationModal
                    confirmationModal={openConfirmationModal}
                    setConfirmationModal={setOpenConfirmationModal}
                />
                : null}
        </div>
    )
}
