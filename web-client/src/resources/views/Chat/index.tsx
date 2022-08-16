import React, { useContext } from 'react'
import { HttpAuth } from '../../../app/config/Http';
import { ContextState } from '../../../context/DataProvider';
import ChatDisplay from '../../components/ChatComponents/ChatDisplay';
import ConfirmationModal from '../../components/ConfirmationModal';
import Nav from '../../components/NavComponents/Nav';

import './chat.css';

export default function Chat() {
    const state: any = useContext(ContextState);
    // eslint-disable-next-line
    const [userData, setUserData] = state.userApi.user;
    const [contactInfo] = state.contactInfo;

    const [openConfirmationModal, setOpenConfirmationModal] = React.useState<any>({
        accept: false,
        open: false
    });

    React.useEffect(() => {
        const getUser = async () => {
            try {
                const res = await HttpAuth.get('/user');

                setUserData(res.data);
            } catch (error) {
                if (error) throw error;
            }
        }

        getUser();

        if(openConfirmationModal.accept) {
            //console.log(contactInfo);
        }
    }, [setUserData, openConfirmationModal, contactInfo]);

    return (
        <div className='chat_container'>
            <Nav
                confirmationModal={openConfirmationModal}
                setConfirmationModal={setOpenConfirmationModal}
            />
            <ChatDisplay />
            
            {openConfirmationModal.open ?
                <ConfirmationModal
                    confirmationModal={openConfirmationModal}
                    setConfirmationModal={setOpenConfirmationModal}
                />
                : null}
        </div>
    )
}
