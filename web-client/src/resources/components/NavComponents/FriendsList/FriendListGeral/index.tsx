import React, { useContext } from 'react';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { Avatar } from '@material-ui/core';
import { ContextState } from '../../../../../context/DataProvider';
import { HttpAuth } from '../../../../../app/config/Http';

export default function FriendListGeral({ userData, confirmationModal, setConfirmationModal, setOpen }: any) {
    const state: any = useContext(ContextState);
    const [confirm, setConfirm] = React.useState(false);
    const [userClicked, setUserClicked] = React.useState<any>();
    // eslint-disable-next-line
    const [contactInfo, setContactInfo] = state.contactInfo;

    React.useEffect(()=>{
        if (confirmationModal.accept && confirm) {
            if(userClicked.id){
                const createFriend = async ()=>{
                    HttpAuth.post('/friend', { friend_id: userClicked.id})
                        .then(res=>{
                            setContactInfo({
                                name: userData.name,
                                username: userData.username,
                                image: userData.image,
                                id: userData.id,
                                private_room: res.data.private_room
                            });

                            setConfirm(false);
                            setOpen(false);
                        }); 
                }
                createFriend();
            }
        }
    }, [confirmationModal, confirm, setContactInfo, userData, userClicked, setOpen])

    const handleClickGetInfo = (userData: any) => {
        setUserClicked(userData);
        setConfirmationModal({
            accept: false,
            open: true
        });
        setConfirm(true);
    }

    return (
        <>
            <div className='friend_contact contacts_geral' onClick={() => handleClickGetInfo(userData)}>
                <div className='friend_contact_control'>
                    <div className="nav_messages_top_fixe_control" >
                        <Avatar className='friend_contact_avatar' src={userData.image} >F</Avatar>
                        <span className="friend_contact_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
                    </div>
                    <div className='friend_contact_name'>
                        <span>{userData.name}</span>
                    </div>
                </div>
                <div className="contacts_geral_add_friend">
                    <HiOutlinePlusSm />
                </div>
            </div>
            <hr className='divisor_contact' />
        </>
    );
}