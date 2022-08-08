import React from 'react'
import { HiOutlinePlusSm } from 'react-icons/hi';

interface NavSectionInterface{
    title: string;
}

export default function NavSection({title} : NavSectionInterface) {
    return (
        <div className='section_message'>
            <h1>{title}</h1>
            <HiOutlinePlusSm />
        </div>
    )
}
