import React from 'react'
import ContactsList from '../ContactsList';
import NavPerfil from '../NavPerfil';
import NavSection from '../NavSection';

export default function Nav() {
    return (
        <div className='nav_messages d-flex flex-column'>
            <NavPerfil />
            <div className='nav_messages_section'>
                <NavSection title={"mensagens diretas"}/>
                <ContactsList />
            </div>
        </div>
    )
}
