import React, { useContext } from 'react';
import { ContextState } from '../../../context/DataProvider';


function Status({ userId }: any) {
    const state: any = useContext(ContextState);
    const [offlineUser, setOfflineUser] = React.useState(false);

    const [onlineUsers] = state.usersOnline.online;

    React.useEffect(()=>{
        if(onlineUsers.length === 0){
            setOfflineUser(true);
        }
    }, [onlineUsers])

    return (
        <>  
           {/*  {
                offlineUser ? <span className="friend_contact_badge rounded-circle" style={{ backgroundColor: "var(--yellow-pallete)" }}></span> : null
            }
            {  
                onlineUsers.map((user: any) => (
                    <>
                        {user === userId ?
                            <span className="friend_contact_badge rounded-circle" style={{ backgroundColor: "var(--green-pallete)" }}></span>
                            :
                            <span className="friend_contact_badge rounded-circle" style={{ backgroundColor: "var(--yellow-pallete)" }}></span>
                        }
                    </>
                ))
            } */}
        </>
    );
}

export default Status;