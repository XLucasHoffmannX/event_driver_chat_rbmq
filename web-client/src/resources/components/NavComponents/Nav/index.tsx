import React from 'react'
import ContactsList from '../NavContactsList';
import NavPerfil from '../NavPerfil';
import NavSection from '../NavSection';

export default function Nav({ confirmationModal, setConfirmationModal }: any) {
    const [openContact, setOpenContacts] = React.useState(false);

    return (
        <div className='nav_messages d-flex flex-column'>
            <NavPerfil />
            <div className='nav_messages_section'>
                <NavSection
                    title={"mensagens diretas"}
                    open={openContact}
                    setOpen={setOpenContacts}
                />
                <ContactsList
                    open={openContact}
                    setOpen={setOpenContacts}
                    confirmationModal={confirmationModal}
                    setConfirmationModal={setConfirmationModal}
                />
            </div>
        </div>
    )
}
