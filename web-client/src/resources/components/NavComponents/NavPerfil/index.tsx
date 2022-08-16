import React, { useContext } from 'react';
import { Avatar, MenuItem, Menu } from '@material-ui/core';
import { HiMenu } from 'react-icons/hi';
import { ContextState } from '../../../../context/DataProvider';
import { HttpAuth } from '../../../../app/config/Http';

const NavPerfil: React.FC = () => {
    const state: any = useContext(ContextState);
    const [firstLetter, setFirstLetter] = React.useState<any>();
    const [userData] = state.userApi.user;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        const userImageDefault = userData.name;

        if (userImageDefault !== undefined) {

            setFirstLetter(userImageDefault);
            if (firstLetter !== undefined) {
                setFirstLetter(firstLetter.charAt());
            }
        }
    }, [firstLetter, userData.name]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='nav_messages_top_fixe'>
            <div className='nav_messages_top_fixe_perfil'>
                <div className="nav_messages_top_fixe_control">
                    <Avatar className='nav_messages_top_fixe_perfil_avatar' src={userData.image} >{firstLetter}</Avatar>
                    <span className="nav_messages_top_fixe_perfil_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
                </div>
                <div className='nav_messages_top_fixe_perfil_info'>
                    <h2>{userData.name}</h2>
                    <span>@{userData.username}</span>
                </div>
            </div>
            <div className="nav_messages_top_fixe_menu">
                <div onClick={handleClick}>
                    <HiMenu />
                </div>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    style={{ marginTop: "2rem", marginLeft: "-7rem"}}
                >
                    <MenuItem onClick={handleClose}>Meu Perfil</MenuItem>
                    <MenuItem onClick={handleClose}>Fechar contatos</MenuItem>
                    <MenuItem onClick={async ()=>{
                        handleClose();
                        await HttpAuth.post("/logout").then(res=> {
                            if(res.status === 200) window.location.href = '/'
                        });
                    }}>Sair</MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default NavPerfil;