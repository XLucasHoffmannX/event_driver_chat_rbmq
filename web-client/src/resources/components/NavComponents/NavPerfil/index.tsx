import React from 'react';
import { Avatar } from '@material-ui/core';
import { HiMenu } from 'react-icons/hi';


const NavPerfil: React.FC = () => {
    return (
        <div className='nav_messages_top_fixe'>
            <div className='nav_messages_top_fixe_perfil'>
                <div className="nav_messages_top_fixe_control">
                    <Avatar className='nav_messages_top_fixe_perfil_avatar'>F</Avatar>
                    <span className="nav_messages_top_fixe_perfil_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
                </div>
                <div className='nav_messages_top_fixe_perfil_info'>
                    <h2>Felipe Garden 1</h2>
                    <span>@garden</span>
                </div>
            </div>
            <div className="nav_messages_top_fixe_menu">
                <HiMenu />
            </div>
        </div>
    );
}

export default NavPerfil;