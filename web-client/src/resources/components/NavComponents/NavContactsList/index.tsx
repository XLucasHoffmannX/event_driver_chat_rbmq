import React, { useContext } from 'react';
import { Avatar } from '@material-ui/core';
import { ContextState } from '../../../../context/DataProvider';
import { HiOutlinePlusSm } from 'react-icons/hi';

import './contact_list.css';

export default function ContactsList({ open }: any) {
    const state: any = useContext(ContextState);
    // eslint-disable-next-line
    const [contactInfo, setContactInfo] = state.contactInfo;

    const data = [1, 2, 3];

    const handleClickGetInfo = (el: any) => {
        setContactInfo({
            name: `Lucas ${el}`,
            username: '@hoffmann'
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
                        data.map((el, id: any) => (
                            <>
                                <div className='friend_contact contacts_geral' onClick={() => handleClickGetInfo(el)} key={id}>
                                    <div className='friend_contact_control'>
                                        <div className="nav_messages_top_fixe_control" >
                                            <Avatar className='friend_contact_avatar'>F</Avatar>
                                            <span className="friend_contact_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
                                        </div>
                                        <div className='friend_contact_name'>
                                            <span>Friend {el}</span>
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
                        data.map((el, id: any) => (
                            <div>
                                <div className='friend_contact' onClick={() => handleClickGetInfo(el)} key={id}>
                                    <div className='friend_contact_control'>
                                        <div className="nav_messages_top_fixe_control" >
                                            <Avatar className='friend_contact_avatar'>L</Avatar>
                                            <span className="friend_contact_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
                                        </div>
                                        <div className='friend_contact_name'>
                                            <span>Lucas {el}</span>
                                        </div>
                                    </div>
                                </div>
                                <hr className='divisor_contact' />
                            </div>
                        ))
                }
            </>
        </div>
    )
}
