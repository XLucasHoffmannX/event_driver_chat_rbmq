import React, { useContext } from 'react';
import { Avatar } from '@material-ui/core';
import { ContextState } from '../../../../context/DataProvider';

import './contact_list.css';
import { HttpAuth } from '../../../../app/config/Http';
import FriendListGeral from '../FriendsList/FriendListGeral';
import Status from '../../Status';

export default function ContactsList({ open, setOpen, confirmationModal, setConfirmationModal }: any) {
    const state: any = useContext(ContextState);
    const [myFriends, setMyFriends] = React.useState<any[]>([]);
    const [allUsers, setAllUsers] = React.useState<any[]>([]);
    const [load, setLoad] = React.useState(false);

    // eslint-disable-next-line
    const [contactInfo, setContactInfo] = state.contactInfo;


    React.useEffect(() => {
        const getData = async () => {
            setLoad(true);

            const res = await HttpAuth.get('/lisfriends');

            if (res.data) {
                setMyFriends(res.data);
                setLoad(false);
            };
        };

        const getDataAllUsers = async () => {
            setLoad(true);

            const res = await HttpAuth.get('/user-end');

            if (res.data) {
                setAllUsers(res.data.data);
                setLoad(false);
            };
        }

        if(open) getDataAllUsers()
        else getData();
    }, [open])

    const handleClickGetInfo = (el: any) => {
        console.log(el);
        setContactInfo({
            name: el.name,
            username: el.username,
            image: el.image,
            id: el.id,
            private_room: el.private_room
        });
    }

    return (
        <div className='contacts_messages'>
            <>
                <div className='contacts_geral_search'>
                    <div className='form_content'>
                        <input type="text" className='form_input' placeholder='Buscar contato' required />
                    </div>
                </div>
                {
                    open ?
                        /* Geral Contacts */
                        load ?
                            <>Carregando usuários</>
                            :
                            allUsers.map((user: any, id) => (
                                <FriendListGeral
                                    confirmationModal={confirmationModal}
                                    setConfirmationModal={setConfirmationModal}
                                    userData={user}
                                    setOpen={setOpen}
                                />
                            ))
                        :
                        load ?
                            <>Carregando...</>
                            :
                            myFriends.map((friend: any) => (
                                <>
                                    <div className='friend_contact' onClick={() => handleClickGetInfo(friend)} key={friend.id} >
                                        <div className='friend_contact_control'>
                                            <div className="nav_messages_top_fixe_control" >
                                                <Avatar className='friend_contact_avatar' src={friend.image} ></Avatar>
                                                <Status userId={friend.id} />
                                            </div>
                                            <div className='friend_contact_name'>
                                                <span>{friend.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='divisor_contact' />
                                </>
                            ))
                }
            </>
        </div >
    )
}