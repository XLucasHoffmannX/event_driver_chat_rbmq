import React from 'react'
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiCloseFill } from 'react-icons/ri';

interface NavSectionInterface {
    title: string;
    open: any,
    setOpen: any
}

export default function NavSection({ title, open, setOpen }: NavSectionInterface) {
    const handleClick = () => {
        open ? setOpen(false) : setOpen(true);
    }

    return (
        <div className='section_message'>
            <h1>{open ? 'Contatos no iHost' : title}</h1>
            {
                open ?
                    <RiCloseFill onClick={handleClick} />
                    :
                    <HiOutlinePlusSm onClick={handleClick} />
            }
        </div>
    )
}
