import React, { useContext } from 'react'
import { HttpAuth } from '../../../app/config/Http';
import { ContextState } from '../../../context/DataProvider';
import ChatDisplay from '../../components/ChatComponents/ChatDisplay';
import Nav from '../../components/NavComponents/Nav';

import './chat.css';

export default function Chat() {
    const state: any = useContext(ContextState);
    // eslint-disable-next-line
    const [userData, setUserData] = state.userApi.user;

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
    }, [setUserData]);

    return (
        <div className='chat_container'>
            <Nav />
            <ChatDisplay />
        </div>
    )
}
