import React from 'react'
import './archive_upload_modal.css';
import { RiCloseLine } from 'react-icons/ri';

export default function ArchiveUploadModal({title, setCloseUploadArchive} : any) {
    return (
        <div className='archive_modal d-flex align-items-center justify-content-center'>
            <div className='archive_modal_display '>
                <div className='archive_modal_display_close'>
                    <RiCloseLine 
                        onClick={()=> setCloseUploadArchive(false)}
                    />
                </div>
                <h2>Adicionar {title === 'document' ? 'documento' : 'imagem'}</h2>
                <input type="file" />
                <div className='archive_modal_display_send'>
                    <span>Enviar</span>
                </div>
            </div>
        </div>
    )
}
