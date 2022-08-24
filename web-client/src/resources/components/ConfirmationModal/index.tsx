import React from 'react';
import Lottie from 'react-lottie';
import { Modal, Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import ConfirmAnimate from '../../assets/lottie/confirm.json';
import { RiCloseFill } from 'react-icons/ri';

import './confimation_modal.css';

export default function ConfirmationModal({ confirmationModal, setConfirmationModal }: any) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: ConfirmAnimate,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [open, setOpen] = React.useState(true);

    const handleClose = (confirm: boolean) => {
        if (confirm) {
            setConfirmationModal({
                accept: true,
                open: false
            });
        } else {
            setConfirmationModal({
                accept: false,
                open: false
            });
        }
        setOpen(false);
    };

    return (
        <>
            <Modal
                hideBackdrop={true}
                open={open}
                className="modal_container_notify d-flex flex-column align-items-center justify-content-center h-100"
            >
                <div>
                    <Dialog
                        open={open}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <div className='modal_confirmation_close'>
                            <div onClick={() => handleClose(false)}>
                                <RiCloseFill />
                            </div>
                        </div>
                        <div className='modal_confirmation_image'>
                            <Lottie
                                options={defaultOptions}
                            />
                        </div>
                        <div className='modal_confirmation_title'>
                            <h2>Confirmar amizade?</h2>
                        </div>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Após a confirmação vocês estarão conectados.
                            </DialogContentText>
                        </DialogContent>
                        <div className='modal_confirmation_button_confirm'>
                            <span onClick={() => handleClose(true)}>Bora lá</span>
                        </div>
                    </Dialog>
                </div>
            </Modal>
        </>
    )
}
