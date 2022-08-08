import React, { useContext } from 'react';
import { Avatar } from '@material-ui/core';
import { ContextState } from '../../../../context/DataProvider';

export default function ContactsList() {
    const state: any = useContext(ContextState);
    // eslint-disable-next-line
    const [contactInfo, setContactInfo] = state.contactInfo;

    const data = [1, 2, 3];

    const handleClickGetInfo = (el: any)=>{
        setContactInfo({
            name: `Lucas ${el}`,
            username: '@hoffmann'
        });
    }

    return (
        <div className='contacts_messages'>
            <>
                {
                    data.map((el, id: any) => (
                        <div className='friend_contact' onClick={()=> handleClickGetInfo(el)} key={id}>
                            <div className="nav_messages_top_fixe_control" >
                                <Avatar className='friend_contact_avatar'>L</Avatar>
                                <span className="friend_contact_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
                            </div>
                            <div className='friend_contact_name'>
                                <span>Lucas {el}</span>
                            </div>
                        </div>
                    ))
                }
            </>
        </div>
    )
}
