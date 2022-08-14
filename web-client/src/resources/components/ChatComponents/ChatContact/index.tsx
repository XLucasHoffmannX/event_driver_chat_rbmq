import React, { useContext } from 'react';
import { Avatar } from '@material-ui/core';
import { HiOutlineBookmark } from 'react-icons/hi';
import { ContextState } from '../../../../context/DataProvider';


export default function ChatContact() {
    const state: any = useContext(ContextState);
    const [friendInfo, setFriendInfo] = React.useState<any>();
    const [contactInfo] = state.contactInfo;

    React.useEffect(() => {
        const getInfoContact = () => {
            setFriendInfo(contactInfo);
        }
        getInfoContact();
    }, [contactInfo, friendInfo])

    return (
        <div className='chat_display_top_fixed'>
            <div className='nav_messages_top_fixe chat_display_top_fixed_p'>
                <div className='nav_messages_top_fixe_perfil'>
                    <div className="nav_messages_top_fixe_control">
                        <Avatar className='nav_messages_top_fixe_perfil_avatar' src={friendInfo ? friendInfo.image : null}>F</Avatar>
                        <span className="nav_messages_top_fixe_perfil_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
                    </div>
                    <div className='nav_messages_top_fixe_perfil_info'>
                        <h2>{friendInfo ? friendInfo.name : "Contact Name"}</h2>
                        <span>{friendInfo ? `${friendInfo.username}` : "@username"}</span>
                    </div>
                </div>
                <div className="nav_messages_top_fixe_menu">
                    <HiOutlineBookmark />
                </div>
            </div>
        </div>
    )
}
