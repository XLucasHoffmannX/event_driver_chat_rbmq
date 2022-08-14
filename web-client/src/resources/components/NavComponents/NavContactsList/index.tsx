import React, { useContext } from 'react';
import { Avatar } from '@material-ui/core';
import { ContextState } from '../../../../context/DataProvider';
import { HiOutlinePlusSm } from 'react-icons/hi';

import './contact_list.css';
import { HttpAuth } from '../../../../app/config/Http';

export default function ContactsList({ open }: any) {
    const state: any = useContext(ContextState);
    const [myFriends, setMyFriends] = React.useState<any[]>([]);
    const [allUsers, setAllUsers] = React.useState<any[]>([]);
    const [load, setLoad] = React.useState(false);
    const [load2, setLoad2] = React.useState(false);

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
            setLoad2(true);

            const res = await HttpAuth.get('/user-end');

            if (res.data) {
                setAllUsers(res.data.data);
                setLoad2(false);
            };
        }

        getDataAllUsers();
        getData();
    }, [])

    const handleClickGetInfo = (el: any) => {
        setContactInfo({
            name: el.name,
            username: el.username,
            image: el.image,
            id: el.id
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
                        load2 ?
                            <>Carregando usuários</>
                            :
                            allUsers.map((user: any) => (
                                < >
                                    <div className='friend_contact contacts_geral' onClick={() => handleClickGetInfo(user)} key={user.id}>
                                        <div className='friend_contact_control'>
                                            <div className="nav_messages_top_fixe_control" >
                                                <Avatar className='friend_contact_avatar'src={user.image} >F</Avatar>
                                                <span className="friend_contact_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
                                            </div>
                                            <div className='friend_contact_name'>
                                                <span>{user.name}</span>
                                            </div>
                                        </div>
                                        <div className="contacts_geral_add_friend">
                                            <HiOutlinePlusSm />
                                        </div>
                                    </div>
                                    <hr className='divisor_contact' />
                                </>
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
                                                <span className="friend_contact_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
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